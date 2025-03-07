import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FrontPage from "./components/FrontPage";
import LogIn from "./components/LogIn";
import SignUp from "./components/SignUp";
import Dashboard from "./components/Dashboard";
import { Navigate, Outlet } from "react-router-dom";
import ForgetPwd from "./components/ForgetPwd";
import SendMail from "./components/SendMail";

const PrivateRoute = () => {
    const token = localStorage.getItem("token");
    return token ? <Outlet /> : <Navigate to="/signup" />;
};


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FrontPage />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/fpwd" element={<ForgetPwd/>} />
        <Route path="/smail" element={<SendMail/>} />
        
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>     
         
        </Routes>
    </Router>
  );
}

export default App;