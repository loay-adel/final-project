import { Card, Input, Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Signin = () => {
  const [isForgetPasswordOpen, setIsForgetPasswordOpen] = useState(false);

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
        className="fixed inset-0 bg-black/80  flex items-center justify-center z-50"
        onClick={onClose}
      >
        <div
          className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full font-mainFont"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            aria-label="Close"
          >
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
            <Button
              type="submit"
              className="w-full text-white bg-main"
              size="lg"
            >
              Reset password
            </Button>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div className="flex font-mainFont flex-col-reverse xl:flex-row items-center justify-start gap-8 pt-[2em] pb-[4.5em]">
      <img src="/dl.beatsnoop 1.png" alt="" className="w-full xl:w-1/2" />

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

          <form className="mt-8 mb-2 space-y-[1.5em]">
            <Input
              variant="standard"
              label="Email Or Phone Number"
              className="w-full"
            />
            <Input variant="standard" label="Password" className="w-full" />
            <div className="mt-4 flex flex-col items-center sm:flex-row sm:justify-between">
              <Button
                className="w-full sm:w-auto font-medium text-lg bg-main rounded-[0.5em] p-[0.8em] pe-10 px-10 capitalize"
                size="lg"
              >
                Log In
              </Button>
              <Link
                to="/signin"
                className="mt-2 sm:mt-0 text-main"
                onClick={() => setIsForgetPasswordOpen(true)}
              >
                Forget Password?
              </Link>
            </div>
          </form>
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
