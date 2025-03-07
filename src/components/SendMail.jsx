import React from 'react'

const SendMail = () => {
  return (
    <>
      <div className="bg-gradient-to-bl from-[#053F5E] to-gray-100 to-teal-100 bg-cover bg-center h-screen w-full">
        <div className="flex justify-center items-center min-h-screen">
          <div className="w-full max-w-lg h-auto p-8 shadow-2xl bg-white/70 rounded-3xl backdrop-blur-md">
            <h2 className="text-3xl font-bold text-center mb-6 text-[#0B192C]">Forgot Password?</h2>
            <form className="space-y-4">

              <div>
                <label className="block text-[#0B192C] font-medium">Enter Email</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2CA4BF]"
                  required
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-[#2CA4BF] text-white font-semibold py-2 rounded-lg hover:bg-[#218a9b] transition duration-300"
              >
                Send Link
              </button>
            </form>
            
          </div>
        </div>
      </div>
    </>
  )
}

export default SendMail
