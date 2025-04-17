import React, { useEffect, useState } from "react";
import axios from "axios";

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
      <div className="flex-1 bg-gray-50 p-6 overflow-y-auto">
        <h1 className="text-3xl font-bold mb-4 text-teal-800">Your Quiz History</h1>

        <div className="mb-6 p-4 bg-teal-100 border-l-4 border-teal-500 text-teal-900 shadow-sm rounded">
          <p className="text-lg font-semibold">
            🎯 Total Score: {totalScore} / {totalQuizzes}
          </p>
          <p className="text-sm text-teal-700">Each correct answer earns 1 point.</p>
        </div>

        {quizzes.length === 0 ? (
          <p className="text-gray-600">No quizzes found.</p>
        ) : (
          quizzes.map((quiz, index) => (
            <div key={quiz.quizId} className="mb-6 p-5 border rounded-lg bg-white shadow-sm">
              <p className="font-semibold mb-3">
                Quiz {index + 1}: {quiz.question}
              </p>

              {quiz.options?.map((opt, i) => {
                const isCorrect = opt === quiz.correctAnswer;
                const isUserWrong = opt === quiz.userAnswer && !isCorrect;

                return (
                  <p
                    key={i}
                    className={`pl-6 py-1 rounded ${isCorrect ? "bg-green-100 text-green-800 font-semibold" : isUserWrong ? "bg-red-100 text-red-800" : "text-gray-800"}`}
                  >
                    {String.fromCharCode(65 + i)}. {opt}
                  </p>
                );
              })}

              <p className="text-sm mt-2 text-gray-700">
                Your answer: <strong>{quiz.userAnswer || "—"}</strong> 
                {quiz.isCorrect ? "true" : "flase"} | Correct: <strong>{quiz.correctAnswer}</strong>
              </p>

              <div className="mt-4 text-teal-800">
                <p className="font-semibold">Score: {quiz.score} / 1</p>
                <p className="text-sm">Time taken: {Math.floor(quiz.timeTaken / 60)} minutes {quiz.timeTaken % 60} seconds</p>
              </div>

              <hr className="mt-4" />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default QuizHistory;