import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import axios from "../../../App/axios";
import { Link } from "react-router-dom";
import { IoChevronBackSharp } from "react-icons/io5";

const QandA = () => {
  const location = useLocation();
  const quiz = location.state?.quiz?.slice(0, 20) || [];
  const quizIds = location.state?.quizIds || [];
  const [userAnswers, setUserAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes
  const [startTime] = useState(Date.now());
  const [timeTaken, setTimeTaken] = useState(0);
  const timerRef = useRef();

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          handleSubmit(true); // auto-submit when timer ends
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, []);

  const handleAnswerSelect = (index, option) => {
    if (!submitted) {
      setUserAnswers((prev) => ({ ...prev, [index]: option }));
    }
  };

  const handleSubmit = async (isAuto = false) => {
    if (submitted) return;

    const unanswered = quiz.filter((_, i) => !userAnswers.hasOwnProperty(i));
    if (unanswered.length > 0 && !isAuto) {
      alert("❗ Please answer all questions before submitting.");
      return;
    }

    clearInterval(timerRef.current);
    setSubmitted(true);

    const endTime = Date.now();
    const actualTimeTaken = Math.floor((endTime - startTime) / 1000);
    setTimeTaken(actualTimeTaken);

    const gradedQuestions = quiz.map((q, i) => ({
      question: q.question,
      options: q.options,
      correctAnswer: q.correctAnswer,
      userAnswer: userAnswers[i] || null,
    }));

    try {
      const response = await axios.post(
        "/quiz/quiz/submit",
        {
          quizId: quizIds,
          answers: gradedQuestions,
          timeTaken: actualTimeTaken,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      console.log("✅ Quiz submitted:", response.data);
      alert(`✅ Score: ${response.data.score} / ${response.data.totalQuestions}\nTime Taken: ${response.data.timeTaken}s`);
    } catch (error) {
      console.error("❌ Error submitting quiz:", error);
    }
  };

  const getOptionStyle = (q, i, opt) => {
    const isUserAnswer = userAnswers[i] === opt;
    const isCorrect = q.correctAnswer === opt;

    if (!submitted) {
      return isUserAnswer ? "bg-blue-100" : "bg-gray-100";
    }

    if (isCorrect) return "bg-green-200";
    if (isUserAnswer && !isCorrect) return "bg-red-200";
    return "bg-gray-100";
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Link to="/uploadquiz">
        <IoChevronBackSharp className="text-[#0B192C] bg-white/80 p-2 text-4xl border-1 rounded-full fixed top-4 left-4" />
      </Link>
      <h2 className="text-2xl font-bold mb-4">Quiz</h2>
      <p className="mb-4">
        ⏱ Time Left: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, "0")}
      </p>

      {quiz.map((q, i) => {
        const userAnswer = userAnswers[i];
        const isCorrect = userAnswer === q.correctAnswer;

        return (
          <div key={i} className="mb-6 border-b pb-4">
            <p className="font-semibold mb-2">{i + 1}. {q.question}</p>
            <div className="grid grid-cols-2 gap-2">
              {q.options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswerSelect(i, opt)}
                  disabled={submitted}
                  className={`px-3 py-2 rounded-md text-left ${getOptionStyle(q, i, opt)}`}
                >
                  {opt}
                </button>
              ))}
            </div>

            {submitted && !isCorrect && (
              <p className="mt-2 text-sm text-green-700">
                ✅ Correct Answer: <span className="font-medium">{q.correctAnswer}</span>
              </p>
            )}
          </div>
        );
      })}

      {!submitted ? (
        <button
          onClick={() => handleSubmit(false)}
          className="mt-6 px-6 py-2 bg-teal-700 text-white rounded"
        >
          Submit Quiz
        </button>
      ) : (
        <p className="text-green-600 font-semibold mt-6">✅ Quiz submitted!</p>
      )}
    </div>
  );
};

export default QandA;