import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, getDocs, updateDoc, doc, deleteDoc } from "firebase/firestore";
import app from "../Firebase.jsx"; // make sure the path is correct

const db = getFirestore(app);
const auth = getAuth(app);

const AdminPanel = () => {
  const [issues, setIssues] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchIssues = async () => {
    const snapshot = await getDocs(collection(db, "issues"));
    setIssues(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  useEffect(() => {
    fetchIssues();
  }, []);

  const updateStatus = async (id, newStatus) => {
    await updateDoc(doc(db, "issues", id), { status: newStatus });
    fetchIssues();
  };

  const deleteIssue = async (id) => {
    await deleteDoc(doc(db, "issues", id));
    fetchIssues();
  };

  const filteredIssues = issues.filter(issue =>
    issue.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
 const Priority = () => {
  const order = { High: 1, Medium: 2, Low: 3 };
  const sorted = [...issues].sort((a, b) => {
    return order[a.priority] - order[b.priority];
  });
  setIssues(sorted);
};

const Votes = () => {
  const sorted = [...issues].sort((a, b) => {
    return (b.upvotes || 0) - (a.upvotes || 0); // high to low
  });
  setIssues(sorted);
};


  return (
    <div className='text-white p-4'>
      <h2 className="text-2xl mb-4 text-black">🛠 Admin Panel</h2>
      <input
        type="text"
        placeholder='Search issue'
        className='p-2 m-1 w-80 text-black border-solid border-black'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)} />
      <button className='p-1 ml-180 bg-orange-700' onClick={Priority}  >Sort by Priority</button>
      <button className='p-1 ml-2 bg-red-700' onClick={Votes} >Sort by Votes</button>

      <div style={{ padding: "20px" }}>
        

        {filteredIssues.map(issue => (
          <div key={issue.id} className="border border-gray-300 p-4 mb-4 text-black bg-white rounded-lg">
            <h4 className="font-bold">{issue.title}</h4>
            <p>{issue.description}</p>
            <p>{issue.priority}</p>
            <p>{issue.tag}</p>
            <p><b>Status:</b> {issue.status || "Pen5ing"}</p>
            <div className="flex gap-2 mt-2 ">
              <button className="bg-green-300 px-2 py-1 rounded-lg" onClick={() => updateStatus(issue.id, "Resolved")}> Resolve</button>
              <button className="bg-blue-300 px-2 py-1 rounded-lg" onClick={() => updateStatus(issue.id, "In Progress")}> In Progress</button>
              <button className="bg-red-300 px-2 py-1 rounded-lg " onClick={() => updateStatus(issue.id, "Rejected")}> Reject</button>
              <button className="bg-red-400 px-2 py-1 text-white rounded-lg " onClick={() => deleteIssue(issue.id)}> Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPanel;
