import { Link } from 'react-router-dom';
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoChevronBackSharp } from "react-icons/io5";
import { useAuthStore } from "../Store/useAuthStore";
import axios from "../App/axios"; // ✅ Using axios instance

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // ✅ New loading state
  const navigate = useNavigate();
  const { connectSocket } = useAuthStore();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true); // ✅ Set loading to true

    try {
      const response = await axios.post("/user/login", {
        Email: email,
        Password: password,
      });

      const data = response.data;

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      connectSocket();
      navigate("/progress");

    } catch (err) {
      const message = err.response?.data?.message || "Something went wrong";
      setError(message);
    } finally {
      setLoading(false); // ✅ Always stop loading
    }
  };

  return (
    <div className="bg-gradient-to-bl from-[#053F5E] to-gray-100 to-teal-100 bg-cover bg-center h-screen w-full">
      <Link to="/">
        <IoChevronBackSharp className='text-[#0B192C] bg-white/80 p-1 text-4xl border-1 rounded-full fixed top-4 left-4'/>
      </Link>

      <div className="flex justify-center items-center min-h-screen">
        <div className="w-full max-w-lg h-auto p-8 shadow-2xl bg-white/70 rounded-3xl backdrop-blur-md">
          <h2 className="text-3xl font-bold text-center mb-6 text-[#0B192C]">Unlock Study Mode!</h2>
          
          <form className="space-y-4" onSubmit={handleLogin}>
            <div>
              <label className="block text-[#0B192C] font-medium">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2CA4BF]"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");
                }}
                required
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-[#0B192C] font-medium">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
                required
                disabled={loading}
              />
              {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
              <div>
                <Link to="/smail" className="text-[#2CA4BF] font-medium text-sm hover:underline ml-2">Forgot Password?</Link>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full text-white font-semibold py-2 rounded-lg transition duration-300 ${
                loading ? "bg-gray-400 cursor-not-allowed" : "bg-[#2CA4BF] hover:bg-[#218a9b]"
              }`}
            >
              {loading ? "Logging in..." : "Log In"}
            </button>
          </form>

          <p className="text-center mt-4 text-[#0B192C]">
            Not registered yet?{" "}
            <Link to="/signup" className="text-[#2CA4BF] font-semibold hover:underline">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
