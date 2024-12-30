import React, { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { PiEyeLight, PiEyeSlash } from "react-icons/pi"; // Import eye icons
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Api from "../Common/Api";

function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    avatar: null,
  });

  const [avatarPreview, setAvatarPreview] = useState(""); // State for image preview
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State for confirm password visibility

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prevState) => ({
        ...prevState,
        avatar: file,
      }));
      setAvatarPreview(URL.createObjectURL(file)); // Create a preview URL
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.username ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword ||
      !formData.avatar
    ) {
      toast.error("All fields are required!");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("username", formData.username);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("password", formData.password);
    formDataToSend.append("confirmPassword", formData.confirmPassword);
    formDataToSend.append("avatar", formData.avatar);

    try {
      const response = await fetch(Api.Signup.url, {
        method: Api.Signup.method || "POST",
        body: formDataToSend,
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error("Signup failed");
        return;
      }

      const responseData = await response.json();
      if (responseData.success) {
        toast.success("Signup successfully");
        navigate("/login");
      } else {
        toast.error("Signup failed");
      }
    } catch (err) {
      console.log("Error while signing up");
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className="bg-slate-100 mb-7 h-[100vh] flex flex-col items-center pt-7 gap-5">
      <h1 className="text-5xl font-bold font-facebook text-blue-500">
        frendo
      </h1>

      <div className="bg-white md:min-w-[400px] lg:w-[450px] flex flex-col p-3 items-center gap-1 rounded-lg shadow-lg">
        <div className="flex flex-col items-center border-b pb-2">
          <h1 className="font-semibold text-2xl">Create a new account</h1>
          <p className="text-slate-600">It's quick and easy.</p>
        </div>

        <div className="pt-2 relative">
          {/* Avatar Upload */}
          <label htmlFor="avatar" className="cursor-pointer">
            {avatarPreview ? (
              <img
                src={avatarPreview}
                alt="Avatar Preview"
                className="w-20 h-20 rounded-full object-cover"
              />
            ) : (
              <CgProfile className="text-6xl text-blue-500 w-20 h-20" />
            )}
            <input
              type="file"
              name="avatar"
              id="avatar"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
        </div>

        <div className="p-3 w-full">
          <form
            action=""
            className="flex flex-col mt-2 gap-4 items-stretch justify-evenly"
            onSubmit={handleSubmit}
          >
            {/* Username */}
            <input
              type="text"
              name="username"
              id="username"
              value={formData.username}
              onChange={handleInputChange}
              placeholder="Username"
              className="p-3 border rounded-md focus:bg-slate-50 focus:outline-none focus:border-facebookBlue"
              required
            />

            {/* Email */}
            <input
              type="text"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email"
              className="p-3 border rounded-md focus:bg-slate-50 focus:outline-none focus:border-facebookBlue"
              required
            />

            {/* Password */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Password"
                required
                autoComplete="new-password"
                className="p-3 border rounded-md focus:bg-slate-50 focus:outline-none focus:border-facebookBlue w-full"
              />
              <div
                className="absolute top-3 right-3 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <PiEyeSlash className="text-lg text-gray-600" />
                ) : (
                  <PiEyeLight className="text-lg text-gray-600" />
                )}
              </div>
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Confirm password"
                required
                className="p-3 border rounded-md focus:bg-slate-50 focus:outline-none focus:border-facebookBlue w-full"
              />
              <div
                className="absolute top-3 right-3 cursor-pointer"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <PiEyeSlash className="text-lg text-gray-600" />
                ) : (
                  <PiEyeLight className="text-lg text-gray-600" />
                )}
              </div>
            </div>

            <button
              type="submit"
              className="bg-Blue-500 p-3 rounded-lg text-white font-bold text-2xl
              bg-blue-500 hover:bg-blue-700"
            >
              Sign up
            </button>
          </form>
          <div className="pt-2 text-center text-lightGreen hover:underline font-bold">
            <Link to={"/login"}>Already have an account?</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
