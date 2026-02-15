import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  FaUserCircle,
  FaEnvelope,
  FaCrown,
  FaSignOutAlt,
  FaEdit,
  FaSave,
  FaTimes
} from "react-icons/fa";

const Profile = () => {
  const { user, logout, updateUser } = useAuth(); // make sure updateUser exists
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    bio: user?.bio || "",
    profilePic: user?.profilePic || ""
  });

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleSubscription = () => {
    navigate("/subscription");
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setFormData({ ...formData, profilePic: imageURL });
    }
  };

  const handleSave = () => {
    updateUser(formData); // update context/localStorage
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData(user); // reset data
  };

  if (!user) {
    return (
      <div className="text-white text-center mt-20 text-xl">
        🔒 Please login to view profile.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-black to-neutral-900 text-white pt-24 px-4">
      <div className="max-w-md mx-auto bg-neutral-800 p-8 rounded-2xl shadow-2xl border border-neutral-700">

        {/* Profile Image */}
        <div className="flex flex-col items-center mb-6 relative">
          {formData.profilePic ? (
            <img
              src={formData.profilePic}
              alt="Profile"
              className="w-28 h-28 rounded-full object-cover border-4 border-red-500"
            />
          ) : (
            <FaUserCircle size={100} className="text-red-500" />
          )}

          {isEditing && (
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="mt-3 text-sm"
            />
          )}

          <h1 className="text-2xl font-bold mt-3">
            👋 Welcome, {formData.name}
          </h1>
        </div>

        {/* User Info */}
        <div className="space-y-4 mb-6">

          {/* Name */}
          <div className="bg-neutral-700 p-3 rounded-lg">
            <p className="text-xs text-neutral-400">Name</p>
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-neutral-600 p-2 rounded mt-1"
              />
            ) : (
              <p>{formData.name}</p>
            )}
          </div>

          {/* Email (non-editable) */}
          <div className="bg-neutral-700 p-3 rounded-lg">
            <p className="text-xs text-neutral-400">Email</p>
            <p>{formData.email}</p>
          </div>

          {/* Phone */}
          <div className="bg-neutral-700 p-3 rounded-lg">
            <p className="text-xs text-neutral-400">Phone</p>
            {isEditing ? (
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full bg-neutral-600 p-2 rounded mt-1"
              />
            ) : (
              <p>{formData.phone || "Not added"}</p>
            )}
          </div>

          {/* Bio */}
          <div className="bg-neutral-700 p-3 rounded-lg">
            <p className="text-xs text-neutral-400">Bio</p>
            {isEditing ? (
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                className="w-full bg-neutral-600 p-2 rounded mt-1"
              />
            ) : (
              <p>{formData.bio || "No bio added"}</p>
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="space-y-3">

          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="w-full flex items-center justify-center gap-2 bg-green-600 py-2 rounded-lg hover:bg-green-700 transition"
              >
                <FaSave /> Save Changes
              </button>

              <button
                onClick={handleCancel}
                className="w-full flex items-center justify-center gap-2 bg-gray-500 py-2 rounded-lg hover:bg-gray-600 transition"
              >
                <FaTimes /> Cancel
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setIsEditing(true)}
                className="w-full flex items-center justify-center gap-2 bg-blue-600 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                <FaEdit /> Edit Profile
              </button>

              <button
                onClick={handleSubscription}
                className="w-full flex items-center justify-center gap-2 bg-yellow-500 text-black font-semibold py-2 rounded-lg hover:bg-yellow-400 transition"
              >
                <FaCrown /> Manage Subscription
              </button>

              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 bg-red-600 py-2 rounded-lg hover:bg-red-700 transition"
              >
                <FaSignOutAlt /> Logout
              </button>
            </>
          )}

        </div>

      </div>
    </div>
  );
};

export default Profile;
