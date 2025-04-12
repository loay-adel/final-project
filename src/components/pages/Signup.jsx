import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

import data from "./../../data";

const Signup = () => {
  const [user, setUser] = useState({});
  const [name, setName] = useState("");
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();
  // Validate form inputs
  const validate = () => {
    const errors = {};
    if (!name) {
      errors.name = "Name is required";
    }
    if (!emailOrPhone.trim()) {
      errors.emailOrPhone = "Email or Phone Number is required";
    }
    if (!password) {
      errors.password = "Password is required";
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }
    return errors;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSuccessMessage("");

      return;
    }

    // Check if the email is already registered
    const existingUser = data.users.find((user) => user.email === emailOrPhone);
    if (existingUser) {
      setErrors({ emailOrPhone: "This email is already registered" });
      setSuccessMessage("");
      return;
    }

    // Generate a unique id
    const maxId =
      data.users.length > 0 ? Math.max(...data.users.map((u) => u.id)) : 0;
    const newUser = {
      id: maxId + 1,
      name: name,
      email: emailOrPhone,
      address: "", // Optional field, set to empty string
      orderHistory: [], // New user starts with no orders
    };

    // Add the new user to data.users
    data.users.push(newUser);
    console.log(data.users);

    // Show success message and reset form
    setSuccessMessage("Account created successfully!");
    navigate("/");
    setName("");
    setEmailOrPhone("");
    setPassword("");
    setErrors({});
  };

  return (
    <div className="flex font-mainFont flex-col-reverse xl:flex-row items-center justify-center gap-8 pt-[2em] pb-[4.5em]">
      <div className="w-full xl:w-1/2">
        <img
          src="/dl.beatsnoop 1.webp"
          alt="Signup illustration"
          className="w-full h-auto"
        />
      </div>
      <div className="w-full max-w-sm sm:max-w-md mx-auto px-4">
        <Card color="transparent" shadow={false}>
          <div className="space-y-[1.5em]">
            <Typography
              variant="h2"
              color="blue-gray"
              className="text-2xl sm:text-3xl md:text-4xl">
              Create an account
            </Typography>
            <Typography
              color="black"
              className="mt-1 font-normal text-sm sm:text-base">
              Enter your details below
            </Typography>
          </div>
          {successMessage && (
            <p className="text-green-500 text-center mt-4">{successMessage}</p>
          )}
          <form onSubmit={handleSubmit} className="mt-8 mb-2">
            <div className="space-y-4">
              <div>
                <Input
                  variant="standard"
                  label="Name"
                  className="w-full"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name}</p>
                )}
              </div>
              <div>
                <Input
                  variant="standard"
                  label="Email Or Phone Number"
                  className="w-full"
                  value={emailOrPhone}
                  onChange={(e) => setEmailOrPhone(e.target.value)}
                />
                {errors.emailOrPhone && (
                  <p className="text-red-500 text-sm">{errors.emailOrPhone}</p>
                )}
              </div>
              <div>
                <Input
                  variant="standard"
                  label="Password"
                  type="password"
                  className="w-full"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">{errors.password}</p>
                )}
              </div>
            </div>
            <div className="space-y-4 mt-6">
              <Button
                type="submit"
                className="bg-main p-4 text-xl capitalize w-full">
                Create Account
              </Button>

              <GoogleOAuthProvider clientId="588764666482-k7dd7ktrnc8rlemnipkrdgd4hkr9mhsp.apps.googleusercontent.com">
                <div className="py-[1em]">
                  {!user ? (
                    <GoogleLogin
                      onSuccess={(credentialResponse) => {
                        const decoded = jwtDecode(
                          credentialResponse.credential
                        );
                        setUser(decoded);
                        // console.log("User Data:", decoded);
                      }}
                      onError={() => {
                        // console.log("Login Failed");
                      }}
                    />
                  ) : (
                    <div>
                      <h2>Welcome, {user.name}!</h2>
                      <img
                        src={user.picture}
                        alt="User Profile"
                        className="h-6 w-6"
                      />
                      <p>Email: {user.email}</p>
                    </div>
                  )}
                </div>
              </GoogleOAuthProvider>

              <Typography color="gray" className="text-center font-normal">
                Already have an account?{" "}
                <Link to="/signin" className="font-medium text-blue-600">
                  Sign In
                </Link>
              </Typography>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Signup;
