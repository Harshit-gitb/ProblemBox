import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar.jsx";
import Navbar from "./components/Navbar.jsx";
import Dashboard from "./Pages/Dashboard.jsx";
import Raiseissue from "./Pages/Raiseissue.jsx";
import ReportedIssue from "./Pages/ReportedIssue.jsx";
import Adminpanel from "./Pages/Adminpanel.jsx";
import UserDashboard from "./Pages/UserDashboard.jsx";
<<<<<<< HEAD
import Settings from './Pages/Settings';

const Main = ({ username }) => {
=======
import Settings from './Pages/Settings.jsx'
import RightSidebar from './components/RightSidebar';
const Main = ({ username,admin,setAdmin }) => {
>>>>>>> e64daa1c624d9e8d48135655862bb49fb21af3b5
  return (
    <div className="min-h-screen bg-gradient-to-br  from-[#fffdf2] to-[#faecd6]">
      <div className="flex h-screen w-full">
        
        {/* Sidebar */}
        <div className="sticky top-0 h-screen z-30 bg-[#fff7e0] shadow-md">
          <Sidebar setAdmin={setAdmin} admin={admin} />
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
              <Route path="*" element={<h1 className='text-4xl'>Error 404: Page Not Found</h1>} />
              <Route path="/dashboard" element={<Dashboard admin={admin} />} />
              <Route path="/raiseissue" element={<Raiseissue />} />
              <Route path="/reportedissue" element={<ReportedIssue />} /> 
              {admin && <Route path="/adminpanel" element={<Adminpanel />} />} 
              <Route path="/userdashboard" element={<UserDashboard />} />
              <Route path="/settings" element={<Settings />} />
<<<<<<< HEAD

=======
>>>>>>> e64daa1c624d9e8d48135655862bb49fb21af3b5
            </Routes>
          </div>
        </div>
  
      </div>
    </div>
  );
};
<<<<<<< HEAD

=======
>>>>>>> e64daa1c624d9e8d48135655862bb49fb21af3b5
export default Main;