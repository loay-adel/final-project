// src/components/Account.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { Spinner } from "@material-tailwind/react";

import { jwtDecode } from "jwt-decode";
const Account = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [userDb, setUser] = useState({});

  // Fetch user data on mount
  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/signin");
        return;
      }
      const decoded = jwtDecode(token.toString());
      const { _id } = decoded;
      const userId = _id;
      try {
        const response = await axios.get(`https://gioco-rx7d.vercel.app/api/users/${userId}`, {
        });
        const user = response.data;
        setUser(user);
        setFormData((prev) => ({
          ...prev,
          firstName: user.firstName || "",
          lastName: user.lastName || "",
          email: user.email || "",
          currentPassword: user.password || ""
        }));
        setLoading(false);
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: "Failed to load user data. Please log in again.",
          icon: "error",
        });
      }
    };
    fetchUserData();
  }, [navigate]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
    if (errors[id]) {
      setErrors((prev) => ({ ...prev, [id]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    } else if (formData.firstName.length < 2) {
      newErrors.firstName = "First name must be at least 2 characters";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (formData.currentPassword || formData.newPassword || formData.confirmPassword) {
      if (!formData.currentPassword) {
        newErrors.currentPassword = "Current password is required";
      }
      if (!formData.newPassword) {
        newErrors.newPassword = "New password is required";
      } else if (formData.newPassword.length < 8) {
        newErrors.newPassword = "New password must be at least 8 characters";
      } else if (!/[A-Z]/.test(formData.newPassword)) {
        newErrors.newPassword = "New password must contain at least one uppercase letter";
      } else if (!/[0-9]/.test(formData.newPassword)) {
        newErrors.newPassword = "New password must contain at least one number";
      }
      if (formData.newPassword !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
    }

    return newErrors;
  };


  const handleSaveChanges = async () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSaving(true);
    try {
      const token = localStorage.getItem("token");

      const updateData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        address: formData.address,
        password: formData.newPassword
      };

      if (formData.currentPassword && formData.newPassword) {
        updateData.password = formData.newPassword;
      }


      await axios.put(`https://gioco-rx7d.vercel.app/api/users/${userDb._id}`, updateData, {
        headers: { Authorization: `Bearer ${ token }` },
  });
  {
    console.log(updateData);
  }
  Swal.fire({
    title: "Changes Saved!",
    text: "Your profile has been updated successfully.",
    icon: "success",
    confirmButtonText: "OK",
  });

  if (updateData.email !== formData.email || updateData.newPassword) {
    Swal.fire({
      title: "Session Update Required",
      text: "Please log in again due to email or password change.",
      icon: "info",
    })
  }
} catch (error) {
  Swal.fire({
    title: "Update Failed",
    text:
      error.response?.data?.message ||
      error.message ||
      "Could not update profile.",
    icon: "error",
  });
  setErrors({
    general:
      error.response?.data?.message ||
      error.message ||
      "Update failed. Please try again.",
  });
} finally {
  setIsSaving(false);
}
  };

const handleCancel = () => {
  navigate("/");
};

if (loading) {
  return (
    <div className="container mx-auto p-5 flex justify-center items-center">
      <Spinner className="h-12 w-12" />
    </div>
  );
}

return (
  <div className="container mx-auto p-5">
    <div className="flex flex-col md:flex-row justify-between items-center mb-5">
      <div className="flex gap-3">
        <Link to="/" className="text-gray-400">
          Home
        </Link>
        <span>/</span>
        <button className="font-medium">My Account</button>
      </div>
      <div className="mt-3 md:mt-0">
        <span>Welcome!</span>
        <span className="text-red-600"> {formData.firstName}</span>
      </div>
    </div>
    <div className="flex flex-col md:flex-row gap-4">
      <div className="md:w-1/4 p-4 border-r">
        <p className="font-medium mb-2">Manage My Account</p>
        <ul className="mb-4 p-4">
          <li className="my-2 text-red-500">My Profile</li>
          <li className="my-2 text-gray-400">Address Book</li>
          <li className="my-2 text-gray-400">My Payment Options</li>
        </ul>
        <p className="font-medium mb-2">My Orders</p>
        <ul className="mb-4 p-4">
          <li className="my-2 text-gray-400">My Returns</li>
          <li className="my-2 text-gray-400">My Cancellations</li>
        </ul>
        <p className="font-medium">My Wishlist</p>
      </div>
      <div className="md:w-3/4 px-5 py-4 shadow-sm bg-white">
        <p className="text-2xl font-medium text-red-600 mb-5">
          Edit Your Profile
        </p>
        {errors.general && (
          <p className="text-red-500 text-center mb-4">{errors.general}</p>
        )}
        <div className="flex flex-col md:flex-row justify-between gap-5 mb-5">
          <div className="w-full md:w-1/2">
            <label
              htmlFor="firstName"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="First Name"
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
            )}
          </div>
          <div className="w-full md:w-1/2">
            <label
              htmlFor="lastName"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Last Name"
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
            )}
          </div>
        </div>
        <div className=" gap-5 mb-5 w-[100%] ">
          <div className="w-full md:w-1/2">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="shadow-sm mb-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="mahmoud@gmail.com"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

        </div>
        <div>
          <label
            htmlFor="currentPassword"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Password Changes
          </label>
          <input
            type="password"
            id="currentPassword"
            value={formData.currentPassword}
            onChange={handleChange}
            className="shadow-sm mb-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Current Password"
          />
          {errors.currentPassword && (
            <p className="text-red-500 text-sm mt-1">{errors.currentPassword}</p>
          )}
          <input
            type="password"
            id="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            className="shadow-sm mb-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="New Password"
          />
          {errors.newPassword && (
            <p className="text-red-500 text-sm mt-1">{errors.newPassword}</p>
          )}
          <input
            type="password"
            id="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="shadow-sm mb-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Confirm New Password"
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
          )}
        </div>
        <div className="flex justify-end gap-4">
          <button
            className="text-gray-500 hover:underline"
            onClick={handleCancel}
            disabled={isSaving}
          >
            Cancel
          </button>
          <button
            className="bg-red-600 text-white px-4 py-2 hover:bg-red-800 rounded disabled:bg-red-300"
            onClick={handleSaveChanges}
            disabled={isSaving}
          >
            {isSaving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  </div>
);
};

export default Account;