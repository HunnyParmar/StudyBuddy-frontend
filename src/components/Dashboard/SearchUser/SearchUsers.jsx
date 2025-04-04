import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaComments } from "react-icons/fa"; 
import { useNavigate } from "react-router-dom"; 
const SearchUsers = () => {
    const [users, setUsers] = useState([]);
    const [searchParams, setSearchParams] = useState({
        EducationLevel: "",
        Subject: "",
        Country: ""
    });

    const navigate = useNavigate();

    
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const hasFilters = searchParams.EducationLevel || searchParams.Subject || searchParams.Country;
                const response = hasFilters
                    ? await axios.get("http://localhost:7000/user/search-users", { params: searchParams })
                    : await axios.get("http://localhost:7000/user/search-users");
                
                console.log("Fetched users:", response.data);
                setUsers(response.data);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchUsers();
    }, [searchParams]); 

    const handleChatClick = (userId) => {
        localStorage.setItem("chatUserId", userId); 
        navigate(`/chat/${userId}`);
    };
    
    return (
        <div className="container mx-auto p-5">
            <h2 className="text-2xl font-bold mb-4">Find Study Buddy</h2>

            {/* Search Filters */}
            <div className="flex space-x-3 mb-5">
                <input
                    type="text"
                    placeholder="Education Level"
                    value={searchParams.EducationLevel}
                    onChange={(e) => setSearchParams({ ...searchParams, EducationLevel: e.target.value })}
                    className="border p-2 w-1/3 rounded"
                />
                <input
                    type="text"
                    placeholder="Subject"
                    value={searchParams.Subject}
                    onChange={(e) => setSearchParams({ ...searchParams, Subject: e.target.value })}
                    className="border p-2 w-1/3 rounded"
                />
                <input
                    type="text"
                    placeholder="Country"
                    value={searchParams.Country}
                    onChange={(e) => setSearchParams({ ...searchParams, Country: e.target.value })}
                    className="border p-2 w-1/3 rounded"
                />
            </div>

            {/* Display Users */}
            <div className="grid grid-cols-3 gap-4">
                {users.length > 0 ? (
                    users.map((user) => (
                        <div key={user._id} className="border p-4 rounded shadow">
                            <div>
                            <h3 className="text-xl font-semibold">{user.FullName}</h3>
                            <p><strong>Username:</strong> {user.UserName}</p>
                            <p><strong>Email:</strong> {user.Email}</p>
                            <p><strong>Education Level:</strong> {user.EducationLevel}</p>
                            <p><strong>Subject:</strong> {user.Subject}</p>
                            <p><strong>Country:</strong> {user.Country}</p>
                            </div>
                            <button
                                onClick={() => handleChatClick(user._id, user)}
                                className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600"
                                title="Start Chat"
                            >
                                <FaComments size={24} />
                            </button>

                        </div>
                    ))
                ) : (
                    <p>No users found</p>
                )}
            </div>
        </div>
    );
};

export default SearchUsers;

