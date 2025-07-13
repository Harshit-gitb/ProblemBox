import axios from "axios";
import { useState, useEffect } from "react";

const RightSidebar = () => {
  const [lists, setlists] = useState([]);

  useEffect(() => {
    const BusinessDetails = async () => {
      try {
        const response = await axios.get("https://zenquotes.io/api/random",
  {
    headers: {
      accept: "application/json",
    },
  }
);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    BusinessDetails();
  }, []);

  return (
    <aside className="w-64 bg-gray-100 p-4 border-l border-gray-300 h-screen overflow-y-auto">
      <h2 className="text-xl font-semibold mb-4">Right Sidebar</h2>

      <ul className="space-y-2">
        <li className="p-2 bg-white rounded shadow hover:bg-gray-50 cursor-pointer">
          🔔 Notifications
        </li>
        <li className="p-2 bg-white rounded shadow hover:bg-gray-50 cursor-pointer">
          📁 Recent Files
        </li>
        <li className="p-2 bg-white rounded shadow hover:bg-gray-50 cursor-pointer">
          ⚙️ Settings
        </li>
        <li className="p-2 bg-white rounded shadow hover:bg-gray-50 cursor-pointer">
          📅 Upcoming Tasks
        </li>
      </ul>
    </aside>
  );
};

export default RightSidebar;
