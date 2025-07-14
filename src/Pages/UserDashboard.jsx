import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, onSnapshot } from "firebase/firestore";
import app from "../Firebase.jsx";

const db = getFirestore(app);
const auth = getAuth(app);

export default function UserDashboard() {
  const [userIssues, setUserIssues] = useState([]);
  const [filteredIssues, setFilteredIssues] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const user = auth.currentUser;

  useEffect(() => {
    if (!user) return;

    const unsub = onSnapshot(collection(db, "issues"), (snapshot) => {
      const filtered = snapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .filter((issue) => issue.createdBy === user.email);
      setUserIssues(filtered);
      setFilteredIssues(filtered);
    });

    return () => unsub();
  }, [user]);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    const filtered = userIssues.filter((issue) =>
      issue.title.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredIssues(filtered);
  };

  const sortByPriority = () => {
    const order = { High: 1, Medium: 2, Low: 3 };
    const sorted = [...filteredIssues].sort(
      (a, b) => order[a.priority] - order[b.priority]
    );
    setFilteredIssues(sorted);
  };

  const sortByVotes = () => {
    const sorted = [...filteredIssues].sort(
      (a, b) => (b.upvotes || 0) - (a.upvotes || 0)
    );
    setFilteredIssues(sorted);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "text-red-600 font-semibold";
      case "Medium":
        return "text-orange-600 font-medium";
      case "Low":
        return "text-green-600 font-medium";
      default:
        return "text-gray-600";
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "Open":
        return "bg-blue-100 text-blue-700";
      case "In Progress":
        return "bg-yellow-100 text-yellow-800";
      case "Resolved":
        return "bg-green-100 text-green-800";
      case "Rejected":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="p-6 text-black">
      <h2 className="text-3xl font-bold mb-4">📊 User Dashboard</h2>
      <p className="text-lg mb-4">👤 Welcome, <span className="font-semibold">{user?.email}</span></p>

      {/* Controls */}
      <div className="flex flex-wrap gap-2 mb-4">
        <input
          type="text"
          placeholder="Search your issues..."
          value={searchTerm}
          onChange={handleSearch}
          className="p-2 w-72 border border-gray-400 rounded-lg"
        />
        <button
          className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg"
          onClick={sortByPriority}
        >
          Sort by Priority
        </button>
        <button
          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg"
          onClick={sortByVotes}
        >
          Sort by Votes
        </button>
      </div>

      {/* Issue Cards */}
      {filteredIssues.length === 0 ? (
        <p className="text-gray-500 mt-4">😕 You haven’t raised any issues yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredIssues.map((issue) => (
            <div
  key={issue.id}
  className="bg-white shadow-lg border rounded-lg p-5 hover:shadow-xl transition duration-300 animate-fadeIn scale-95 hover:scale-100"
>

              <h4 className="text-lg font-semibold mb-2">{issue.title}</h4>
              <p className="text-gray-700 mb-1">{issue.description}</p>
              <p className="mb-1">
                <span className="font-medium">Tag:</span> {issue.tag}
              </p>
              <p className="mb-1">
                <span className="font-medium">Priority:</span>{" "}
                <span className={getPriorityColor(issue.priority)}>{issue.priority}</span>
              </p>
              <p className="mb-1">
                <span className="font-medium">Upvotes:</span> {issue.upvotes || 0}
              </p>
              <p className="mb-1">
                <span className="font-medium">Status:</span>{" "}
                <span
                  className={`px-2 py-1 text-sm rounded-full ${getStatusBadge(issue.status)}`}
                >
                  {issue.status}
                </span>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
