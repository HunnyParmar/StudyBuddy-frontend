import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCog, FaMoon, FaSun } from "react-icons/fa";
import { IoLogOutSharp } from "react-icons/io5";

const Dashboard = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState(null);
  const [darkMode, setDarkMode] = useState(localStorage.getItem("theme") === "dark");

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (!savedToken) {
      navigate("/login"); // Redirect if no token
    } else {
      setToken(savedToken);
    }

    // Apply dark mode
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [navigate, darkMode]);

  const toggleDarkMode = () => {
    const newTheme = darkMode ? "light" : "dark";
    localStorage.setItem("theme", newTheme);
    setDarkMode(!darkMode);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    token && (
      <div className="flex">
        {/* Sidebar */}
        <div className="w-56 h-screen bg-gray-200 dark:bg-gray-900 p-5 shadow-lg">
          <h2 className="text-2xl font-bold text-teal-600 dark:text-teal-400">Menu</h2>
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
          <button
            className="mt-6 flex items-center space-x-2 text-lg text-gray-700 dark:text-gray-300 hover:text-teal-500"
            onClick={toggleDarkMode}
          >
            {darkMode ? <FaSun /> : <FaMoon />}
            <span>{darkMode ? "Light Mode" : "Dark Mode"}</span>
          </button>
        </div>

        {/* Main Content */}
        <div className="flex-1 min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white">
          {/* Navbar */}
          <nav className="flex justify-between items-center p-4 bg-white dark:bg-gray-800 shadow-md">
            <h1 className="text-xl font-bold text-teal-600 dark:text-teal-400">StudyBuddy</h1>

            {/* Profile & Settings */}
            <div className="flex items-center space-x-4">
              {/* Settings Icon */}
              <button className="text-gray-600 dark:text-gray-300 text-xl hover:text-teal-500">
                <FaCog />
              </button>
              <button className="text-gray-600 dark:text-gray-300 text-xl hover:text-teal-500" onClick={handleLogout}>
              <IoLogOutSharp />
              </button>

              {/* Profile Picture */}
              <div className="w-10 h-10 bg-gray-400 dark:bg-gray-700 rounded-full flex items-center justify-center cursor-pointer">
                <span className="text-white font-bold">U</span> {/* Initials or image here */}
              </div>

              {/* Logout Button
              <button
                className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600"
                
              >
                Logout
              </button> */}
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
