import profile_logo from "../assets/profile_logo.png"

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        {/* Page Name */}
        <div className="text-xl md:text-2xl font-semibold text-gray-800">
          Problem Box
        </div>

        {/* Search Bar */}
        <div className="flex-1 mx-6 max-w-md">
          <input
            type="text"
            placeholder="Search..."
            className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Profile Image */}
        <div className="w-10 h-10 rounded-full overflow-hidden">
          <img
           src = "https://img.freepik.com/premium-vector/avatar-guest-vector-icon-illustration_1304166-97.jpg?semt=ais_hybrid&w=740https://img.freepik.com/premium-vector/avatar-guest-vector-icon-illustration_1304166-97.jpg?semt=ais_hybrid&w=740https://img.freepik.com/premium-vector/avatar-guest-vector-icon-illustration_1304166-97.jpg?semt=ais_hybrid&w=740://e7.pngegg.com/pngimages/980/304/png-clipart-computer-icons-user-profile-avatar-heroes-silhouette.png"  // You can replace this with actual user profile image
            alt="Profile"
            className="w-full h-full object-cover"
          />  
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
