import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";

import React, { useState } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode"; // To decode Google token

const Signup = () => {
  const [user, setUser] = useState(null);

  return (
    <div className="flex font-mainFont flex-col-reverse  xl:flex-row  justify-start md:gap-[4.5em]  items-center  pt-[2em] pb-[4.5em]">
      <img src="/dl.beatsnoop 1.webp" alt="" />
      <div className=" w-full xl:w-1/2">
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
          <form className="mt-8 mb-2">
            <div className="space-y-4">
              <Input variant="standard" label="Name" className="w-full" />
              <Input
                variant="standard"
                label="Email Or Phone Number"
                className="w-full"
              />
              <Input variant="standard" label="Password" className="w-full" />
            </div>
            <div className="space-y-4 mt-6">
              <Button className="bg-main p-4 text-xl capitalize w-full">
                Create Account
              </Button>

              <GoogleOAuthProvider clientId="588764666482-k7dd7ktrnc8rlemnipkrdgd4hkr9mhsp.apps.googleusercontent.com">
                <div className="py-[1em] ">
                  {/* <h1>Google Sign-In</h1> */}

                  {!user ? (
                    <GoogleLogin
                      onSuccess={(credentialResponse) => {
                        const decoded = jwtDecode(
                          credentialResponse.credential
                        ); // Decode JWT Token
                        setUser(decoded);
                        console.log("User Data:", decoded);
                      }}
                      onError={() => {
                        console.log("Login Failed");
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
              {/* <img
                  src="https://docs.material-tailwind.com/icons/google.svg"
                  alt="Google"
                  className="h-6 w-6"
                />
                Sign up with Google */}

              {/* <Button
        size="lg"
        variant="outlined"
        color="blue-gray"
        className="flex items-center gap-3"
      >
        
        <img src="https://docs.material-tailwind.com/icons/google.svg" alt="metamask" className="h-6 w-6" />
        Continue with Google
      </Button> */}

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
