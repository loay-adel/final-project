import React from "react";
import { ShieldX, ArrowLeft } from "lucide-react";
const NotAuthorized = () => {
  function App() {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full text-center">
          {/* Error Icon */}
          <div className="mb-8 flex justify-center">
            <div className="bg-red-50 p-3 rounded-full">
              <ShieldX className="w-16 h-16 text-red-500" />
            </div>
          </div>

          {/* Error Message */}
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Access Denied
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Sorry, you don't have permission to access this page. Please contact
            your administrator if you believe this is a mistake.
          </p>

          {/* Illustration */}

          {/* Action Button */}
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center px-6 py-3 text-base font-medium text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Go Back
          </button>

          {/* Additional Info */}
          <p className="mt-8 text-sm text-gray-500">
            Error Code: 403 | Unauthorized Access
          </p>
        </div>
      </div>
    );
  }
};

export default NotAuthorized;
