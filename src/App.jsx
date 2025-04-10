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

const PrivateRoute = () => {
    const token = localStorage.getItem("token");
    return token ? <Outlet /> : <Navigate to="/signup" />;
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
          <Route path="/todo" element={<ToDoList/>} />
          {/* FlashCard */}
          <Route path="/flashcard" element={<FlashCard/>} />
          <Route path="/setflashcard" element={<SetFlashCard/>} />
          <Route path="/generatecard" element={<GenerateFlashCard/>} />
          {/* searchuser */}
          <Route path="/search-users" element={<SearchUsers />} />
          <Route path="/chat/:userId" element={<HomePage />} />
          {/* Quiz */}
          <Route path="/quiz" element={<Quiz/>} />
          <Route path="/uploadquiz" element={<UploadQuiz/>} />
          <Route path="/pastetextquiz" element={<PasteTextQuiz/>} />
          <Route path="/qanda" element={<QandA/>} />
          {/* Live Chat */}
          <Route path="/homepage" element={<HomePage/>} />
          
        </Route>     
        </Routes>
    </Router>
  );
}

export default App;