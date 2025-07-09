import React, { useState } from 'react';
import Sidebar from "./Sidebar.jsx";
import { getAuth, signOut } from "firebase/auth";
import app from "../Firebase.jsx"; // or './firebase' if it's in the same folder


const Raiseissue = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    infrastructure: '',
    priority: 'High'
  });

  const [issues, setIssues] = useState([
    {
      id: 1,
      title: 'Issue Title 1',
      tag: 'Infrastructure',
      priority: 'High',
      upvotes: 23,
      downvotes: 5,
      status: 'Open'
    },
    {
      id: 2,
      title: 'Issue Title 2',
      tag: 'Technical',
      priority: 'Medium',
      upvotes: 15,
      downvotes: 3,
      status: 'In Progress'
    },
    {
      id: 3,
      title: 'Issue Title 3',
      tag: 'General',
      priority: 'Low',
      upvotes: 10,
      downvotes: 2,
      status: 'Resolved'
    }
  ]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    if (formData.title.trim() && formData.description.trim()) {
      const newIssue = {
        id: issues.length + 1,
        title: formData.title,
        tag: formData.infrastructure || 'General',
        priority: formData.priority,
        upvotes: 0,
        downvotes: 0,
        status: 'Open'
      };
      setIssues(prev => [...prev, newIssue]);
      setFormData({
        title: '',
        description: '',
        infrastructure: '',
        priority: 'High'
      });
    }
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'High': return 'text-red-600';
      case 'Medium': return 'text-orange-600';
      case 'Low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Open': return 'bg-blue-100 text-blue-800';
      case 'In Progress': return 'bg-yellow-100 text-yellow-800';
      case 'Resolved': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (

    <>
          

    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm mb-6 p-4 flex justify-between items-center">
          <div className="flex items-center">
            <div className="w-6 h-6 bg-gray-800 rounded mr-3"></div>
            <h1 className="text-xl font-semibold text-gray-900">Problem Box</h1>
          </div>
          <div className="flex space-x-2">
            <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm">
              Login
            </button>
            <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded text-sm">
              Logout
            </button>
          </div>
        </div>

        {/* Raise an Issue Form */}
        <div className="bg-red-50 rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Raise an Issue</h2>
          <div className="space-y-4">
            <div>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Issue Title"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Description"
                rows="4"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
              />
            </div>
            
            <div>
              {/* <input
                type="text"
                name="infrastructure"
                value={formData.infrastructure}
                onChange={handleInputChange}
                placeholder="Infrastructure"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              /> */}

              <select
                name="issue_related"
                value={formData.issue_related}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white"
              >
                <option value="HR_Employee_Issues">HR & Employee Issues</option>
                <option value="Office_Infrastructure_Issues">Office Infrastructure Issues</option>
                <option value="Office_Supplies_Assets">Office Supplies & Assets</option>
                <option value="Training_Access_Issues">Training & Access Issues</option>
                <option value="Administrative_Process_Issues">Administrative/Process Issues</option>
                <option value="others">Others</option>
              </select>
            </div>
            
            <div>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white"
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
            
            <button
              onClick={handleSubmit}
              className="w-full bg-red-700 hover:bg-red-800 text-white py-3 px-6 rounded-lg font-medium transition-colors"
            >
              Submit
            </button>
          </div>
        </div>

        {/* Issues Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {issues.map((issue) => (
            <div key={issue.id} className="bg-gray-200 rounded-lg p-6">
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{issue.title}</h3>
                <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                  <span>Tag: {issue.tag}</span>
                  <span className={`font-medium ${getPriorityColor(issue.priority)}`}>
                    Priority: {issue.priority}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                <div className="flex items-center space-x-4">
                  <span>Upvotes: {issue.upvotes}</span>
                  <span>Downvotes: {issue.downvotes}</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Status:</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(issue.status)}`}>
                    {issue.status}
                  </span>
                </div>
                <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm transition-colors">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </>
  );
};

export default Raiseissue;