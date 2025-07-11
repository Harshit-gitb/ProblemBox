import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar.jsx";
import Navbar from "./components/Navbar.jsx";
import Dashboard from "./Pages/Dashboard.jsx";
import Raiseissue from "./Pages/Raiseissue.jsx";

const Main = () => {
  return (
    <>
    <div >
        <Sidebar />
        <div>
          <Navbar/>
          <div>
          <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/raiseissue" element={ <Raiseissue />} />
        </Routes>
        </div>
        </div>  
    </div>
    </>
  )
}

export default Main