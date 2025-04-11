import { Card, Input, Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { useState } from "react";

const Signin = () => {
  const [isForgetPasswordOpen, setIsForgetPasswordOpen] = useState(false);
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [signInErrors, setSignInErrors] = useState({});

  // Validation for Sign-In Form
  const validateSignIn = () => {
    const errors = {};
    if (!emailOrPhone.trim()) {
      errors.emailOrPhone = "Email or Phone Number is required";
    }
    if (!password) {
      errors.password = "Password is required";
    }
    return errors;
  };

  // Handle Sign-In Form Submission
  const handleSignInSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateSignIn();
    if (Object.keys(validationErrors).length > 0) {
      setSignInErrors(validationErrors);
    } else {
      // Simulate login success (replace with actual logic)
      console.log("Login successful with:", { emailOrPhone, password });
      setSignInErrors({});
    }
  };

  const ForgetPassword = ({ isOpen, onClose }) => {
    const [email, setEmail] = useState("");
    const [forgetErrors, setForgetErrors] = useState({});

    // Validation for Forget Password Form
    const validateForgetPassword = () => {
      const errors = {};
      if (!email.trim()) {
        errors.email = "Email is required";
      }
      return errors;
    };

    // Handle Forget Password Form Submission
    const handleForgetPasswordSubmit = (e) => {
      e.preventDefault();
      const validationErrors = validateForgetPassword();
      if (Object.keys(validationErrors).length > 0) {
        setForgetErrors(validationErrors);
      } else {
        // Simulate sending reset email (replace with actual logic)
        console.log("Reset email sent to:", email);
        setForgetErrors({});
        onClose(); // Close popup after successful submission
      }
    };

    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
        <div
          className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full font-mainFont"
          onClick={(e) => e.stopPropagation()}>
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            aria-label="Close">
            ×
          </button>

          {/* Popup content */}
          <h1 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Forgot your password?
          </h1>
          <p className="font-light text-gray-700 dark:text-gray-400">
            Don't worry! Just type in your email and we will send you a code to
            reset your password!
          </p>
          <form
            onSubmit={handleForgetPasswordSubmit}
            className="mt-4 space-y-4 lg:mt-5 md:space-y-5">
            <div>
              <Input
                label="Enter Your Email"
                className="mb-2 font-medium text-gray-900 text-sm block w-full p-2.5 dark:text-white"
                variant="standard"
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              {forgetErrors.email && (
                <p className="text-red-500 text-sm">{forgetErrors.email}</p>
              )}
            </div>
            <Button
              type="submit"
              className="w-full text-white bg-main"
              size="lg">
              Reset password
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
            <h2 className="text-2xl sm:text-3xl md:text-4xl text-black">
              Log in to Exclusive
            </h2>
            <p className="mt-1 font-normal text-sm sm:text-base">
              Enter your details below
            </p>
          </div>
          <form
            onSubmit={handleSignInSubmit}
            className="mt-8 mb-2 space-y-[1.5em]">
            <div>
              <Input
                variant="standard"
                label="Email Or Phone Number"
                className="w-full"
                value={emailOrPhone}
                onChange={(e) => setEmailOrPhone(e.target.value)}
              />
              {signInErrors.emailOrPhone && (
                <p className="text-red-500 text-sm">
                  {signInErrors.emailOrPhone}
                </p>
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
              {signInErrors.password && (
                <p className="text-red-500 text-sm">{signInErrors.password}</p>
              )}
            </div>
            <div className="mt-4 flex flex-col items-center sm:flex-row sm:justify-between">
              <Button
                type="submit"
                className="w-full sm:w-auto font-medium text-lg bg-main rounded-[0.5em] p-[0.8em] pe-10 px-10 capitalize"
                size="lg">
                Log In
              </Button>
              <Link
                to="/signin"
                className="mt-2 sm:mt-0 text-main"
                onClick={(e) => {
                  e.preventDefault(); // Prevent Link navigation
                  setIsForgetPasswordOpen(true);
                }}>
                Forget Password?
              </Link>
            </div>
          </form>
        </Card>
      </div>
      {/* Overlay to prevent background scrolling */}
      {isForgetPasswordOpen && (
        <div className="fixed inset-0 overflow-hidden">
          <ForgetPassword
            isOpen={isForgetPasswordOpen}
            onClose={() => setIsForgetPasswordOpen(false)}
          />
        </div>
      )}
    </div>
  );
};

export default Signin;
