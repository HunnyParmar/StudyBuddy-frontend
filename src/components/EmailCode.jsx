import React, { useState, useEffect } from "react";
import axios from "../App/axios"; // ✅ using baseURL from custom axios
import { IoChevronBackSharp } from "react-icons/io5";
import { Link } from 'react-router-dom';
const EmailCode = () => {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");

  useEffect(() => {
    const storedEmail = localStorage.getItem("resetEmail");
    if (storedEmail) {
      setEmail(storedEmail); // ✅ Get email from localStorage
    }
  }, []);

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/user/verify-reset-code", {
        Email: email,
        resetCode: code,
      });

      if (response.status === 200) {
        alert(response.data.message);
        window.location.href = "/resetpwd"; // Navigate to the next page
      }
    } catch (error) {
      alert("Invalid or expired code");
    }
  };

  return (
    <>
      <div className="bg-gradient-to-bl from-[#053F5E] to-gray-100 to-teal-100 bg-cover bg-center h-screen w-full">
      <Link to="/login">
          <IoChevronBackSharp className='text-[#0B192C] bg-white/80 p-1 text-4xl border-1 rounded-full fixed top-4 left-4'/>
        </Link>
        <div className="flex justify-center items-center min-h-screen">
          <div className="w-full max-w-lg h-auto p-8 shadow-2xl bg-white/70 rounded-3xl backdrop-blur-md">
            <h2 className="text-3xl font-bold text-center mb-6 text-[#0B192C]">Enter Code</h2>
            <form className="space-y-4" onSubmit={handleVerifyCode}>
              <div>
                <label className="block text-[#0B192C] font-medium">Enter Code</label>
                <input
                  type="text"
                  placeholder="Enter your code"
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2CA4BF]"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#2CA4BF] text-white font-semibold py-2 rounded-lg hover:bg-[#218a9b] transition duration-300"
              >
                Verify Code
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmailCode;
