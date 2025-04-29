import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../../App/axios";

const QuizSubmission = ({ quizData }) => {
  const navigate = useNavigate();

  const handleSubmitQuiz = async () => {
    try {
      const questionIds = quizData.map(q => q._id);
      const userAnswers = quizData.map(q => q.selectedAnswer);
  
      const response = await axios.post("/quiz/quiz/submit", {
        userId: "user-id-here",
        questionIds,
        userAnswers,
      });
  
      console.log("Quiz submitted successfully:", response.data);
      navigate("/quiz-history");
    } catch (error) {
      console.error("Error submitting quiz:", error);
    }
  };
  

  return (
    <div className="quiz-submission">
      <button onClick={handleSubmitQuiz}>Submit Quiz</button>
    </div>
  );
};

export default QuizSubmission;