import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  collection,
  onSnapshot,
} from "firebase/firestore";
import app from "../Firebase.jsx";
import {
  voteOnIssue,
  updateIssueVote,
} from "../utils/firestoreHelpers";


const db = getFirestore(app);
const auth = getAuth(app);

export default function ReportedIssue() {
  const [issues, setIssues] = useState([]);
  const [userVotes, setUserVotes] = useState({});
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

  const existingVote = userVotes[issueId];

  // Unvote case
  if (
    (isUpvote && existingVote === "upvote") ||
    (!isUpvote && existingVote === "downvote")
  ) {
    // Remove vote from Firestore
    await deleteDoc(doc(db, "votes", `${issueId}_${user.uid}`));

    // Decrement vote count on issue
    const issueRef = doc(db, "issues", issueId);
    await updateDoc(issueRef, {
      upvotes: isUpvote ? increment(-1) : increment(0),
      downvotes: !isUpvote ? increment(-1) : increment(0),
    });

    return;
  }

  // If user had opposite vote earlier, adjust both
  if (
    (isUpvote && existingVote === "downvote") ||
    (!isUpvote && existingVote === "upvote")
  ) {
    const issueRef = doc(db, "issues", issueId);
    await updateDoc(issueRef, {
      upvotes: isUpvote ? increment(1) : increment(-1),
      downvotes: isUpvote ? increment(-1) : increment(1),
    });
  } else {
    // Fresh vote
    await updateIssueVote(issueId, isUpvote);
  }

  // Set vote document
  await voteOnIssue(issueId, user.uid, isUpvote ? "upvote" : "downvote");
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
      <h2 className="text-2xl font-bold mb-6">📢 Reported Issues</h2>

      {issues.length === 0 ? (
        <p className="text-gray-600">No issues reported yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {issues.map((issue) => (
            <div
              key={issue.id}
              className="bg-white border border-gray-300 shadow-md p-4 rounded-md"
            >
              <h3 className="text-lg font-bold text-black mb-1">
                {issue.title}
              </h3>
              <p className="text-sm text-gray-700 mb-2">
                {issue.description}
              </p>
              <p className="text-sm mb-1">
                <b>Tag:</b> {issue.tag}
              </p>
              <p className="text-sm mb-1">
                <b>Priority:</b>{" "}
                <span className={getPriorityColor(issue.priority)}>
                  {issue.priority}
                </span>
              </p>
              <p className="text-sm mb-2">
                <b>Upvotes:</b> {issue.upvotes || 0}
              </p>
              <div className="text-sm mb-3">
                <b>Status:</b>{" "}
                <span
                  className={`${getStatusBadge(
                    issue.status
                  )} px-2 py-1 rounded-full text-xs font-semibold`}
                >
                  {issue.status}
                </span>
              </div>

              <div className="flex gap-3 mt-2">
                <button
                  onClick={() => handleVote(issue.id, true)}
                  className={`px-3 py-1 rounded text-sm ${
                    userVotes[issue.id] === "upvote"
                      ? "bg-green-500 text-white"
                      : "bg-gray-200 text-black"
                  }`}
                >
                  👍
                </button>
                <button
                  onClick={() => handleVote(issue.id, false)}
                  className={`px-3 py-1 rounded text-sm ${
                    userVotes[issue.id] === "downvote"
                      ? "bg-red-500 text-white"
                      : "bg-gray-200 text-black"
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
