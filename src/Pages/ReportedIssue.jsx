import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  collection,
  onSnapshot,
  updateDoc,
  deleteDoc,
  doc,
  increment,
} from "firebase/firestore";
import IssueFilter from "../components/IssueFilter";
import app from "../Firebase.jsx";
import { voteOnIssue, updateIssueVote } from "../utils/firestoreHelpers";

const db = getFirestore(app);
const auth = getAuth(app);

export default function ReportedIssue() {
  const [issues, setIssues] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [userVotes, setUserVotes] = useState({});
  const [voting, setVoting] = useState(false);
  const user = auth.currentUser;

  useEffect(() => {
    if (!user) return;

    const unsubIssues = onSnapshot(collection(db, "issues"), (snapshot) => {
      const issueList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setIssues(issueList);
    });

    const unsubVotes = onSnapshot(collection(db, "votes"), (snapshot) => {
      const votes = {};
      snapshot.docs.forEach((doc) => {
        const vote = doc.data();
        if (vote.userId === user.uid) {
          votes[vote.issueId] = vote.vote;
        }
      });
      setUserVotes(votes);
    });

    return () => {
      unsubIssues();
      unsubVotes();
    };
  }, [user]);

  const handleVote = async (issueId, isUpvote) => {
    if (!user) return alert("Login required");
    if (voting) return; // 👈 prevent spamming

    setVoting(true); // 🔒 Lock

    try {
      const existingVote = userVotes[issueId];
      const voteDocId = `${issueId}_${user.uid}`;
      const issueRef = doc(db, "issues", issueId);

      // Unvote
      if (
        (isUpvote && existingVote === "upvote") ||
        (!isUpvote && existingVote === "downvote")
      ) {
        await deleteDoc(doc(db, "votes", voteDocId));
        await updateDoc(issueRef, {
          upvotes: isUpvote ? increment(-1) : increment(0),
          downvotes: !isUpvote ? increment(-1) : increment(0),
        });
        return;
      }

      // Switch vote
      if (
        (isUpvote && existingVote === "downvote") ||
        (!isUpvote && existingVote === "upvote")
      ) {
        await updateDoc(issueRef, {
          upvotes: isUpvote ? increment(1) : increment(-1),
          downvotes: isUpvote ? increment(-1) : increment(1),
        });
      } else {
        // New vote
        await updateDoc(issueRef, {
          upvotes: isUpvote ? increment(1) : increment(0),
          downvotes: !isUpvote ? increment(1) : increment(0),
        });
      }

      await voteOnIssue(issueId, user.uid, isUpvote ? "upvote" : "downvote");
    } catch (error) {
      console.error("Voting error:", error);
    } finally {
      setVoting(false); // 🔓 Unlock
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "Resolved":
        return "bg-green-100 text-green-700";
      case "In Progress":
        return "bg-yellow-100 text-yellow-800";
      case "Open":
      default:
        return "bg-blue-100 text-blue-700";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "text-red-600";
      case "Medium":
        return "text-orange-600";
      case "Low":
        return "text-green-600";
      default:
        return "text-gray-700";
    }
  };

  return (
    <div className="p-6 text-black">
      <IssueFilter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />

      {issues.length === 0 ? (
        <p className="text-gray-600">No issues reported yet.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {[...issues]
            .filter((issue) =>
              issue.title.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .sort((a, b) => {
              if (sortBy === "votes") {
                const votesA = (a.upvotes || 0) - (a.downvotes || 0);
                const votesB = (b.upvotes || 0) - (b.downvotes || 0);
                return votesB - votesA;
              }
              if (sortBy === "priority") {
                const priorityOrder = { High: 3, Medium: 2, Low: 1 };
                return (
                  (priorityOrder[b.priority] || 0) -
                  (priorityOrder[a.priority] || 0)
                );
              }
              if (sortBy === "recent") {
                return new Date(b.reportedAt) - new Date(a.reportedAt);
              }
              return 0;
            })
            .map((issue) => (
              <div
                key={issue.id}
                className="bg-white border border-yellow-100 shadow-md p-5 rounded-xl flex justify-between items-start hover:shadow-lg transition duration-300"
              >
                <div className="flex-1">
                  {/* Title + warning icon */}
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg font-bold text-black">
                      {issue.title}
                    </h3>
                    {issue.status === "Resolved" ? (
                      <span className="text-green-600 text-lg">✅</span>
                    ) : issue.status === "In Progress" ? (
                      <span className="text-yellow-500 text-lg">⏱️</span>
                    ) : (
                      <span className="text-red-500 text-lg">⚠️</span>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-sm text-gray-700 mb-3">
                    {issue.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 text-xs font-semibold mb-3">
                    <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                      {issue.status || "Pending"}
                    </span>
                    <span
                      className={`${
                        issue.priority === "High"
                          ? "bg-red-500 text-white"
                          : issue.priority === "Medium"
                          ? "bg-yellow-400 text-white"
                          : "bg-green-500 text-white"
                      } px-2 py-1 rounded-full`}
                    >
                      {issue.priority || "Medium"}
                    </span>
                    {issue.tag && (
                      <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                        {issue.tag}
                      </span>
                    )}
                    {issue.location && (
                      <span className="bg-pink-100 text-pink-700 px-2 py-1 rounded-full">
                        📍 {issue.location}
                      </span>
                    )}
                  </div>

                  {/* Reporter */}
                  <div className="text-sm text-gray-600 flex items-center flex-wrap gap-2">
                    <span>
                      🧑 Reported by{" "}
                      <strong>{issue.createdBy || "Unknown"}</strong>
                    </span>
                    <span>
                      · ⏱ {issue.createdAt?.toDate().toLocaleString()}
                    </span>
                    {issue.image && (
                      <div className="relative group w-8 h-8">
                        <img
                          src={issue.image}
                          alt="Issue"
                          className="w-8 h-8 object-cover rounded cursor-pointer"
                        />

                        {/* Hover Preview */}
                        <div className="absolute z-50 hidden group-hover:flex w-48 h-48 border border-gray-300 shadow-xl rounded bg-white p-1 top-[-10rem] left-1/2 -translate-x-1/2">
                          <img
                            src={issue.image}
                            alt="Issue Preview"
                            className="w-full h-full object-contain rounded"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Voting */}
                <div className="flex flex-col items-center gap-2 ml-4">
                  <button
                    onClick={() => handleVote(issue.id, true)}
                    className={`p-2 rounded ${
                      userVotes[issue.id] === "upvote"
                        ? "bg-green-500 text-white"
                        : "bg-gray-100"
                    }`}
                  >
                    👍
                  </button>
                  <p className="font-semibold text-gray-700">
                    {issue.upvotes || 0}
                  </p>
                  <button
                    onClick={() => handleVote(issue.id, false)}
                    className={`p-2 rounded ${
                      userVotes[issue.id] === "downvote"
                        ? "bg-red-500 text-white"
                        : "bg-gray-100"
                    }`}
                  >
                    👎
                  </button>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
