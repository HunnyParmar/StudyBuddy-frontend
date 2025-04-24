import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { IoChevronBackSharp } from "react-icons/io5";

const QuizHistory = () => {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axios.get("http://localhost:7000/quiz/quiz/history", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        console.log("Fetched quiz history:", res.data);
        setQuizzes(res.data.quizzes || []);
      } catch (error) {
        console.error("Error fetching quiz history:", error);
      }
    };

    fetchHistory();
  }, []);

  const totalQuizzes = quizzes.length;
  const totalScore = quizzes.reduce((acc, quiz) => acc + quiz.score, 0);

  return (
    <div className="flex h-screen">
      <Link to="/uploadquiz">
              <IoChevronBackSharp className="text-[#0B192C] bg-white/80 p-2 text-4xl border-1 rounded-full fixed top-4 left-4" />
            </Link>
      <div className="flex-1 bg-gray-50 p-6 overflow-y-auto">
        <h1 className="text-3xl font-bold mb-4 ml-8 text-teal-800">Your Quiz History</h1>

        <div className="mb-6 p-4 bg-teal-100 border-l-4 border-teal-500 text-teal-900 shadow-sm rounded">
          <p className="text-lg font-semibold">
            🎯 Total Score: {totalScore} / {totalQuizzes * 20}
          </p>
          <p className="text-sm text-teal-700">Each correct answer earns 1 point.</p>
        </div>

        {quizzes.length === 0 ? (
          <p className="text-gray-600">No quizzes found.</p>
        ) : (
          quizzes.map((quiz, i) => (
            <div key={quiz.quizId} className="mb-8 p-6 border rounded-lg bg-white shadow-md">
              <p className="text-xl font-semibold mb-2">Quiz {i + 1}</p>
              <p className="text-sm text-gray-600 mb-4">
                Score: <strong>{quiz.score} / {quiz.questions?.length || 20}</strong> | Time taken:{" "}
                {Math.floor(quiz.timeTaken / 60)} min {quiz.timeTaken % 60} sec
              </p>

              {quiz.questions?.length ? (
                quiz.questions.map((q, qIndex) => (
                  <div key={qIndex} className="mb-4">
                    <p className="font-medium mb-1">{qIndex + 1}. {q.question}</p>

                    {q.options.map((opt, idx) => {
                      const isCorrect = opt === q.correctAnswer;
                      const isUserAnswer = opt === q.userAnswer;

                      return (
                        <p
                          key={idx}
                          className={`pl-6 py-1 rounded ${
                            isCorrect
                              ? "bg-green-100 text-green-800 font-semibold"
                              : isUserAnswer
                              ? "bg-red-100 text-red-800"
                              : "text-gray-800"
                          }`}
                        >
                          {String.fromCharCode(65 + idx)}. {opt}
                        </p>
                      );
                    })}

                    <p className="text-sm text-gray-700 mt-1">
                      Your answer: <strong>{q.userAnswer || "—"}</strong> | Correct: <strong>{q.correctAnswer}</strong> {q.isCorrect ? "✅" : "❌"}
                    </p>

                    <hr className="mt-3" />
                  </div>
                ))
              ) : (
                <p className="text-gray-500">Detailed questions not available for this quiz.</p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default QuizHistory;