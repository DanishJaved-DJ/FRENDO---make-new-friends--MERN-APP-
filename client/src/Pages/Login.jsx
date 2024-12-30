import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { PiEyeLight, PiEyeSlash } from "react-icons/pi"; // Import eye icons
import Api from "../Common/Api";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false); 

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload on form submit

    if (!formData.email || !formData.password) {
      toast.error("Both email and password are required.");
      return;
    }

    try {
      const response = await fetch(Api.Login.url, {
        method: Api.Login.method || "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data?.success) {
        toast.success("Login successfully!");
        navigate("/home");
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      toast.error("Something went wrong while logging in.");
    }
  };

  return (
    <div className="bg-slate-100 h-[100vh]">
      <div className="flex justify-around h-full">
        {/* Right Half */}
        <div className="w-3/5 h-auto flex flex-col items-center justify-center bg-blue-500 shadow-lg rounded-lg">
          <h1 className="text-5xl font-bold font-facebook text-white">
          Welcome to FRENDO
          </h1>
          <p className="text-lg text-white">Connect. Share. Discover.</p>
        </div>

        {/* Left Half */}
        <div className="w-1/2 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg w-[30vw] h-[45vh]">
            <div className="p-3 items-center justify-center m-3">
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-4 items-stretch justify-evenly"
              >
                {/* Email Address */}
                <input
                  type="text"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email address"
                  className="p-3 border rounded-md focus:bg-slate-50 focus:outline-none focus:border-facebookBlue"
                />

                {/* Password */}
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"} // Toggle input type
                    name="password"
                    id="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleInputChange}
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

                <button
                  type="submit"
                  className="bg-blue-500 p-3 rounded-lg text-white font-bold text-2xl hover:bg-blue-700"
                >
                  Log in
                </button>
              </form>

              <p className="text-center pt-2 text-facebookBlue hover:underline text-sm">
                Forgotten password?
              </p>

              <div className="border-t mt-6 p-4 flex justify-center">
                <Link
                  to={"/Signup"}
                  className="p-3 bg-lightGreen hover:bg-green-700 rounded-lg text-white font-bold"
                >
                  Create new account
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
