import { Link } from "react-router-dom";

const Checkout = () => {
  return (
    <>
      <div className="container mx-auto p-5">
        <div className="flex gap-3 my-5 text-sm text-gray-500 flex-wrap">
          <Link to="/account">Account</Link>
          <span>/</span>
          <Link to="/account">My Account</Link>
          <span>/</span>
          <Link to="/product">Product</Link>
          <span>/</span>
          <Link to="/cart">View Cart</Link>
          <span>/</span>
          <Link className="font-medium text-black">CheckOut</Link>
        </div>

        <h1 className="mb-4 text-2xl font-bold">Billing Details</h1>

        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/2 pr-5 mb-5 md:mb-0">
            <label className="block text-gray-700 mb-2 text-sm font-medium">First Name</label>
            <input
              type="text"
              className="mb-4 shadow-xs bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg block w-full p-2.5"
            />
            <label className="block text-gray-700 mb-2 text-sm font-medium">Company Name</label>
            <input
              type="text"
              className="mb-4 shadow-xs bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg block w-full p-2.5"
            />
            <label className="block text-gray-700 mb-2 text-sm font-medium">Street Address</label>
            <input
              type="text"
              className="mb-4 shadow-xs bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg block w-full p-2.5"
            />
            <label className="block text-gray-700 mb-2 text-sm font-medium">Apartment, floor, etc. (optional)</label>
            <input
              type="text"
              className="mb-4 shadow-xs bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg block w-full p-2.5"
            />
            <label className="block text-gray-700 mb-2 text-sm font-medium">Town/City</label>
            <input
              type="text"
              className="mb-4 shadow-xs bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg block w-full p-2.5"
            />
            <label className="block text-gray-700 mb-2 text-sm font-medium">Phone Number</label>
            <input
              type="text"
              className="mb-4 shadow-xs bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg block w-full p-2.5"
            />
            <label className="block text-gray-700 mb-2 text-sm font-medium">Email Address</label>
            <input
              type="email"
              className="mb-4 shadow-xs bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg block w-full p-2.5"
            />
            <div className="flex items-center mt-3">
              <input type="checkbox" className="w-4 h-4" />
              <p className="ml-2 text-sm">Save this information for faster check-out next time</p>
            </div>
          </div>

          <div className="w-full md:w-1/2 pl-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center justify-between space-x-3">
                <img src="/controller.png" alt="Product" className="w-12 h-12" />
                <p className="text-sm">LCD Monitor</p>
              </div>
              <p className="text-sm">$650</p>
            </div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center justify-between space-x-3">
                <img src="/controller.png" alt="Product" className="w-12 h-12" />
                <p className="text-sm">H1 Gamepad</p>
              </div>
              <p className="text-sm">$1100</p>
            </div>
            <div className="border-t border-gray-400 py-2">
              <div className="flex justify-between py-2">
                <p className="text-sm">Subtotal:</p>
                <p className="text-sm">$1750</p>
              </div>
              <div className=" border-t border-gray-300 py-2 flex justify-between">
                <p className="text-sm">Shipping:</p>
                <p className="text-sm">Free</p>
              </div>
              <div className=" border-t border-gray-300 py-2 flex justify-between font-bold">
                <p className="text-sm">Total:</p>
                <p className="text-sm">$1750</p>
              </div>
            </div>
            <div className="flex justify-between mt-4">
              <div className="flex">
                <input type="radio" className="w-5 h-5" name="payment" />
                <p className="ml-2 text-sm">Bank</p>
              </div>
              <div className="flex">
                <img src="/Visa.png" alt="Visa" className="ml-2 w-10" />
                <img src="/Bank.png" alt="Bank" className="ml-2 w-10" />
                <img src="/Nagad.png" alt="Bank" className="ml-2 w-10" />
                <img src="/Bkash.png" alt="Bank" className="ml-2 w-10" />
              </div>
            </div>
            <div className="flex items-center mt-2">
              <input type="radio" className="w-5 h-5" name="payment" />
              <p className="ml-2 text-sm">Cash on delivery</p>
            </div>
            <div className="flex mt-4">
              <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
                <form className="flex space-x-4">
                  <input type="text" placeholder="Coupon Code" className="block w-full rounded-lg border border-gray-300 p-2.5 text-sm text-gray-900" required />
                  <button type="submit" className="rounded-lg bg-red-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-700">Apply Coupon</button>
                </form>
              </div>
            </div>
            <button className="w-full mt-4 bg-red-600 text-white py-3 rounded hover:bg-red-800">
              Place Order
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
