// src/pages/Flashcards/FolderView.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "../../../App/axios";
import { IoChevronBackSharp } from "react-icons/io5";
import { motion } from "framer-motion";

const FolderView = ({ type = "all" }) => {
  const [folders, setFolders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFolders = async () => {
      try {
        setLoading(true);
        const endpoint = type === "user" ? "/user/flashcards" : "/user/flashcards/all";
        const token = localStorage.getItem("token");
        const headers = token ? { Authorization: `Bearer ${token}` } : {};

        const res = await axios.get(endpoint, { headers });
        const grouped = res.data.grouped || {};

        const folderData = Object.keys(grouped).map(docId => ({
          id: docId,
          topic: grouped[docId][0]?.topic || "Untitled",
          flashcardCount: grouped[docId].length,
        }));

        setFolders(folderData);
      } catch (err) {
        console.error("Error fetching folders:", err);
        setFolders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFolders();
  }, [type]);

  const handleFolderClick = (docId) => {
    navigate(type === "user" ? `/my/topics/${docId}` : `/topics/${docId}`);
  };

  const filteredFolders = folders.filter((folder) =>
    folder.topic.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-fixed bg-gradient-to-br from-teal-50 via-white to-teal-100 p-6">
      <Link to="/flashcard">
        <IoChevronBackSharp className="text-[#0B192C] bg-white/80 p-2 text-4xl border-1 rounded-full fixed top-4 left-4" />
      </Link>

      <h1 className="text-3xl mt-4 font-bold mb-6 text-teal-600 text-center">
        {type === "user" ? "My Flashcard Folders" : "All Flashcard Folders"}
      </h1>

      <div className="flex justify-center mb-8">
        <input
          type="text"
          placeholder="Search topic..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-lg px-4 py-2 border border-teal-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
        />
      </div>

      {loading ? (
        <p className="text-gray-500 text-center">Loading folders...</p>
      ) : filteredFolders.length === 0 ? (
        <p className="text-gray-500 text-center">No folders found.</p>
      ) : (
        <div className="flex justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6 w-full max-w-4xl">
            {filteredFolders.map((folder, index) => (
              <motion.div
                key={folder.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  opacity: { delay: index * 0.1, duration: 0.4 },
                  y: { delay: index * 0.1, duration: 0.4 },
                  ease: "easeOut",
                }}
                whileHover={{
                  scale: 1.03,
                  transition: { duration: 0.15 },
                }}
                whileTap={{
                  scale: 0.97,
                  transition: { duration: 0.1 },
                }}
                viewport={{ once: true, amount: 0.2 }}
                className="cursor-pointer bg-white border border-teal-100 p-6 rounded-2xl shadow-md hover:shadow-lg hover:shadow-teal-400 transition duration-300"
                onClick={() => handleFolderClick(folder.id)}
              >
                <h2 className="text-xl font-semibold text-teal-700 mb-2">
                  {folder.topic}
                </h2>
                <p className="text-sm text-gray-600">
                  {folder.flashcardCount} flashcard
                  {folder.flashcardCount !== 1 && "s"}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FolderView;
