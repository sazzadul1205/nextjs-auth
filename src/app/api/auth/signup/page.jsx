"use client";

import React, { useState } from "react";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    imageUrl: "",
    role: "Member", // Default role
  });

  const [alert, setAlert] = useState({ type: "", message: "" });
  const [loading, setLoading] = useState(false); // To manage the button state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Disable the button
    const newUser = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      imageUrl: formData.imageUrl,
      role: formData.role,
    };

    try {
      const response = await fetch(
        "http://localhost:3000/api/auth/signup/new-user",
        {
          body: JSON.stringify(newUser),
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        setAlert({ type: "success", message: "Signup successful!" });
        setFormData({
          name: "",
          email: "",
          password: "",
          imageUrl: "",
          role: "Member",
        }); // Reset form
      } else {
        const errorData = await response.json();
        setAlert({
          type: "error",
          message: errorData?.message || "Signup failed. Please try again.",
        });
      }
    } catch (error) {
      setAlert({
        type: "error",
        message: "An error occurred. Please check your network connection.",
      });
    } finally {
      setLoading(false); // Re-enable the button
    }
  };

  return (
    <div className="flex justify-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="p-8 bg-white rounded-lg shadow-md w-full max-w-md mt-40 text-black h-full"
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-red-500 shadow-2xl">
          Sign Up
        </h2>

        {alert.message && (
          <div
            className={`mb-4 p-4 text-white rounded ${
              alert.type === "success" ? "bg-green-500" : "bg-red-500"
            }`}
          >
            {alert.message}
          </div>
        )}

        {/* Form Fields */}
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-gray-700 font-semibold mb-2"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
            placeholder="Enter your name"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 font-semibold mb-2"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-700 font-semibold mb-2"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
            placeholder="Enter your password"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="imageUrl"
            className="block text-gray-700 font-semibold mb-2"
          >
            Image URL
          </label>
          <input
            type="text"
            id="imageUrl"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
            placeholder="Enter image URL"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="role"
            className="block text-gray-700 font-semibold mb-2"
          >
            Role
          </label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
          >
            <option value="Admin">Admin</option>
            <option value="Member">Member</option>
            <option value="Moderator">Moderator</option>
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-4 px-4 rounded-md text-white transition duration-200 ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {loading ? "Processing..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
};

export default SignupPage;
