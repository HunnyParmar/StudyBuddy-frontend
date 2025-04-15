import React, { useEffect, useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaCog } from "react-icons/fa";
import { IoLogOutSharp } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { useAuthStore } from '../../Store/useAuthStore';
import axios from "../../App/axios"; // ✅ using base axios

const Dashboard = () => {
  const navigate = useNavigate();
  const { disconnectSocket } = useAuthStore();
  const [token, setToken] = useState(null);
  const [userData, setUserData] = useState({});
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");

    if (!savedToken) {
      navigate("/login");
    } else {
      setToken(savedToken);

      const fetchUserData = async () => {
        try {
          const response = await axios.get("/user/details", {
            headers: {
              Authorization: `Bearer ${savedToken}`,
            },
          });

          setUserData(response.data);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };

      fetchUserData();
    }
  }, [navigate]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    disconnectSocket();
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    token && (
      <div className="flex">
        <div className="w-56 h-screen bg-gray-100/50 p-4 shadow-lg fixed top-0 left-0 z-50">
          <h2 className="text-2xl font-bold text-teal-600 pt-4 pb-6">StudyBuddy</h2>
          <ul className="mt-4 space-y-4">
            <li className="hover:text-teal-500"><Link to="/dashboard">Home</Link></li>
            <li className="hover:text-teal-500"><Link to="/todo">To-Do List</Link></li>
            <li className="hover:text-teal-500"><Link to="/flashcard">FlashCard</Link></li>
            <li className="hover:text-teal-500"><Link to="/search-users">Find Buddy</Link></li>
            <li className="hover:text-teal-500"><Link to="/quiz">Quiz</Link></li>
            <li className="hover:text-teal-500"><Link to="/homepage">Notifications</Link></li>
          </ul>
        </div>

        <div className="flex-1 min-h-screen bg-gray-100 text-gray-800">
          <nav className="fixed top-0 left-56 right-0 flex justify-between items-center p-3 bg-white shadow-md z-50">
            <span></span>

            <div
              className="relative flex items-center cursor-pointer space-x-2"
              ref={dropdownRef}
              onClick={() => setIsDropdownOpen((prev) => !prev)}
            >
              <h1 className="font-medium hidden sm:block">
                {userData.UserName || "User"}
              </h1>

              {userData.ProfilePicture ? (
                <img
                  src={`http://localhost:7000/${userData.ProfilePicture}`}
                  alt="Profile"
                  className="w-10 h-10 rounded-full object-cover border border-gray-300"
                />
              ) : (
                <CgProfile className="w-10 h-10 text-gray-500" />
              )}

              {isDropdownOpen && (
                <div className="absolute top-full right-0 w-48 bg-white rounded-lg shadow-lg border border-gray-300 z-50">
                  <ul className="text-gray-700">
                    <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                      <CgProfile className="inline-block mr-2" />
                      Profile
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                      <FaCog className="inline-block mr-2" />
                      Settings
                    </li>
                    <li
                      className="px-4 py-2 flex items-center space-x-2 hover:bg-red-500 hover:text-white cursor-pointer"
                      onClick={handleLogout}
                    >
                      <IoLogOutSharp />
                      <span>Logout</span>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </nav>
        </div>
        <div className="flex-1 ml-48 p-4"></div>
      </div>
    )
  );
};

export default Dashboard;
