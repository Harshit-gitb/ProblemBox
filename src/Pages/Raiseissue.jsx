import React, { useState } from "react";
import { submitIssue } from "../utils/firestoreHelpers";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Raiseissue = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tag: "",
    priority: "High",
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    if (formData.title.trim() && formData.description.trim()) {
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) {
        alert("Please login to raise an issue.");
        return;
      }

      try {
        await submitIssue(formData, user.email);
        alert("Issue submitted successfully!");
        setFormData({
          title: "",
          description: "",
          tag: "",
          priority: "High",
        });
      } catch (err) {
        console.error("Error submitting issue:", err);
        alert("Failed to submit issue.");
      }
    } else {
      alert("Please fill all required fields.");
    }
  };

  const handleLogout = async () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      await signOut(getAuth());
      navigate("/login");
    }
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div className=" bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">

        {/* Raise an Issue Form */}
        <div className="bg-red-50 rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Raise an Issue
          </h2>
          <div className="space-y-4">
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Issue Title"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg"
            />
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Description"
              rows="4"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg resize-none"
            />
            <select
              name="tag"
              value={formData.tag}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white"
            >
              <option value="">Select Tag</option>
              <option value="HR_Employee_Issues">HR & Employee Issues</option>
              <option value="Office_Infrastructure_Issues">
                Office Infrastructure Issues
              </option>
              <option value="Office_Supplies_Assets">
                Office Supplies & Assets
              </option>
              <option value="Training_Access_Issues">
                Training & Access Issues
              </option>
              <option value="Administrative_Process_Issues">
                Administrative/Process Issues
              </option>
              <option value="others">Others</option>
            </select>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white"
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
            <button
              onClick={handleSubmit}
              className="w-full bg-red-700 hover:bg-red-800 text-white py-3 px-6 rounded-lg"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Raiseissue;
