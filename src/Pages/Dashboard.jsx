import { getAuth } from "firebase/auth";
import { NavLink } from "react-router-dom";

const Dashboard = () => {
  const auth = getAuth();
  const user = auth.currentUser;

  return (
    <div className="flex w-full">
      <div className="flex-1 p-6 overflow-y-auto">
        

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
    </div>
  );
};

export default Dashboard;
