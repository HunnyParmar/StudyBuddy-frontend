import React, { useEffect, useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaHome, FaListAlt, FaSearch, FaQuestionCircle, FaBell } from "react-icons/fa";
import { IoLogOutSharp } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { useAuthStore } from '../../Store/useAuthStore';
import axios from "../../App/axios"; // ✅ using base axios
import { motion } from "framer-motion";

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

    // Add event listener for user data updates
    const handleUserDataUpdate = (event) => {
      const savedUser = localStorage.getItem("user");
      if (savedUser) {
        const userData = JSON.parse(savedUser);
        // If we have a new profile picture from the event, use it with timestamp
        if (event.detail?.ProfilePicture) {
          userData.ProfilePicture = `${event.detail.ProfilePicture}?t=${event.detail.timestamp}`;
        }
        setUserData(userData);
      }
    };

    window.addEventListener("userDataUpdated", handleUserDataUpdate);

    // Cleanup
    return () => {
      window.removeEventListener("userDataUpdated", handleUserDataUpdate);
    };
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
        {/* Sidebar */}
        <div className="w-56 h-screen bg-white p-4 shadow-lg fixed top-0 left-0 z-50">
          <h2 className="text-2xl font-bold text-teal-600 pt-2 pb-4 pl-2 text-left">
            StudyBuddy
          </h2>

          <ul className="mt-4 space-y-4">
            <Link to="/progress">
              <motion.li
                whileHover={{ scale: 1.05, backgroundColor: "#E6FFFA" }}
                className="flex items-center space-x-3 px-3 py-2 rounded-md cursor-pointer mb-4"
              >
                <FaHome className="text-teal-600" />
                <span className="text-gray-700 text-base">Home</span>
              </motion.li>
            </Link>

            <Link to="/todo">
              <motion.li
                whileHover={{ scale: 1.05, backgroundColor: "#E6FFFA" }}
                className="flex items-center space-x-3 px-3 py-2 rounded-md cursor-pointer mb-4"
              >
                <FaListAlt className="text-teal-600" />
                <span className="text-gray-700 text-base">To-Do List</span>
              </motion.li>
            </Link>

            <Link to="/flashcard">
              <motion.li
                whileHover={{ scale: 1.05, backgroundColor: "#E6FFFA" }}
                className="flex items-center space-x-3 px-3 py-2 rounded-md cursor-pointer mb-4"
              >
                <FaListAlt className="text-teal-600" />
                <span className="text-gray-700 text-base">FlashCard</span>
              </motion.li>
            </Link>

            <Link to="/search-users">
              <motion.li
                whileHover={{ scale: 1.05, backgroundColor: "#E6FFFA" }}
                className="flex items-center space-x-3 px-3 py-2 rounded-md cursor-pointer mb-4"
              >
                <FaSearch className="text-teal-600" />
                <span className="text-gray-700 text-base">Find Buddy</span>
              </motion.li>
            </Link>

            <Link to="/quiz">
              <motion.li
                whileHover={{ scale: 1.05, backgroundColor: "#E6FFFA" }}
                className="flex items-center space-x-3 px-3 py-2 rounded-md cursor-pointer mb-4"
              >
                <FaQuestionCircle className="text-teal-600" />
                <span className="text-gray-700 text-base">Quiz</span>
              </motion.li>
            </Link>

            <Link to="/homepage">
              <motion.li
                whileHover={{ scale: 1.05, backgroundColor: "#E6FFFA" }}
                className="flex items-center space-x-3 px-3 py-2 rounded-md cursor-pointer mb-4"
              >
                <FaBell className="text-teal-600" />
                <span className="text-gray-700 text-base">Notifications</span>
              </motion.li>
            </Link>
            <Link to="/leaderboard">
              <motion.li
                whileHover={{ scale: 1.05, backgroundColor: "#E6FFFA" }}
                className="flex items-center space-x-3 px-3 py-2 rounded-md cursor-pointer mb-4"
              >
                <FaBell className="text-teal-600" />
                <span className="text-gray-700 text-base">Leader Board</span>
              </motion.li>
            </Link>

          </ul>
        </div>
        {/* Main Content */}
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
                  src={userData.ProfilePicture.includes('?t=')
                    ? `http://localhost:7000/${userData.ProfilePicture}`
                    : `http://localhost:7000/${userData.ProfilePicture}?t=${Date.now()}`}
                  alt="Profile"
                  className="w-10 h-10 rounded-full object-cover border border-gray-300"
                />
              ) : (
                <CgProfile className="w-10 h-10 text-gray-500" />
              )}

              {isDropdownOpen && (
                <div className="absolute top-full right-0 w-48 bg-white rounded-lg shadow-lg border border-gray-300 z-50">
                  <ul className="text-gray-700">
                    <Link to="/profile">
                      <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer flex items-center">
                        <CgProfile className="inline-block mr-2" />
                        Profile
                      </li>
                    </Link>
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
        <div className="flex-1 ml-48 p-4 "></div>
      </div>
    )
  );
};

export default Dashboard;
