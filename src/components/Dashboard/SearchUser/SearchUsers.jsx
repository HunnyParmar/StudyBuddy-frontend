import React, { useState, useEffect, useMemo } from "react";
import axios from "../../../App/axios";
import { FaComments } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Dashboard from "../Dashboard";
import Select from "react-select";
import countryList from "react-select-country-list";
import { motion } from "framer-motion";

const SearchUsers = () => {
  const [users, setUsers] = useState([]);
  const [searchParams, setSearchParams] = useState({
    EducationLevel: "",
    Subject: "",
    Country: ""
  });

  const navigate = useNavigate();
  const countryOptions = useMemo(() => countryList().getData(), []);

  // Get logged-in user ID from localStorage
  const loggedInUser = JSON.parse(localStorage.getItem("user"));
  const loggedInUserId = loggedInUser?._id;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const hasFilters =
          searchParams.EducationLevel ||
          searchParams.Subject ||
          searchParams.Country;

        const response = hasFilters
          ? await axios.get("/user/search-users", { params: searchParams })
          : await axios.get("/user/search-users");

        // ✅ Safe filtering to exclude the logged-in user
        const filteredUsers = loggedInUserId
          ? response.data.filter((user) => user._id !== loggedInUserId)
          : response.data;

        setUsers(filteredUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [searchParams, loggedInUserId]);

  const handleChatClick = (userId) => {
    localStorage.setItem("chatUserId", userId);
    navigate(`/chat/${userId}`);
  };

  return (
    <div className="flex h-screen">
      <Dashboard />
      <div className="flex-1 flex flex-col bg-gray-50 overflow-auto p-6 pt-20">
        <div className="container mx-auto p-4">
          <h2 className="text-3xl font-bold mb-8 text-teal-700">Find Study Buddy</h2>

          {/* Search Filters */}
          <div className="flex flex-wrap sm:flex-nowrap gap-4 mb-8">
            <input
              type="text"
              placeholder="Education Level"
              value={searchParams.EducationLevel}
              onChange={(e) =>
                setSearchParams({
                  ...searchParams,
                  EducationLevel: e.target.value,
                })
              }
              className="border border-gray-300 p-2 bg-white rounded-md flex-1 min-w-[180px]"
            />
            <input
              type="text"
              placeholder="Subject"
              value={searchParams.Subject}
              onChange={(e) =>
                setSearchParams({
                  ...searchParams,
                  Subject: e.target.value,
                })
              }
              className="border border-gray-300 p-2 bg-white rounded-md flex-1 min-w-[180px]"
            />
            <Select
              options={countryOptions}
              placeholder="Select Country"
              className="flex-1 min-w-[180px]"
              onChange={(selectedOption) =>
                setSearchParams({
                  ...searchParams,
                  Country: selectedOption.label,
                })
              }
              value={
                searchParams.Country
                  ? {
                      label: searchParams.Country,
                      value: searchParams.Country,
                    }
                  : null
              }
            />
          </div>

          {/* User Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {users.length > 0 ? (
              users.map((user, index) => (
                <motion.div
                  key={user._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.4 }}
                  className="bg-white rounded-2xl shadow-md overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  {/* Gradient Header with Avatar + Name */}
                  <div className="bg-[radial-gradient(at_20%_30%,#0f766e_0%,transparent_40%),radial-gradient(at_80%_20%,#0e7490_0%,transparent_50%),radial-gradient(at_50%_80%,#0f766e_0%,transparent_45%),radial-gradient(at_70%_60%,#115e59_0%,transparent_40%)] bg-teal-900 px-4 py-2 flex items-center gap-4">
                    <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-teal-600 font-bold text-lg">
                      {user.FullName?.charAt(0).toUpperCase() || "U"}
                    </div>
                    <div className="text-white">
                      <h3 className="text-base font-semibold capitalize">{user.FullName}</h3>
                      <p className="text-sm opacity-90">@{user.UserName}</p>
                    </div>
                  </div>

                  {/* Info Section */}
                  <div className="px-6 py-4 text-sm text-gray-700">
                    <p><span className="font-medium">Education:</span> {user.EducationLevel || "N/A"}</p>
                    <p className="mb-2"><span className="font-medium">Subject:</span> {user.Subject || "N/A"}</p>

                    <div className="flex justify-between items-center mb-1">
                      <p><span className="font-medium">Country:</span> {user.Country || "N/A"}</p>
                      <button
                        onClick={() => handleChatClick(user._id)}
                        className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-800 text-white px-4 py-2 rounded-full text-sm font-medium transition cursor-pointer"
                      >
                        <FaComments />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <p>No users found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchUsers;
