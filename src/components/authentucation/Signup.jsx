import { useState } from "react";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useAuth } from "./authContext";

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
  const { signup } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10,15}$/;

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    } else if (formData.firstName.length < 2) {
      newErrors.firstName = "First name must be at least 2 characters";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!formData.email.trim() && !formData.phone.trim()) {
      newErrors.email = "Email or phone number is required";
      newErrors.phone = "Email or phone number is required";
    } else {
      if (formData.email.trim() && !emailRegex.test(formData.email)) {
        newErrors.email = "Invalid email format";
      }
      if (formData.phone.trim() && !phoneRegex.test(formData.phone)) {
        newErrors.phone = "Invalid phone number (10–15 digits)";
      }
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (!/[A-Z]/.test(formData.password)) {
      newErrors.password = "Password must contain at least one uppercase letter";
    } else if (!/[0-9]/.test(formData.password)) {
      newErrors.password = "Password must contain at least one number";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setLoading(true);

    try {
      await signup({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
      });

      Swal.fire({
        title: "Account Created!",
        text: "You have been successfully registered!",
        icon: "success",
        confirmButtonText: "Continue",
      }).then(() => {
        navigate("/signin");
      });
    } catch (error) {
      Swal.fire({
        title: "Signup Failed",
        text: error.message || "Could not create account",
        icon: "error",
      });
      setErrors({
        general: error.message || "Signup failed. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col-reverse xl:flex-row items-center justify-center gap-8 pt-[2em] pb-[4.5em]">
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
          <form onSubmit={handleSubmit} className="mt-8 mb-2" noValidate>
            <div className="space-y-4">
              <div>
                <Input
                  name="firstName"
                  variant="standard"
                  label="First Name *"
                  value={formData.firstName}
                  onChange={handleChange}
                  error={!!errors.firstName}
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
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
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                )}
              </div>
              <div>
                <Input
                  name="email"
                  variant="standard"
                  label="Email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={!!errors.email}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
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
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
                )}
              </div>
            </div>
            <div className="space-y-4 mt-6">
              <Button
                type="submit"
                className="bg-main p-4 text-xl capitalize w-full"
                disabled={loading}
              >
                {loading ? "Creating Account..." : "Create Account"}
              </Button>
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