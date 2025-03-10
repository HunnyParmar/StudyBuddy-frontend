import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { IoChevronBackSharp } from "react-icons/io5";
import { Country, State } from "country-state-city";


const SignUp = () => {
    const navigate = useNavigate(); // Initialize navigation
    const [step, setStep] = useState(1);
    const [completedSteps, setCompletedSteps] = useState(0);
    const [formData, setFormData] = useState({
      ProfilePicture: null,
      UserName: "",
      Email: "",
      Password: "",
      FullName: "",
      Country: "",
      State: "",
      EducationLevel: "",
      Subject: "",
      StudyGoals: "",
    });
    

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, ProfilePicture: e.target.files[0] });
  };

  const validateStep = () => {
    const requiredFields = {
      1: ["ProfilePicture", "UserName", "Email", "Password"],
      2: ["FullName", "Country", "State"],
      3: ["EducationLevel", "Subject", "StudyGoals"],
    };

    return requiredFields[step].every((field) => formData[field] && formData[field] !== "");
  };

  const nextStep = () => {
    if (validateStep()) {
      setCompletedSteps(step);
      setStep(step + 1);
    } else {
      alert("Please fill all fields before proceeding.");
    }
  };

  const prevStep = () => setStep(step - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("ProfilePicture", formData.ProfilePicture);
    formDataToSend.append("FullName", formData.FullName);
    formDataToSend.append("UserName", formData.UserName);
    formDataToSend.append("Email", formData.Email);
    formDataToSend.append("Password", formData.Password);
    formDataToSend.append("ConfirmPassword", formData.Password); 
    formDataToSend.append("Country", formData.Country);
    formDataToSend.append("State", formData.State);
    formDataToSend.append("EducationLevel", formData.EducationLevel);
    formDataToSend.append("Subject", formData.Subject);
    formDataToSend.append("StudyGoals", formData.StudyGoals);

    try {
        const response = await fetch("http://localhost:7000/user/reg", {
            method: "POST",
            body: formDataToSend,
        });

        const data = await response.json();

        if (response.ok) {
            console.log("Signup Success:", data);

            // ✅ Store the token in localStorage
            localStorage.setItem("token", data.token);

            // ✅ Navigate to dashboard
            navigate("/dashboard");
        } else {
            console.log("Signup Failed:", data.message);
        }
    } catch (error) {
        console.error("Error:", error);
    }
};

  return (
    <div className="bg-gradient-to-br from-[#053F5E] to-gray-100 to-teal-100 h-screen flex items-center justify-center">
      <Link to="/"><IoChevronBackSharp className='text-[#0B192C] bg-white/80 p-1 text-4xl border-1 rounded-full fixed top-4 left-4'/></Link>
      <div className="w-full max-w-2xl p-8 bg-white/80 shadow-2xl rounded-3xl">
        <h2 className="text-2xl font-bold text-center mb-6 text-[#0B192C]">
          Enter to Pretend You’re Studying!
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {step === 1 && (
            <div>
              <h3 className="text-lg font-semibold mb-3">Step 1: Account Details</h3>
              <div className="flex flex-col space-y-4">
                <label className="flex items-center">
                  <span className="w-40">Profile Picture:</span>
                  <input type="file" name="ProfilePicture" onChange={handleFileChange} className="border p-2 rounded-lg w-full" required />
                </label>
                <label className="flex items-center">
                  <span className="w-40">Username:</span>
                  <input type="text" name="UserName" value={formData.UserName} onChange={handleChange} className="border p-2 rounded-lg w-full" required />
                </label>
                <label className="flex items-center">
                  <span className="w-40">Email:</span>
                  <input type="email" name="Email" value={formData.Email} onChange={handleChange} className="border p-2 rounded-lg w-full" required />
                </label>
                <label className="flex items-center">
                  <span className="w-40">Password:</span>
                  <input type="password" name="Password" value={formData.Password} onChange={handleChange} className="border p-2 rounded-lg w-full" required />
                </label>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h3 className="text-lg font-semibold mb-3">Step 2: Personal Information</h3>
              <div className="flex flex-col space-y-4">
                <label className="flex items-center">
                  <span className="w-40">Full Name:</span>
                  <input type="text" name="FullName" value={formData.FullName} onChange={handleChange} className="border p-2 rounded-lg w-full" required />
                </label>
                <label className="flex items-center">
                  <span className="w-40">Country:</span>
                  <select
                  name="Country"
                  value={formData.Country}
                  onChange={(e) => {
                    setFormData({ ...formData, Country: e.target.value, State: "" });
                  }}
                  className="border p-2 rounded-lg w-full"
                  required
                  >
                  <option value="">Select Country</option>
                  {Country.getAllCountries().map((country) => (
                    <option key={country.isoCode} value={country.isoCode}>
                      {country.name}
                    </option>
                  ))}
                  </select>
                  {/* <input type="text" name="Country" value={formData.Country} onChange={handleChange} className="border p-2 rounded-lg w-full" required /> */}
                </label>
                <label className="flex items-center">
                  <span className="w-40">State:</span>
                  <select
                    name="State"
                    value={formData.State}
                    onChange={(e) => setFormData({ ...formData, State: e.target.value })}
                    className="border p-2 rounded-lg w-full"
                    required
                    disabled={!formData.Country} // Disable until country is selected
                  >
                    <option value="">Select State</option>
                    {State.getStatesOfCountry(formData.Country).map((state) => (
                      <option key={state.isoCode} value={state.name}>
                        {state.name}
                      </option>
                    ))}
                  </select>
                  {/* <input type="text" name="State" value={formData.State} onChange={handleChange} className="border p-2 rounded-lg w-full" required /> */}
                </label>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h3 className="text-lg font-semibold mb-3">Step 3: Study Preferences</h3>
              <div className="flex flex-col space-y-4">
                <label className="flex items-center">
                  <span className="w-40">Education Level:</span>
                  <input type="text" name="EducationLevel" value={formData.EducationLevel} onChange={handleChange} className="border p-2 rounded-lg w-full" required />
                </label>
                <label className="flex items-center">
                  <span className="w-40">Subject:</span>
                  <input type="text" name="Subject" value={formData.Subject} onChange={handleChange} className="border p-2 rounded-lg w-full" required />
                </label>
                <label className="flex items-center">
                  <span className="w-40">Study Goals:</span>
                  <input type="text" name="StudyGoals" value={formData.StudyGoals} onChange={handleChange} className="border p-2 rounded-lg w-full" required />
                </label>
              </div>
            </div>
          )}

          <div className="flex justify-between mt-6">
            {step > 1 && (
              <button type="button" onClick={prevStep} className="px-4 py-2 bg-gray-400 rounded-md">
                Back
              </button>
            )}
            {step < 3 ? (
              <button type="button" onClick={nextStep} className="px-4 py-2 bg-teal-400 text-white rounded-md">
                Next
              </button>
            ) : (
              <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded-md">
                Submit
              </button>
            )}
          </div>
        </form>

        <div className="mt-4">
          <h3 className="text-center font-semibold">Progress</h3>
          <div className="w-full bg-gray-300 h-2 rounded-full mt-2">
          <div
              className={`h-2 rounded-full transition-all duration-500 ${
                completedSteps === 1 ? "w-1/3 bg-blue-500" : completedSteps === 2 ? "w-2/3 bg-blue-500" : completedSteps === 3 ? "w-full bg-green-500" : "w-0"
              }`}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
