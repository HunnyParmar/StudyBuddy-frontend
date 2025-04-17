import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  User,
  Mail,
  Image as ImageIcon,
  Globe,
  BookOpen,
  Goal,
  PencilLine,
} from "lucide-react";
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

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("http://localhost:7000/user/details", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setUser(res.data);
        setProfilePreview(`http://localhost:7000/${res.data.ProfilePicture}`);
      })
      .catch((err) => console.log(err));
  }, []);

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
      await axios.put("http://localhost:7000/user/update", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      alert("✅ Profile updated successfully!");
    } catch (error) {
      console.error("Update failed", error);
    }
  };

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
            <div className="col-span-2 p-8">
              <h3 className="text-2xl font-semibold text-teal-700 mb-6">Account Settings</h3>
  
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                <InputField
                  icon={<Globe className="w-4 h-4 text-gray-500" />}
                  name="Country"
                  value={user.Country}
                  placeholder="Country"
                  onChange={handleInputChange}
                />
                <InputField
                  icon={<Globe className="w-4 h-4 text-gray-500" />}
                  name="State"
                  value={user.State}
                  placeholder="State"
                  onChange={handleInputChange}
                />
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
                <InputField
                  icon={<Goal className="w-4 h-4 text-gray-500" />}
                  name="StudyGoals"
                  value={user.StudyGoals}
                  placeholder="Study Goals"
                  onChange={handleInputChange}
                />
  
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