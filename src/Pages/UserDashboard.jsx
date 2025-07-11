import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, onSnapshot } from "firebase/firestore";
import app from "../Firebase.jsx"; // adjust path if needed

const db = getFirestore(app);
const auth = getAuth(app);

export default function UserDashboard() {
  const [userIssues, setUserIssues] = useState([]);
  const user = auth.currentUser;

  useEffect(() => {
    if (!user) return;

    const unsub = onSnapshot(collection(db, "issues"), (snapshot) => {
      const filtered = snapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .filter((issue) => issue.createdBy === user.email);
      setUserIssues(filtered);
    });

    return () => unsub();
  }, [user]);

  return (
    <div className="p-6 text-black">
      <h2 className="text-2xl font-bold mb-4">
        👤 Welcome, {user?.email || "User"}
      </h2>

      <h3 className="text-xl font-semibold mb-2">📋 Your Submitted Issues:</h3>

      {userIssues.length === 0 ? (
        <p className="text-gray-600">You haven't raised any issues yet.</p>
      ) : (
        userIssues.map((issue) => (
          <div key={issue.id} className="bg-white shadow p-4 rounded mb-3 border">
            <h4 className="font-bold">{issue.title}</h4>
            <p>{issue.description}</p>
            <p><b>Priority:</b> {issue.priority}</p>
            <p><b>Status:</b> {issue.status}</p>
            <p><b>Upvotes:</b> {issue.upvotes || 0}</p>
          </div>
        ))
      )}
    </div>
  );
}
