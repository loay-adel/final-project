import { Input, Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const ForgetPassword = ({ isOpen, onClose }) => {
  // Prevent background scrolling when the popup is open
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    // Cleanup to remove the class when the component unmounts
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen]);

  // If the popup is not open, render nothing
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClose}>
      <div
        className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full font-mainFont"
        onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          aria-label="Close">
          ×
        </button>

        <h1 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
          Forgot your password?
        </h1>
        <p className="font-light text-gray-700 dark:text-gray-400">
          Don't worry! Just type in your email and we will send you a code to
          reset your password!
        </p>
        <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5" action="#">
          <div>
            <Input
              label="Enter Your Email"
              className="mb-2 font-medium text-gray-900 text-sm block w-full p-2.5 dark:text-white"
              variant="standard"
              type="email"
              name="email"
              id="email"
              required=""
            />
          </div>
          <Button type="submit" className="w-full text-white bg-main" size="lg">
            Reset password
          </Button>
        </form>
        <div className="mt-4 text-center">
          Already Have An Account?{" "}
          <Link to="/signin" className="text-blue-600">
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
