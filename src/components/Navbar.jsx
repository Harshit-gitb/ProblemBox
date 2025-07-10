import profile from "../assets/profile.png";

const Navbar = ({ setshowLogin }) => {
  const loginHandler = () => {
    setshowLogin(true); // Hide sidebar and navbar
  };

  return (
    <nav className="bg-white shadow-md px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-xl md:text-2xl font-semibold text-gray-800">
          Issue Raise
        </div>

        <div className="flex-1 mx-6 max-w-md">
          <input
            type="text"
            placeholder="Search..."
            className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="flex gap-8 items-center">
          <h2>username</h2>
              <div className="w-10 h-10 rounded-full overflow-hidden cursor-pointer" onClick={loginHandler}>
                <img
                  src={profile}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
