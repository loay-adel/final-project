import React from "react";
import { Link } from "react-router-dom";

const Account = () => {

  return (
    <div className="container mx-auto p-5">
      <div className="flex flex-col md:flex-row justify-between items-center mb-5">
        <div className="flex gap-3">
        <Link to="/" className="text-gray-400">Home</Link>
          <span>/</span>
          <button className="font-medium">My Account</button>
        </div>
        <div className="mt-3 md:mt-0">
          <span>Welcome!</span>
          <span className="text-red-600"> User Name</span>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="md:w-1/4 p-4 border-r">
          <p className="font-medium mb-2">Manage My Account</p>
          <ul className="mb-4 p-4">
            <li className="my-2 text-red-500">My Profile</li>
            <li className="my-2 text-gray-400">Address Book</li>
            <li className="my-2 text-gray-400">My Payment Options</li>
          </ul>
          <p className="font-medium mb-2">My Orders</p>
          <ul className="mb-4 p-4">
            <li className="my-2 text-gray-400">My Returns</li>
            <li className="my-2 text-gray-400">My Cancellations</li>
          </ul>
          <p className="font-medium">My Wishlist</p>
        </div>
        <div className="md:w-3/4 px-5 py-4 shadow-sm bg-white">
          <p className="text-2xl font-medium text-red-600 mb-5">Edit Your Profile</p>
          <div className="flex flex-col md:flex-row justify-between gap-5 mb-5">
            <div className="w-full md:w-1/2">
              <label
                htmlFor="fName"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                First Name
              </label>
              <input
                type="text"
                id="fName"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="First Name"
              />
            </div>
            <div className="w-full md:w-1/2">
              <label
                htmlFor="lName"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lName"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Last Name"
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between gap-5 mb-5">
            <div className="w-full md:w-1/2">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="mahmoud@gmail.com"
              />
            </div>
            <div className="w-full md:w-1/2">
              <label
                htmlFor="address"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Address
              </label>
              <input
                type="text"
                id="address"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Kingston, 5236, United State"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="currentPassword"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Password Changes
            </label>
            <input
              type="password"
              id="currentPassword"
              className="shadow-sm mb-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Current Password"
            />
            <input
              type="password"
              id="newPassword"
              className="shadow-sm mb-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="New Password"
            />
            <input
              type="password"
              id="confirmPassword"
              className="shadow-sm mb-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Confirm Password"
            />
          </div>
          <div className="flex justify-end gap-4">
            <button className="text-gray-500">Cancel</button>
            <button className="bg-red-600 text-white px-4 py-2 hover:bg-red-800 rounded">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;