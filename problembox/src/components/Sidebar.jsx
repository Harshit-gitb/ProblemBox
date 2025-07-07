import React from 'react'

const sidebar = () => {
  return (
    <>
    <aside>

<div className='top'>
    {/* logo */}
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

export default sidebar