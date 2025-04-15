import React, { useState } from "react";
import axios from "../../../App/axios"; // ✅ Use custom Axios instance
import { useNavigate } from "react-router-dom";
import Quiz from "./Quiz";
import { FaFileWord, FaFilePdf, FaFilePowerpoint } from "react-icons/fa";

const UploadQuiz = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleGenerate = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("sourceType", "file");
    formData.append("topic", "General");

    setLoading(true);
    try {
      const response = await axios.post("/quiz/quiz", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const quizData = response.data.quiz;

      if (quizData.length > 0) {
        navigate("/qanda", { state: { quiz: quizData } });
      }

    } catch (error) {
      console.error("Upload error:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Quiz>
      <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-4xl mx-auto text-center border-2 border-dashed border-gray-100">
        <div className="flex justify-center mb-4 gap-6 text-3xl text-gray-500">
          <FaFileWord className="text-blue-500" />
          <FaFilePdf className="text-pink-500" />
          <FaFilePowerpoint className="text-red-400" />
        </div>

        <p className="text-lg font-semibold text-gray-700 mb-2">
          Drag and drop notes, readings, lecture slides, etc.
        </p>
        <p className="text-sm text-gray-500 mb-4">
          Supported file types are <strong>.docx</strong>, <strong>.pdf</strong>, <strong>.pptx</strong>
        </p>

        <label className="inline-block cursor-pointer bg-gray-500 hover:bg-gray-700 text-white px-6 py-2 rounded-md font-medium">
          Browse files
          <input
            type="file"
            accept=".pdf,.doc,.docx,.ppt,.pptx"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>
      </div>

      <div className="mt-4 flex justify-end mr-5">
        <button
          className="bg-teal-700 hover:bg-teal-900 text-white px-10 py-2 rounded-md font-medium cursor-pointer"
          onClick={handleGenerate}
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate"}
        </button>
      </div>
    </Quiz>
  );
};

export default UploadQuiz;
