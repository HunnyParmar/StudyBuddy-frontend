import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const QandA = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const quiz = location.state?.quiz?.slice(0, 20) || [];
  const topic = location.state?.topic || "Untitled";

  const [userAnswers, setUserAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [startTime, setStartTime] = useState(null);
  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes

  const timerRef = useRef(null);

  useEffect(() => {
    if (!showIntro && startTime) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            handleSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timerRef.current);
    }
  }, [showIntro, startTime]);

  const handleAnswerSelect = (index, option) => {
    if (!submitted) {
      setUserAnswers((prev) => ({ ...prev, [index]: option }));
    }
  };

  const calculateScore = () => {
    return quiz.reduce((score, q, i) => {
      return userAnswers[i] === q.correctAnswer ? score + 1 : score;
    }, 0);
  };

  const calculateTimeTaken = () => {
    const elapsed = Math.floor((Date.now() - startTime) / 1000);
    const mins = String(Math.floor(elapsed / 60)).padStart(2, "0");
    const secs = String(elapsed % 60).padStart(2, "0");
    return `${mins}:${secs}`;
  };

  const handleSubmit = async () => {
    if (!submitted) {
      clearInterval(timerRef.current);
      setSubmitted(true);

      const gradedQuestions = quiz.map((q, i) => ({
        question: q.question,
        options: q.options,
        userAnswer: userAnswers[i] || null,
        correctAnswer: q.correctAnswer,
        isCorrect: userAnswers[i] === q.correctAnswer,
      }));

      try {
        await axios.post(
          "http://localhost:7000/quiz/quiz/submit",
          {
            quizId: location.state?.quizIds || [],
            answers: gradedQuestions,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        console.log("Quiz saved successfully");
      } catch (error) {
        console.error("Error saving quiz:", error);
      }
    }
  };

  const handleStart = () => {
    setShowIntro(false);
    setStartTime(Date.now());
  };

  const handleNewTest = () => navigate("/quiz");
  const handleViewPastTest = () => navigate("/quiz/history");

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-md rounded-xl mt-6">
      {showIntro ? (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
          <div className="bg-white p-8 rounded-xl text-center shadow-lg">
            <h2 className="text-2xl font-bold text-teal-700 mb-4">Quiz Instructions</h2>
            <p>📝 Total Questions: <strong>20</strong></p>
            <p>⏱ Time Limit: <strong>30 minutes</strong></p>
            <button
              onClick={handleStart}
              className="mt-4 bg-teal-700 hover:bg-teal-900 text-white px-6 py-2 rounded-md"
            >
              Start Quiz
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex justify-between mb-6">
            <h2 className="text-3xl font-bold">Quiz: {topic}</h2>
            {!submitted && (
              <span className="text-lg font-semibold text-teal-700">
                Time Left: {String(Math.floor(timeLeft / 60)).padStart(2, "0")}:
                {String(timeLeft % 60).padStart(2, "0")}
              </span>
            )}
          </div>

          {quiz.map((q, index) => (
            <div key={index} className="mb-6">
              <p className="text-lg font-semibold mb-2">{index + 1}. {q.question}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {q.options.map((opt, i) => {
                  const isSelected = userAnswers[index] === opt;
                  const isCorrect = q.correctAnswer === opt;
                  const isWrong = submitted && isSelected && !isCorrect;

                  return (
                    <div
                      key={i}
                      onClick={() => handleAnswerSelect(index, opt)}
                      className={`p-3 border rounded-md cursor-pointer transition
                        ${
                          submitted
                            ? isCorrect
                              ? "bg-green-100 border-green-500"
                              : isWrong
                              ? "bg-red-100 border-red-500"
                              : "bg-gray-50"
                            : isSelected
                            ? "bg-blue-100 border-blue-500"
                            : "bg-gray-100 hover:bg-gray-200 border-gray-300"
                        }`}
                    >
                      <span className="font-semibold mr-2">{String.fromCharCode(65 + i)}.</span>
                      {opt}
                    </div>
                  );
                })}
              </div>
              {submitted && (
                <p className="mt-2 text-sm text-gray-600">
                  ✅ Correct: <strong>{q.correctAnswer}</strong>
                </p>
              )}
            </div>
          ))}

          {!submitted ? (
            <div className="flex justify-end">
              <button
                onClick={handleSubmit}
                className="bg-teal-700 hover:bg-teal-900 text-white px-8 py-2 rounded-md font-medium"
              >
                Submit Quiz
              </button>
            </div>
          ) : (
            <div className="text-center mt-6">
              <p className="text-xl font-semibold text-teal-700">
                ✅ Score: {calculateScore()} / {quiz.length}
              </p>
              <p className="text-sm text-gray-500">⏱ Time Taken: {calculateTimeTaken()}</p>
              <button
                onClick={handleNewTest}
                className="mt-6 bg-gray-700 hover:bg-gray-900 text-white px-6 py-2 rounded-md"
              >
                Start New Test
              </button>
              <button
                onClick={handleViewPastTest}
                className="mt-6 bg-gray-700 hover:bg-gray-900 text-white px-6 py-2 rounded-md ml-4"
              >
                View Past Test
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default QandA;