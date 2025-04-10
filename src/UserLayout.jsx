import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Cart from "./components/pages/Cart";
import Checkout from "./components/pages/Checkout";
import Contact from "./components/pages/Contact";
import Error from "./components/pages/error";
import Product from "./components/pages/Product/Product";
import ShowProduct from "./components/pages/Product/ShowProduct";

import Signin from "./components/pages/Signin";
import Signup from "./components/pages/Signup";
import Wishlist from "./components/pages/Wishlist";
import About from "./components/pages/About";
import Account from "./components/pages/Account";
import Home from "./components/pages/Home";
import ForgetPassword from "./components/pages/ForgetPassword";


const UserLayout = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route index element={<Home />} />
        <Route path="cart" element={<Cart />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="contact" element={<Contact />} />
        <Route path="*" element={<Error />} />
        <Route path="show-products/:category/:name?" element={<Product />} />
        {/* <Route path=":category/:name" element={<ShowProduct />} /> */}
        <Route path="signin" element={<Signin />} />
        <Route path="signup" element={<Signup />} />
        <Route path="forget-password" element={<ForgetPassword />} />
        <Route path="wishlist" element={<Wishlist />} />
        <Route path="about" element={<About />} />
        <Route path="account" element={<Account />} />
      </Routes>
      <Footer />
    </>
  );
};

export default UserLayout;
