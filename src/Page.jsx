import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar.jsx";
import Navbar from "./components/Navbar.jsx";
import Dashboard from "./Pages/Dashboard.jsx";
import Raiseissue from "./Pages/Raiseissue.jsx";
import ReportedIssue from "./Pages/ReportedIssue.jsx";
import Adminpanel from "./Pages/Adminpanel.jsx";
import UserDashboard from "./Pages/UserDashboard.jsx";
import Settings from './Pages/Settings';

const Main = ({ username }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br  from-[#fffdf2] to-[#faecd6]">
      <div className="flex h-screen w-full">
        
        {/* Sidebar */}
        <div className="sticky top-0 h-screen z-30 bg-[#fff7e0] shadow-md">
          <Sidebar />
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden w-200">
          
          {/* Navbar */}
          <div className="sticky top-0 h-16 z-50 bg-[#fffdf5] shadow-md border-b border-yellow-100">
            <Navbar username={username} />
          </div>
          
          {/* Page Routes */}
          <div className="flex-1 overflow-y-auto p-6 bg-transparent">
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/raiseissue" element={<Raiseissue />} />
              <Route path="/reportedissue" element={<ReportedIssue />} /> 
              <Route path="/adminpanel" element={<Adminpanel />} />
              <Route path="/userdashboard" element={<UserDashboard />} />
              <Route path="/settings" element={<Settings />} />

            </Routes>
          </div>
        </div>
  
      </div>
    </div>
  );
};

export default Main;