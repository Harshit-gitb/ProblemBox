import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  collection,
  getDocs,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import IssueFilter from "../components/IssueFilter";
import app from "../Firebase.jsx";

const db = getFirestore(app);
const auth = getAuth(app);

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState("issues");
  const [issues, setIssues] = useState([]);
  const [users, setUsers] = useState([]);
  const [sortBy, setSortBy] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchIssues();
    fetchUsers();
  }, []);

  const fetchIssues = async () => {
    const snapshot = await getDocs(collection(db, "issues"));
    setIssues(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
  };

  const fetchUsers = async () => {
    const snapshot = await getDocs(collection(db, "users"));
    setUsers(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
  };

  const updateStatus = async (id, newStatus) => {
    await updateDoc(doc(db, "issues", id), { status: newStatus });
    fetchIssues();
  };

  const deleteIssue = async (id) => {
    await deleteDoc(doc(db, "issues", id));
    fetchIssues();
  };

  const handleRoleChange = async (id, role) => {
    await updateDoc(doc(db, "users", id), { role });
    fetchUsers();
  };

  const handleDeleteUser = async (id) => {
    await deleteDoc(doc(db, "users", id));
    fetchUsers();
  };

  const filteredUsers = users.filter((user) =>
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="text-black p-4">
      <div className="flex gap-4 mb-6">
        <button
          className={`px-4 py-2 rounded ${
            activeTab === "issues" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setActiveTab("issues")}
        >
          Issue Management
        </button>
        <button
          className={`px-4 py-2 rounded ${
            activeTab === "users" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setActiveTab("users")}
        >
          User Management
        </button>
      </div>

      {/* Issue Management */}
      {activeTab === "issues" && (
        <>
          <h2 className="text-2xl mb-4">🛠 Issue Management</h2>
          <IssueFilter
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            sortBy={sortBy}
            setSortBy={setSortBy}
          />
          <div className="mt-4">
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
                  className="bg-white shadow-md hover:shadow-lg border border-gray-200 rounded-lg p-4 mb-4 transition-all duration-300"
                >
                  <h4 className="font-bold">{issue.title}</h4>
                  <p className="mb-1">{issue.description}</p>
                  <p className="mb-1">
                    <b>Priority:</b> {issue.priority}
                  </p>
                  <p className="mb-1">
                    <b>Tag:</b> {issue.tag}
                  </p>
                  <p className="mb-1">
                    <span className="font-medium">Upvotes:</span>{" "}
                    {issue.upvotes || 0}
                  </p>
                  <p className="mb-1">
                    <b>Status:</b> {issue.status || "Pending"}
                  </p>
                  <div className="flex gap-2 mt-2">
                    <button
                      className="bg-green-100 hover:bg-green-200 text-green-800 font-medium px-3 py-1 rounded-lg text-sm"
                      onClick={() => updateStatus(issue.id, "Resolved")}
                    >
                      ✅ Resolve
                    </button>
                    <button
                      className="bg-blue-100 hover:bg-blue-200 text-blue-800 font-medium px-3 py-1 rounded-lg text-sm"
                      onClick={() => updateStatus(issue.id, "In Progress")}
                    >
                      ⏳ In Progress
                    </button>
                    <button
                      className="bg-yellow-100 hover:bg-yellow-200 text-yellow-800 font-medium px-3 py-1 rounded-lg text-sm"
                      onClick={() => updateStatus(issue.id, "Rejected")}
                    >
                      ❌ Reject
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white font-medium px-3 py-1 rounded-lg text-sm"
                      onClick={() => deleteIssue(issue.id)}
                    >
                      🗑 Delete
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </>
      )}

      {/* User Management */}
      {activeTab === "users" && (
        <>
          <h2 className="text-3xl font-semibold mb-4 text-gray-800">
            👥 User Management
          </h2>

          <input
            type="text"
            placeholder="Search users…"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="
        w-full px-6 py-3 mb-6
        bg-white border border-gray-300 rounded-md shadow-sm
        text-lg text-gray-700 placeholder-gray-400
        focus:outline-none focus:ring-2 focus:ring-[#d4af37] transition"
          />

          <div className="space-y-3">
            {filteredUsers.map((user) => (
              <div
                key={user.id}
                className="
            bg-white border border-gray-200 rounded-xl 
            shadow-sm hover:shadow-md transition-shadow duration-300
            p-3 flex items-center justify-between text-lg"
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-800">
                      {user.name || "Unnamed User"}
                    </span>
                    <span
                      className={`px-2 py-0.5 text-xs font-semibold rounded-full ${
                        user.role === "Admin"
                          ? "bg-red-100 text-red-800"
                          : user.role === "Moderator"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {user.role || "User"}
                    </span>
                  </div>
                  <span className="text-gray-600">{user.email}</span>
                </div>

                <div className="flex items-center space-x-3">
                  <select
                    value={user.role ?? "User"}
                    onChange={(e) => handleRoleChange(user.id, e.target.value)}
                    className="rounded-md border-gray-300 text-lg focus:border-[#d4af37] focus:ring-[#d4af37] transition p-1"
                  >
                    <option>User</option>
                    <option>Admin</option>
                  </select>

                  <button
                    onClick={() => handleDeleteUser(user.id)}
                    className="
                inline-flex items-center gap-1
                bg-[#d4af37]/20 hover:bg-[#d4af37]/30
                text-gray-900 px-3 py-1 rounded-full text-lg
                transition"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-black"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M9 3v1H4v2h16V4h-5V3H9zm2 5v11h2V8h-2zM7 8v11h2V8H7zM13 8v11h2V8h-2z" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default AdminPanel;
