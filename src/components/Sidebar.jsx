import React from 'react'
import "../styles/sidebar.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGear,
  faSignOutAlt,
  faUser,
  faBug,
  faUserShield
} from '@fortawesome/free-solid-svg-icons';

const Sidebar = () => {
  return (
    <>
    <aside>

<div className='top'>
    ProblemBox 🔐
</div>
<div className='links_sidebar'>
    {/* links dashboard etc */}
    <button className='sidebar_button'>
        Dashboard
    </button>
    <button className='sidebar_button'>
        Raise issue
    </button>
    <button className='sidebar_button'>
        Reported issue
    </button>
    <button className='sidebar_button'>
        Admin panel
    </button>
    <button className='sidebar_button'>
        User Dashboard
    </button>
</div>
<div className='botttom'>
    <button>
        Settings
    </button>
<button>
    Logout
</button>
</div>
    </aside>
 
    </>
  )
}

export default Sidebar