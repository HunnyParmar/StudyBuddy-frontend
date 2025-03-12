import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaCog } from "react-icons/fa";
import { IoLogOutSharp } from "react-icons/io5";
import { CgProfile } from "react-icons/cg"
const Dashboard = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const user = JSON.parse(localStorage.getItem("user"));
  const userprofile = JSON.parse(localStorage.getItem("userprofile"));
  console.log(user);
  console.log(userprofile);
  
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (!savedToken) {
      navigate("/login");
    } else {
      setToken(savedToken);
    }
  }, [navigate]);

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
    localStorage.removeItem("userData"); // Clear user data if stored
    navigate("/login");
};

  return (
    token && (
      <div className="flex">
        {/* Sidebar */}
        <div className="w-56 h-screen bg-gray-200 p-5 shadow-lg">
          <h2 className="text-2xl font-bold text-teal-600">Menu</h2>
          <ul className="mt-4 space-y-4">
            <li className="flex items-center space-x-3 text-md cursor-pointer hover:text-teal-500">
              <span>Home</span>
            </li>
            <li className="flex items-center space-x-3 text-md cursor-pointer hover:text-teal-500">
              <span>To-Do List</span>
            </li>
            <li className="flex items-center space-x-3 text-md cursor-pointer hover:text-teal-500">
              <span>Focus Buddy</span>
            </li>
            <li className="flex items-center space-x-3 text-md cursor-pointer hover:text-teal-500">
              <span>Study Streak & Reminder</span>
            </li>
            <li className="flex items-center space-x-3 text-md cursor-pointer hover:text-teal-500">
              <span>Create & Join Study Group</span>
            </li>
            <li className="flex items-center space-x-3 text-md cursor-pointer hover:text-teal-500">
              <span>FlashCards</span>
            </li>
            <li className="flex items-center space-x-3 text-md cursor-pointer hover:text-teal-500">
              <span>Quiz</span>
            </li>
            <li className="flex items-center space-x-3 text-md cursor-pointer hover:text-teal-500">
              <span>Progress</span>
            </li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="flex-1 min-h-screen bg-gray-100 text-gray-800">
          {/* Navbar */}
          <nav className="flex justify-between items-center p-4 bg-white shadow-md">
            <h1 className="text-xl font-bold text-teal-600">StudyBuddy</h1>

            <div className="relative inline-block" ref={dropdownRef}>
              {/* Profile Button */}
              <h3>{user}</h3>
              <img
                src={`http://localhost:7000/${userprofile}`} // Use backend URL
                alt="Profile"
                className="w-10 h-10 rounded-full cursor-pointer"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
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

          {/* Dashboard Content */}
          <div className="p-6">
            <h1 className="text-3xl font-bold">Welcome to Your Dashboard</h1>
            <p className="mt-2">Manage your study sessions effectively!</p>
          </div>
        </div>
      </div>
    )
  );
};

export default Dashboard;
