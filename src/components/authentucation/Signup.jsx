// src/components/Signup.jsx
import { useState } from "react";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (formData.phone && !/^\d{10,15}$/.test(formData.phone)) {
      newErrors.phone = "Phone number is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const response = await axios({
        headers: {
          "Content-Type": "application/json",
        },
        method: "post",
        url: "https://gioco-rx7d.vercel.app/api/users/register",
        data: formData,
      });

      if (response.data.status === 201) {
        // Store user ID in localStorage if available in response
        // console.log(response);

        if (response.data.userId) {
          localStorage.setItem("userId", response.data.userId);
        }
        navigate("/signin");
      }
    } catch (error) {
      if (error.response) {
        // Handle server validation errors
        if (error.response.data.errors) {
          setErrors(error.response.data.errors);
        } else if (error.response.data.message) {
          setErrors({ general: error.response.data.message });
        }
      } else {
        setErrors({ general: "An error occurred. Please try again." });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex font-mainFont flex-col-reverse xl:flex-row items-center justify-start gap-8 pt-[2em] pb-[4.5em]">
      <img src="/dl.beatsnoop 1.webp" alt="" className="w-full xl:w-1/2" />
      <div className="w-full max-w-sm sm:max-w-md mx-auto px-4">
        <Card color="transparent" shadow={false}>
          <div className="space-y-[1.5em]">
            <Typography
              variant="h2"
              color="blue-gray"
              className="text-2xl sm:text-3xl md:text-4xl"
            >
              Create an account
            </Typography>
            <Typography
              color="black"
              className="mt-1 font-normal text-sm sm:text-base"
            >
              Enter your details below
            </Typography>
          </div>

          {errors.general && (
            <p className="text-red-500 text-center mt-4">{errors.general}</p>
          )}

          <form onSubmit={handleSubmit} className="mt-8 mb-2 space-y-[1.5em]">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Input
                  name="firstName"
                  variant="standard"
                  label="First Name *"
                  value={formData.firstName}
                  onChange={handleChange}
                  error={!!errors.firstName}
                  disabled={loading}
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.firstName}
                  </p>
                )}
              </div>
              <div>
                <Input
                  name="lastName"
                  variant="standard"
                  label="Last Name *"
                  value={formData.lastName}
                  onChange={handleChange}
                  error={!!errors.lastName}
                  disabled={loading}
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                )}
              </div>
            </div>

            <div>
              <Input
                name="email"
                variant="standard"
                label="Email *"
                type="email"
                value={formData.email}
                onChange={handleChange}
                error={!!errors.email}
                disabled={loading}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <Input
                name="phone"
                variant="standard"
                label="Phone Number"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                error={!!errors.phone}
                disabled={loading}
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
              )}
            </div>

            <div>
              <Input
                name="password"
                variant="standard"
                label="Password *"
                type="password"
                value={formData.password}
                onChange={handleChange}
                error={!!errors.password}
                disabled={loading}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            <div>
              <Input
                name="confirmPassword"
                variant="standard"
                label="Confirm Password *"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                error={!!errors.confirmPassword}
                disabled={loading}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full bg-main rounded-[0.5em] p-[0.8em] px-10"
              size="lg"
              disabled={loading}
            >
              {loading ? "Creating Account..." : "Create Account"}
            </Button>
          </form>

          <Typography color="gray" className="mt-4 text-center font-normal">
            Already have an account?{" "}
            <Link
              to="/signin"
              className="font-medium text-blue-600 hover:text-blue-800 hover:underline"
            >
              Sign In
            </Link>
          </Typography>
        </Card>
      </div>
    </div>
  );
};

export default Signup;
