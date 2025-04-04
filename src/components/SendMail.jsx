import React from 'react'
import axios from "axios";
import { useState } from "react";

const SendMail = () => {
  const [email, setEmail] = useState("");

  const handleSendCode = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:7000/user/send-reset-code", { Email: email });

      if (response.status === 200) {
        localStorage.setItem("resetEmail", email);
        alert(response.data.message);
        window.location.href = "/emailcode"; 
      }
    } catch (error) {
      alert("Error sending reset code");
    }
  };


  return (
    <>
      <div className="bg-gradient-to-bl from-[#053F5E] to-gray-100 to-teal-100 bg-cover bg-center h-screen w-full">
        <div className="flex justify-center items-center min-h-screen">
          <div className="w-full max-w-lg h-auto p-8 shadow-2xl bg-white/70 rounded-3xl backdrop-blur-md">
            <h2 className="text-3xl font-bold text-center mb-6 text-[#0B192C]">Enter Email</h2>
            <form className="space-y-4" onSubmit={handleSendCode}>

              <div>
                <label className="block text-[#0B192C] font-medium">Email</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  required onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2CA4BF]"
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-[#2CA4BF] text-white font-semibold py-2 rounded-lg hover:bg-[#218a9b] transition duration-300"
              >
                Send Code To Your Email
              </button>
            </form>
            
          </div>
        </div>
      </div>
    </>
  )
}

export default SendMail