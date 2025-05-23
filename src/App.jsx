import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FrontPage from "./components/FrontPage";
import LogIn from "./components/LogIn";
import SignUp from "./components/SignUp";
import Dashboard from "./components/Dashboard/Dashboard";
import { Navigate, Outlet } from "react-router-dom";
import SendMail from "./components/SendMail";
import ResetPwd from "./components/ResetPwd";
import EmailCode from "./components/EmailCode";
import ToDoList from "./components/Dashboard/ToDoList/ToDoList";
import FlashCard from "./components/Dashboard/FlashCard/FlashCard";
import SetFlashCard from "./components/Dashboard/FlashCard/SetFlashCard";
import GenerateFlashCard from "./components/Dashboard/FlashCard/GenerateFlashCard";
import Quiz from "./components/Dashboard/Quiz/Quiz";
import SearchUsers from "./components/Dashboard/SearchUser/SearchUsers";
import HomePage from "./components/Dashboard/LiveChat/HomePage";
import { useAuthStore } from "./Store/useAuthStore";
import { useEffect } from "react";
import UploadQuiz from "./components/Dashboard/Quiz/UploadQuiz";
import PasteTextQuiz from "./components/Dashboard/Quiz/PasteTextQuiz";
import QandA from "./components/Dashboard/Quiz/QandA";
import FolderView from './components/Dashboard/FlashCard/FolderView ';
import FlashcardsByTopic from './components/Dashboard/FlashCard/FlashcardsByTopic';
import Profile from "./components/Dashboard/Profile";
import QuizHistory from "./components/Dashboard/Quiz/QuizHistory";
import { LeaderBoard } from "./components/Dashboard/LeaderBoard/LeaderBoard";
import ProgressTracker from "./components/Dashboard/Progress/ProgressTracker";
import GameDashboard from "./components/Dashboard/GameDashboard/GameDashboard";
import MemoryMatch from "./components/Dashboard/GameDashboard/MemoryMatch/MemoryMatch";
import ReactionSpeed from "./components/Dashboard/GameDashboard/ReactionSpeed";
import TypingSpeedTest from "./components/Dashboard/GameDashboard/TypingSpeedTest";
import AvoidTheBombs from "./components/Dashboard/GameDashboard/AvoidTheBombs";
import SequenceMemoryGame from "./components/Dashboard/GameDashboard/SequenceMemoryGame";
import WordGridHunt from "./components/Dashboard/GameDashboard/WordGridHunt";
import Sudoku from "./components/Dashboard/GameDashboard/Sudoku";

const PrivateRoute = () => {
    const token = localStorage.getItem("token");
    return token ? <Outlet /> : <Navigate to="/login" />;
};

function App() {
  const {onlineUsers,connectSocket }=useAuthStore();

  useEffect(() => {
    connectSocket(); // ✅ Connect socket on app load
  }, []);

  console.log(onlineUsers);
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<FrontPage />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/resetpwd" element={<ResetPwd/>} />
        <Route path="/smail" element={<SendMail/>} />
        <Route path="/emailcode" element={<EmailCode/>}/>
        
        <Route element={<PrivateRoute />}>
          <Route exact path="/dashboard" element={<Dashboard />} />

          <Route path="/profile" element={<Profile/>} />
          <Route path="/todo" element={<ToDoList/>} />
          <Route path="/leaderboard" element={<LeaderBoard/>} />
          {/* FlashCard */}
          <Route path="/flashcard" element={<FlashCard/>} />
          <Route path="/setflashcard" element={<SetFlashCard/>} />
          <Route path="/generatecard" element={<GenerateFlashCard/>} />
          <Route path="/my-flashcards" element={<FolderView type="user" />} />
        <Route path="/all-flashcards" element={<FolderView type="all" />} />

        {/* ✅ For topic view */}
        <Route path="/my/topics/:topic" element={<FlashcardsByTopic type="user" />} />
        <Route path="/topics/:topic" element={<FlashcardsByTopic type="all" />} />
          {/* searchuser */}
          <Route path="/search-users" element={<SearchUsers />} />
          <Route path="/chat/:userId" element={<HomePage />} />
          {/* Quiz */}
          <Route path="/quiz" element={<Quiz/>} />
          <Route path="/uploadquiz" element={<UploadQuiz/>} />
          <Route path="/pastetextquiz" element={<PasteTextQuiz/>} />
          <Route path="/qanda" element={<QandA/>} />
          <Route path="/quizhistory" element={<QuizHistory/>} />
          
          <Route path="/progress" element={<ProgressTracker/>} />
          {/* Live Chat */}
          <Route path="/homepage" element={<HomePage/>} />
          {/* Games */}
          <Route path="/games" element={<GameDashboard/>}/>
          <Route path="/games/memory-match" element={<MemoryMatch />} />
          <Route path="/games/reaction-speed" element={<ReactionSpeed />} />
          <Route path="/games/typing-speed" element={<TypingSpeedTest />} />
          <Route path="/games/avoid-bombs" element={<AvoidTheBombs />} />
          <Route path="/games/sequence-memory" element={<SequenceMemoryGame />} />
          <Route path="/games/Word-Grid-Hunt" element={<WordGridHunt/>}/>
          <Route path="/games/Sudoku" element={<Sudoku/>}/>
          
        </Route>     
        </Routes>
    </Router>
  );
}

export default App;