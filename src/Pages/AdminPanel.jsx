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

  const handleStatusChange = async (id, status) => {
    await updateDoc(doc(db, "users", id), { status });
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
                  <p>{issue.description}</p>
                  <p>
                    <b>Priority:</b> {issue.priority}
                  </p>
                  <p>
                    <b>Tag:</b> {issue.tag}
                  </p>
                  <p>
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
          <h2 className="text-2xl mb-4">👥 User Management</h2>
          <input
            type="text"
            placeholder="Search users"
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="mt-4">
            {filteredUsers.map((user) => (
              <div
                key={user.id}
                className="bg-white shadow-md hover:shadow-lg border border-gray-200 rounded-lg p-4 mb-4 transition-all duration-300"
              >
                <h4 className="font-bold">{user.name || "Unnamed User"}</h4>
                <p>{user.email}</p>
                <p>
                  <b>Status:</b>{" "}
                  <select
                    value={user.status || "Active"}
                    onChange={(e) =>
                      handleStatusChange(user.id, e.target.value)
                    }
                    className="border p-1 rounded ml-1"
                  >
                    <option>Active</option>
                    <option>Inactive</option>
                  </select>
                </p>
                <p>
                  <b>Role:</b>{" "}
                  <select
                    value={user.role || "User"}
                    onChange={(e) => handleRoleChange(user.id, e.target.value)}
                    className="border p-1 rounded ml-1"
                  >
                    <option>User</option>
                    <option>Moderator</option>
                    <option>Admin</option>
                  </select>
                </p>
                <button
                  onClick={() => handleDeleteUser(user.id)}
                  className="mt-2 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                >
                  🗑 Delete User
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default AdminPanel;
