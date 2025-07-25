import profile from "../assets/profile.png";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";

const Navbar = ({ setshowLogin, username }) => {
  const [avatar, setAvatar] = useState(profile); // default to profile.png

  const currLoc = useLocation();
  const currentPath = currLoc.pathname;

  const pageTitles = {
    "/": "Dashboard",
    "/raiseissue": "Raise Issue",
    "/reportedissue": "Reported Issue",
    "/userdashboard": "User Dashboard",
    "/adminpanel": "Admin Panel",
    "/settings": "Settings",
  };

  const title = pageTitles[currentPath] || "Problem Box";

  const loginHandler = () => {
    setshowLogin(true);
    alert("Login button clicked");
  };

  // 🔄 Fetch avatar from Firestore
  useEffect(() => {
    const fetchAvatar = async () => {
      const auth = getAuth();
      const user = auth.currentUser;

      if (user) {
        const db = getFirestore();
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const userData = userSnap.data();
          if (userData.avatar) {
            setAvatar(userData.avatar);
          }
        }
      }
    };

    fetchAvatar();
  }, []);

  return (
    <nav className="bg-white shadow-md px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="text-xl md:text-2xl font-semibold text-gray-800">
          {title}
        </div>

        <div className="flex-1 mx-6 max-w-md">
          <input
            type="text"
            placeholder="Search..."
            className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="flex gap-8 items-center">
          <h2>{username}</h2>
          <div
            className="w-10 h-10 rounded-full overflow-hidden cursor-pointer"
            onClick={loginHandler}
          >
            <img
              src={avatar}
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
