import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaCog } from "react-icons/fa";
import { IoLogOutSharp } from "react-icons/io5";
import { CgProfile } from "react-icons/cg"

const Dashboard = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState(null);
  const [userData, setUserData] = useState({});
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  useEffect(() => {
    const savedToken = localStorage.getItem("token"); // Correct key check

    if (!savedToken) {
      navigate("/login");
    } else {
      setToken(savedToken);
    // Fetch user data
    const fetchUserData = async () => {
      try {
        const response = await fetch("http://localhost:7000/user/details", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${savedToken}`, // Add 'Bearer' before token
          },
      });
      
        const data = await response.json();
        if (response.ok) {
          setUserData(data);  // Set user data state
        } else {
          console.error("Failed to fetch user data:", data.message);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }
}, [navigate, setToken, setUserData]);

  // Close dropdown when clicking outside
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
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    navigate("/login");
  };


  return (
    token && (
      <div className="flex">
        {/* Sidebar */}
        <div className="w-56 h-screen bg-gray-200 p-4 shadow-lg">
          <h2 className="text-2xl font-bold text-teal-600 pt-4 pb-6">StudyBuddy</h2>
          <ul className="mt-4 space-y-4">
            <li className="flex items-center space-x-3 text-md cursor-pointer hover:text-teal-500">
              <span>Home</span>
            </li>
            <li className="flex items-center space-x-3 text-md cursor-pointer hover:text-teal-500">
              <span>To-Do List</span>
            </li>
            <li className="flex items-center space-x-3 text-md cursor-pointer hover:text-teal-500">
              <span>FlashCards</span>
            </li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="flex-1 min-h-screen bg-gray-100 text-gray-800">
          {/* Navbar */}
          <nav className="flex justify-between items-center p-3 bg-white shadow-md">
            
            
            {/* Display Profile Info */}
            <div className="relative flex items-center cursor-pointer ml-200" ref={dropdownRef} onClick={() => setIsDropdownOpen((prev) => !prev)}>
            <h1 className="font-medium ml-[4px] mr-4">{userData.UserName || "User"}</h1>

              <img
                src={`http://localhost:7000/${userData.ProfilePicture}`} // Assuming image is stored as a URL
                alt="Profile"
                className="w-10 h-10 rounded-full"
              />

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute top-full right-0 w-48 bg-white rounded-lg shadow-lg overflow-hidden border border-gray-300">
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
      </div>
    )
  );
};

export default Dashboard;
