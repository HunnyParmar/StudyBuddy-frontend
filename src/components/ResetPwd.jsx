import React from 'react'
import axios from "axios";
import { useState } from 'react';

const ResetPwd = () => {

  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:7000/user/reset-password", { Email: email, newPassword });
      alert(response.data.message);
      window.location.href = "/login";
    } catch (error) {
      alert("Error resetting password");
    }
  };

  return (
    <>
      <div className="bg-gradient-to-bl from-[#053F5E] to-gray-100 to-teal-100 bg-cover bg-center h-screen w-full">
        <div className="flex justify-center items-center min-h-screen">
          <div className="w-full max-w-lg h-auto p-8 shadow-2xl bg-white/70 rounded-3xl backdrop-blur-md">
            <h2 className="text-3xl font-bold text-center mb-6 text-[#0B192C]">Reset Password</h2>
            <form className="space-y-4" onSubmit={handleResetPassword}>
              
            <div>
                <label className="block text-[#0B192C] font-medium">Enter Email</label>
                <input
                  type="String"
                  placeholder="Enter your code"
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2CA4BF]"
                  required
                />
              </div>
              <div>
                <label className="block text-[#0B192C] font-medium">Enter new password</label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2CA4BF]"
                  required
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-[#2CA4BF] text-white font-semibold py-2 rounded-lg hover:bg-[#218a9b] transition duration-300"
              >
                Change Password
              </button>
            </form>
            
          </div>
        </div>
      </div>
    </>
  )
}

export default ResetPwd