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
import app from "../Firebase.jsx";

const db = getFirestore(app);
const auth = getAuth(app);

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState("issues");
  const [issues, setIssues] = useState([]);
  const [users, setUsers] = useState([]);
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

  const filteredIssues = issues.filter((issue) =>
    issue.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredUsers = users.filter((user) =>
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const Priority = () => {
    const order = { High: 1, Medium: 2, Low: 3 };
    const sorted = [...issues].sort((a, b) => order[a.priority] - order[b.priority]);
    setIssues(sorted);
  };

  const Votes = () => {
    const sorted = [...issues].sort((a, b) => (b.upvotes || 0) - (a.upvotes || 0));
    setIssues(sorted);
  };

  return (
    <div className="text-black p-4">
      <div className="flex gap-4 mb-6">
        <button
          className={`px-4 py-2 rounded ${activeTab === "issues" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          onClick={() => setActiveTab("issues")}
        >
          Issue Management
        </button>
        <button
          className={`px-4 py-2 rounded ${activeTab === "users" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          onClick={() => setActiveTab("users")}
        >
          User Management
        </button>
      </div>

      {/* Issue Management */}
      {activeTab === "issues" && (
        <>
          <h2 className="text-2xl mb-4">🛠 Issue Management</h2>
          <input
            type="text"
            placeholder="Search issue"
            className="p-2 m-1 w-80 border text-black"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="p-1 ml-2 bg-orange-700 text-white" onClick={Priority}>
            Sort by Priority
          </button>
          <button className="p-1 ml-2 bg-red-700 text-white" onClick={Votes}>
            Sort by Votes
          </button>

          <div className="mt-4">
            {filteredIssues.map((issue) => (
              <div key={issue.id} className="bg-white border p-4 mb-4 rounded-lg">
                <h4 className="font-bold">{issue.title}</h4>
                <p>{issue.description}</p>
                <p><b>Priority:</b> {issue.priority}</p>
                <p><b>Tag:</b> {issue.tag}</p>
                <p><b>Status:</b> {issue.status || "Pending"}</p>
                <div className="flex gap-2 mt-2">
                  <button onClick={() => updateStatus(issue.id, "Resolved")} className="bg-green-300 px-2 py-1 rounded-lg">Resolve</button>
                  <button onClick={() => updateStatus(issue.id, "In Progress")} className="bg-blue-300 px-2 py-1 rounded-lg">In Progress</button>
                  <button onClick={() => updateStatus(issue.id, "Rejected")} className="bg-red-300 px-2 py-1 rounded-lg">Reject</button>
                  <button onClick={() => deleteIssue(issue.id)} className="bg-red-500 px-2 py-1 text-white rounded-lg">Delete</button>
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
            className="p-2 m-1 w-80 border text-black"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="mt-4">
            {filteredUsers.map((user) => (
              <div key={user.id} className="bg-white border p-4 mb-4 rounded-lg">
                <h4 className="font-bold">{user.name || "Unnamed User"}</h4>
                <p>{user.email}</p>
                <p>
                  <b>Status:</b>{" "}
                  <select
                    value={user.status || "Active"}
                    onChange={(e) => handleStatusChange(user.id, e.target.value)}
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
                <button onClick={() => handleDeleteUser(user.id)} className="mt-2 bg-red-500 text-white px-3 py-1 rounded">
                  Delete User
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
