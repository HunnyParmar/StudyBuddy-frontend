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


const PrivateRoute = () => {
    const token = localStorage.getItem("token");
    return token ? <Outlet /> : <Navigate to="/signup" />;
};


function App() {
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
        </Route>     
        </Routes>
    </Router>
  );
}

export default App;