// import React from "react";
// import Quiz from "./Quiz";

// const PasteTextQuiz = () => {
//   return (
//     <Quiz>
//       <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-4xl mx-auto flex flex-col justify-between min-h-[60px] border border-gray-200">
        
//         <textarea
//           placeholder="Paste text here or drop a file"
//           className="w-full h-40 border border-gray-300 rounded-md p-4 text-gray-700 resize-none focus:outline-none focus:ring-2 focus:ring-teal-500"
//         />
        
//       </div>
//       <div className="mt-4 flex justify-end mr-5">
//           <button className="bg-teal-700 hover:bg-teal-900 text-white px-10 py-2 rounded-md font-medium cursor-pointer">
//             Generate
//           </button>
//         </div>
//     </Quiz>
//   );
// };

// export default PasteTextQuiz;
import React, { useState } from "react";
import axios from "../../../App/axios";
import { useNavigate } from "react-router-dom";
import Quiz from "./Quiz";

const PasteTextQuiz = () => {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleGenerateQuiz = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "/quiz/quiz",
        {
          sourceType: "text",
          topic: "General",
          text,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      navigate("/qanda", { state: { quiz: response.data.quiz } });
    } catch (error) {
      console.error("Error generating quiz:", error);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <Quiz>
      <h2 className="text-xl font-bold mb-4">Paste Your Notes</h2>
      <textarea
          placeholder="Paste text here"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-211 h-40 border border-gray-700 rounded-md p-4 text-gray-700 resize-none focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
      <div className="mt-4 flex justify-end mr-5">
        <button
          onClick={handleGenerateQuiz}
          disabled={loading}
          className="bg-teal-700 hover:bg-teal-900 text-white px-10 py-2 rounded-md font-medium cursor-pointer"
        >
          {loading ? "Generating..." : "Generate"}
        </button>
      </div>
    </Quiz>
  );
};

export default PasteTextQuiz;