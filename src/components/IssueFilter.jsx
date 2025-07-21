import React from "react";

export default function IssueFilter({ searchTerm, setSearchTerm, sortBy, setSortBy }) {
  return (
    <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
      {/* Search bar */}
      <div className="flex-1 min-w-[200px]">
        <input
          type="text"
          placeholder="Search by issue title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
      </div>

      {/* Sort dropdown */}
      <div className="min-w-[180px]">
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
        >
          <option value="">Sort by</option>
          <option value="votes">Votes</option>
          <option value="priority">Priority</option>
          <option value="recent">Most Recent</option>
        </select>
      </div>
    </div>
  );
}
