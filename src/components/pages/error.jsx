import React from "react";
import { useNavigate } from "react-router-dom";

const Error = () => {
  const navigate = useNavigate();

  return (
    <div className="">
      <div className="container mx-auto px-4">
        <div className="flex gap-1 my-[2rem] text-gray-500 md:justify-start justify-center">
          <button onClick={() => navigate("/")} className="hover:font-bold">
            Home
          </button>
          <span>/</span>
          <span className="font-medium text-black">404 Error</span>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center h-[60vh] bg-white">
        <div className="flex flex-col justify-center items-center gap-5 text-center">
          <h1 className="text-6xl font-bold">404 Not Found</h1>
          <p className="text-lg">Your visited page not found. You may go home page.</p>
          <button
            onClick={() => navigate("/")}
            className="bg-red-600 px-6 py-3 text-white hover:bg-red-800 rounded"
          >
            Back to Home Page
          </button>
        </div>
      </div>
    </div>
  );
};

export default Error;