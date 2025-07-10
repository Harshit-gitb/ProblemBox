import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const YourComponent = () => {
  const auth = getAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      signOut(auth)
        .then(() => {
          alert("Logged out successfully!");
          navigate("/login");
        })
        .catch((error) => {
          alert("Logout failed: " + error.message);
        });
    }
  };

  return (
    <button
      className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded text-sm"
      onClick={handleLogout}
    >
      Logout
    </button>
  );
};
