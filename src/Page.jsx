import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar.jsx";
import Navbar from "./components/Navbar.jsx";
import Dashboard from "./Pages/Dashboard.jsx";
import Raiseissue from "./Pages/Raiseissue.jsx";
import ReportedIssue from "./Pages/ReportedIssue.jsx";
import Adminpanel from "./Pages/Adminpanel.jsx";
import UserDashboard from "./Pages/UserDashboard.jsx"
const Main = () => {
  return (
    <>
    <div className="flex h-screen">
  {/* Sidebar */}
  <div className="w-64 sticky top-0 h-screen z-30">
    <Sidebar />
  </div>

  <div className="flex-1 flex flex-col overflow-hidden">
    <div className="sticky top-0 h-16 z-120 bg-white shadow">
      <Navbar />
    </div>

    <div className="flex-1 overflow-y-auto p-4">
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/raiseissue" element={<Raiseissue />} />
        <Route path="/reportedissue" element={<ReportedIssue />} />
        <Route path="/adminpanel" element={<Adminpanel />} />
        <Route path="/userdashboard" element={<UserDashboard />} />
      </Routes>
    </div>
  </div>
</div>

    </>
  )
}

export default Main