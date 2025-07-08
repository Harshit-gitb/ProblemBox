import React from 'react'
import "../styles/sidebar.css";
const Sidebar = () => {
  return (
    <>
    <aside>

<div className='top'>
    {/* logo */}
    hello
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
    {/* logout */}
</div>
    </aside>
    </>
  )
}

export default Sidebar