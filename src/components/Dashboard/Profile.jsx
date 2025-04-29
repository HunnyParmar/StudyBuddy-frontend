import React, { useEffect, useState } from "react";
import axios from "../../App/axios";
import {
  User,
  Mail,
  Image as ImageIcon,
  Globe,
  BookOpen,
  Goal,
  PencilLine,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Country, State } from "country-state-city";
import Dashboard from "./Dashboard";

const Profile = () => {
  const [user, setUser] = useState({
    FullName: "",
    UserName: "",
    Email: "",
    Country: "",
    State: "",
    EducationLevel: "",
    Subject: "",
    StudyGoals: "",
  });

  const [profilePreview, setProfilePreview] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [expandedSection, setExpandedSection] = useState("userInfo");
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
  .get("/user/details")
  .then((res) => {
    setUser(res.data);
    setProfilePreview(`${axios.defaults.baseURL}/${res.data.ProfilePicture}`);
  })
  .catch((err) => console.log(err));

    setCountries(Country.getAllCountries());
  }, []);

  useEffect(() => {
    if (user.Country) {
      setStates(State.getStatesOfCountry(user.Country));
    } else {
      setStates([]);
    }
  }, [user.Country]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProfileImage(file);
    setProfilePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const formData = new FormData();
    Object.entries(user).forEach(([key, value]) => {
      formData.append(key, value);
    });
    if (profileImage) formData.append("ProfilePicture", profileImage);

    try {
      await await axios.put("/user/update", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      
      alert("✅ Profile updated successfully!");
    } catch (error) {
      console.error("Update failed", error);
    }
  };

  const renderSection = (title, icon, content, sectionKey) => (
    <div className="mb-6">
      <button
        type="button"
        onClick={() => setExpandedSection(expandedSection === sectionKey ? "" : sectionKey)}
        className="w-full flex items-center justify-between p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
      >
        <div className="flex items-center space-x-3">
          {icon}
          <span className="text-lg font-medium text-gray-800">{title}</span>
        </div>
        {expandedSection === sectionKey ? (
          <ChevronUp className="text-gray-500" />
        ) : (
          <ChevronDown className="text-gray-500" />
        )}
      </button>
      {expandedSection === sectionKey && (
        <div className="mt-4 p-6 bg-white rounded-lg shadow-sm">
          {content}
        </div>
      )}
    </div>
  );

  return (
    <div className="flex h-screen">
      <Dashboard />
      <div className="flex-1 bg-white overflow-auto pt-25 px-4 sm:px-6 lg:px-10">
        <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-xl overflow-hidden border border-gray-200">
          <div className="grid grid-cols-1 lg:grid-cols-3">
            {/* Profile Sidebar */}
            <div className="bg-[radial-gradient(at_20%_30%,#0f766e_0%,transparent_40%),radial-gradient(at_80%_20%,#0e7490_0%,transparent_50%),radial-gradient(at_50%_80%,#0f766e_0%,transparent_45%),radial-gradient(at_70%_60%,#115e59_0%,transparent_40%)] bg-teal-900
 p-6 flex flex-col items-center justify-center text-center border-r border-gray-200">
              <img
                src={profilePreview || "/default-profile.png"}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover shadow-md"
              />
              <label className="mt-4 cursor-pointer text-sm text-white font-medium">
                <span className="flex items-center gap-2 justify-center">
                  <ImageIcon className="w-4 h-4" />
                  Change Picture
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
              <div className="mt-6 space-y-1 text-white ">
                <h2 className="text-2xl capitalize font-semibold">{user.FullName || "Your Name"}</h2>
                <p className="text-sm py-1 text-white">{user.Email}</p>
                <p className="text-sm text-white">Country: {user.Country}</p>
              </div>
            </div>

            {/* Profile Form */}
            <div className="col-span-2 p-8 h-[400px]">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-semibold text-teal-700">Account Settings</h3>
                <div className="relative">
                  <select
                    value={expandedSection}
                    onChange={(e) => setExpandedSection(e.target.value)}
                    className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="userInfo">User Information</option>
                    <option value="location">Location</option>
                    <option value="study">Study Preferences</option>
                  </select>
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <ChevronDown className="w-4 h-4 text-gray-500" />
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {expandedSection === "userInfo" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputField
                      icon={<User className="w-4 h-4 text-gray-500" />}
                      name="FullName"
                      value={user.FullName}
                      placeholder="Full Name"
                      onChange={handleInputChange}
                    />
                    <InputField
                      icon={<PencilLine className="w-4 h-4 text-gray-500" />}
                      name="UserName"
                      value={user.UserName}
                      placeholder="Username"
                      onChange={handleInputChange}
                    />
                    <InputField
                      icon={<Mail className="w-4 h-4 text-gray-500" />}
                      name="Email"
                      value={user.Email}
                      placeholder="Email"
                      disabled
                      readOnly
                      className="bg-gray-100 cursor-not-allowed"
                    />
                  </div>
                )}

                {expandedSection === "location" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                        <Globe className="w-4 h-4 text-gray-500" />
                      </div>
                      <select
                        name="Country"
                        value={user.Country}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-150"
                      >
                        <option value="">Select Country</option>
                        {countries.map((country) => (
                          <option key={country.isoCode} value={country.isoCode}>
                            {country.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                        <Globe className="w-4 h-4 text-gray-500" />
                      </div>
                      <select
                        name="State"
                        value={user.State}
                        onChange={handleInputChange}
                        disabled={!user.Country}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-150"
                      >
                        <option value="">Select State</option>
                        {states.map((state) => (
                          <option key={state.isoCode} value={state.name}>
                            {state.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}

                {expandedSection === "study" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputField
                      icon={<BookOpen className="w-4 h-4 text-gray-500" />}
                      name="EducationLevel"
                      value={user.EducationLevel}
                      placeholder="Education Level"
                      onChange={handleInputChange}
                    />
                    <InputField
                      icon={<BookOpen className="w-4 h-4 text-gray-500" />}
                      name="Subject"
                      value={user.Subject}
                      placeholder="Subject"
                      onChange={handleInputChange}
                    />
                    <div className="md:col-span-2">
                      <div className="relative">
                        <div className="absolute left-3 top-3">
                          <Goal className="w-4 h-4 text-gray-500" />
                        </div>
                        <textarea
                          name="StudyGoals"
                          value={user.StudyGoals}
                          onChange={handleInputChange}
                          placeholder="Study Goals"
                          rows={4}
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-150"
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div className="col-span-1 md:col-span-2 mt-6">
                  <button
                    type="submit"
                    className="w-full bg-teal-700 hover:bg-teal-900 text-white font-semibold py-3 rounded-lg shadow-md transition-colors duration-200"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Reusable Input Field
const InputField = ({ icon, name, value, placeholder, onChange, ...rest }) => (
  <div className="relative">
    <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
      {icon}
    </div>
    <input
      type="text"
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      {...rest}
      className={`w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-150`}
    />
  </div>
);

export default Profile;