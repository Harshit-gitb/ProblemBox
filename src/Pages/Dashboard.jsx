
import { getAuth } from "firebase/auth";
import { NavLink } from "react-router-dom";

const Dashboard = () => {
  const auth = getAuth();
  const user = auth.currentUser;

  return (
    <div className="flex w-full">
    
           <div className="flex-1 p-6 overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
          <input
            type="text"
            placeholder="Search issues..."
            className="px-4 py-2 border rounded-md w-72 shadow"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded shadow hover:shadow-md">
            <h2 className="text-lg font-bold">Raise an Issue</h2>
            <p className="text-sm text-gray-600">Submit your concerns easily</p>
            <div className="mt-2 text-xs text-red-500">Pending Issues</div>
          </div>

          <div className="bg-white p-4 rounded shadow hover:shadow-md">
            <h2 className="text-lg font-bold">Reported Issues</h2>
            <p className="text-sm text-gray-600">View and manage issues</p>
            <div className="mt-2 text-xs text-yellow-600">
              3 issues | High Priority
            </div>
          </div>

          <div className="bg-white p-4 rounded shadow hover:shadow-md">
            <h2 className="text-lg font-bold">Admin Panel</h2>
            <p className="text-sm text-gray-600">Manage all reported issues</p>
            <div className="mt-2 text-xs text-gray-600">Awaiting review</div>
          </div>

          <div className="bg-white p-4 rounded shadow hover:shadow-md">
            <h2 className="text-lg font-bold">Your Submissions</h2>
            <p className="text-sm text-gray-600">Track your contributions</p>
            <div className="mt-2 text-xs text-green-600">Active</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2"></div>
        <div className="bg-white p-4 rounded shadow">
          <h4 className="text-lg font-semibold mb-2">Issue Overview</h4>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Server Downtime</span>
              <span className="text-red-600">Resolved</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>UI Bug</span>
              <span className="text-yellow-600">Pending</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Minor Glitch</span>
              <span className="text-gray-600">Low</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
