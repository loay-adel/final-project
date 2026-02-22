// src/components/Signin.jsx
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { CartContext } from "../../context/CartContext";
import axios from "axios";

const Signin = () => {
  const navigate = useNavigate();
  const [isForgetPasswordOpen, setIsForgetPasswordOpen] = useState(false);
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { setUser } = useContext(CartContext);
const APIURl = import.meta.env.VITE_API_URL;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!credentials.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(credentials.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!credentials.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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
        url: `${APIURl}users/login`,
        data: credentials,
      });

      if (response.data.status === 200) {
        localStorage.setItem("token", response.data.data.data);
        navigate("/");
        setUser(response.data.data.data);
      }
    } catch (error) {
      if (error.response) {
        if (error.response.data.message) {
          setErrors({ general: error.response.data.message });
        }
      } else {
        setErrors({ general: "An error occurred. Please try again." });
      }
    } finally {
      setLoading(false);
    }
  };

  const ForgetPassword = ({ isOpen, onClose }) => {
    const [email, setEmail] = useState("");
    const [forgetErrors, setForgetErrors] = useState({});
    const [forgetLoading, setForgetLoading] = useState(false);

    const handleForgetSubmit = async (e) => {
      e.preventDefault();
      setForgetLoading(true);

      // Add your forget password logic here
      // Validate email first
      if (!email.trim()) {
        setForgetErrors({ email: "Email is required" });
        setForgetLoading(false);
        return;
      }

      try {
        // Call your forget password API
        // await axios.post('/api/forget-password', { email });
        alert("Password reset link sent to your email!");
        onClose();
      } catch (error) {
        setForgetErrors({
          general: "Failed to send reset link. Please try again.",
        });
      } finally {
        setForgetLoading(false);
      }
    };

    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full font-mainFont">
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            aria-label="Close"
          >
            ×
          </button>
          <h1 className="mb-1 text-xl font-bold text-gray-900 md:text-2xl dark:text-white">
            Forgot your password?
          </h1>
          <p className="font-light text-gray-700 dark:text-gray-400">
            Enter your email to receive a password reset code!
          </p>
          <form onSubmit={handleForgetSubmit} className="mt-4 space-y-4">
            <div>
              <Input
                label="Enter Your Email"
                variant="standard"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (forgetErrors.email) setForgetErrors({});
                }}
                error={!!forgetErrors.email}
              />
              {forgetErrors.email && (
                <p className="text-red-500 text-sm">{forgetErrors.email}</p>
              )}
            </div>
            <Button
              type="submit"
              className="w-full bg-main"
              size="lg"
              disabled={forgetLoading}
            >
              {forgetLoading ? "Sending..." : "Reset Password"}
            </Button>
          </form>
        </div>
      </div>
    );
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
              Log in to Exclusive
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
            <div>
              <Input
                name="email"
                variant="standard"
                label="Email *"
                value={credentials.email}
                onChange={handleChange}
                error={!!errors.email}
                disabled={loading}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>
            <div>
              <Input
                name="password"
                variant="standard"
                label="Password *"
                type="password"
                value={credentials.password}
                onChange={handleChange}
                error={!!errors.password}
                disabled={loading}
              />
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password}</p>
              )}
            </div>

            <div className="mt-4 flex flex-col items-center sm:flex-row sm:justify-between">
              <Button
                type="submit"
                className="w-full sm:w-auto bg-main rounded-[0.5em] p-[0.8em] px-10"
                size="lg"
                disabled={loading}
              >
                {loading ? "Logging In..." : "Log In"}
              </Button>
              <button
                type="button"
                className="mt-2 sm:mt-0 text-main hover:underline"
                onClick={() => setIsForgetPasswordOpen(true)}
              >
                Forget Password?
              </button>
            </div>
          </form>

          <Typography color="gray" className="mt-4 text-center font-normal">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-medium text-blue-600 hover:text-blue-800 hover:underline"
            >
              Sign Up
            </Link>
          </Typography>
        </Card>
      </div>

      <ForgetPassword
        isOpen={isForgetPasswordOpen}
        onClose={() => setIsForgetPasswordOpen(false)}
      />
    </div>
  );
};

export default Signin;
