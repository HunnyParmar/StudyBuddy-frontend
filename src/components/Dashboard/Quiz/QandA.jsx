import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const QandA = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const quiz = location.state?.quiz?.slice(0, 20) || [];

  const [userAnswers, setUserAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 minutes
  const [showIntro, setShowIntro] = useState(true);

  const timerRef = useRef(null);

  const formatTime = (seconds) => {
    const mins = String(Math.floor(seconds / 60)).padStart(2, '0');
    const secs = String(seconds % 60).padStart(2, '0');
    return `${mins}:${secs}`;
  };

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

  const handleAnswerSelect = (questionIndex, selectedOption) => {
    if (!submitted) {
      setUserAnswers({ ...userAnswers, [questionIndex]: selectedOption });
    }
  };

  const handleSubmit = () => {
    if (!submitted) {
      clearInterval(timerRef.current); // ⛔ Stop timer
      setSubmitted(true);
    }
  };

  const calculateScore = () => {
    return quiz.reduce((score, q, index) => {
      return userAnswers[index] === q.correctAnswer ? score + 1 : score;
    }, 0);
  };

  const calculateTimeTaken = () => {
    const elapsedSeconds = Math.floor((Date.now() - startTime) / 1000);
    return formatTime(elapsedSeconds);
  };

  const optionLabels = ['A', 'B', 'C', 'D'];

  const handleStart = () => {
    setShowIntro(false);
    setStartTime(Date.now());
  };

  const handleNewTest = () => {
    navigate("/quiz"); // Or navigate to your upload/text entry page
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-md rounded-xl mt-6">
      {/* 🚀 Intro Popup */}
      {showIntro && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
          <div className="bg-white p-8 rounded-xl shadow-lg text-center max-w-md">
            <h2 className="text-2xl font-bold mb-4 text-teal-700">Quiz Instructions</h2>
            <p className="text-gray-700 mb-2">📝 Total Questions: <strong>20</strong></p>
            <p className="text-gray-700 mb-4">⏱ Time Limit: <strong>30 minutes</strong></p>
            <button
              onClick={handleStart}
              className="bg-teal-700 hover:bg-teal-900 text-white px-6 py-2 rounded-md font-semibold"
            >
              Start Quiz
            </button>
          </div>
        </div>
      )}

      {!showIntro && (
        <>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold">Quiz</h2>
            {!submitted && (
              <div className="text-lg font-semibold text-teal-700">
                Time Left: {formatTime(timeLeft)}
              </div>
            )}
          </div>

          {quiz.map((q, index) => (
            <div key={index} className="mb-8">
              <p className="font-semibold text-lg mb-3">
                {index + 1}. {q.question}
              </p>
              <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
                {q.options.map((opt, i) => {
                  const isSelected = userAnswers[index] === opt;
                  const isCorrect = q.correctAnswer === opt;
                  const isWrong = submitted && isSelected && !isCorrect;

                  return (
                    <div
                      key={i}
                      onClick={() => handleAnswerSelect(index, opt)}
                      className={`px-4 py-2 border rounded-md cursor-pointer transition duration-200 flex items-center space-x-3
                      ${submitted
                        ? isCorrect
                          ? 'bg-green-100 border-green-500 text-green-700'
                          : isWrong
                          ? 'bg-red-100 border-red-500 text-red-700'
                          : 'bg-gray-50'
                        : isSelected
                        ? 'bg-blue-100 border-blue-500 text-blue-700'
                        : 'bg-gray-100 hover:bg-gray-200 border-gray-300'
                      }`}
                    >
                      <span className="font-bold">{optionLabels[i]}.</span>
                      <span>{opt}</span>
                    </div>
                  );
                })}
              </div>

              {submitted && (
                <p className="mt-2 text-sm text-gray-600">
                  <strong>Correct Answer:</strong> {q.correctAnswer}
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
            <div className="text-center mt-8">
              <p className="text-xl font-semibold text-teal-700">
                ✅ Score: {calculateScore()} / {quiz.length}
              </p>
              <p className="text-md text-gray-600 mt-2">
                ⏱ Time Taken: {calculateTimeTaken()}
              </p>
              <button
                onClick={handleNewTest}
                className="mt-6 bg-gray-700 hover:bg-gray-900 text-white px-6 py-2 rounded-md font-medium"
              >
                Start New Test
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default QandA;
