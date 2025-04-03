import {
  Navbar,
  Collapse,
  Typography,
  IconButton,
  Input,
} from "@material-tailwind/react";
import { useState, useEffect, useContext } from "react";
import Store from "../context/Store";
import { Link } from "react-router-dom";
import { IoCartOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
const navList = (
  <ul className="flex flex-col gap-2 lg:flex-row lg:gap-6 lg:items-center lg:mb-0 lg:mt-0 mb-4 mt-2">
    <Link to="/" className="flex active:border-b-2 items-center">
      Home
    </Link>

    <Link to="/contact" className="flex items-center">
      Contact
    </Link>

    <Link to="/about" className="flex items-center">
      About
    </Link>

    <Link to="/signup" className="flex items-center">
      Signup
    </Link>
  </ul>
);

const Header = () => {
  const [openNav, setOpenNav] = useState(false);

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);
  const { cartCount, wishListCount } = useContext(Store);
  console.log(cartCount);
  const { wishlist } = useContext(Store); // Get wishlist from context
  const [isOpen, setIsOpen] = useState(false); // Dropdown visibility state

  return (
    <Navbar fullWidth className="lg:px-8 lg:py-4  mx-auto px-4 py-2">
      <div className="container flex flex-wrap justify-between text-black items-center mx-auto">
        <Typography
          as="a"
          href="#"
          className="text-black text-xl cursor-pointer font-bold mr-4 py-1.5"
        >
          Exclusive
        </Typography>
        <div className="hidden lg:block">{navList}</div>
        <div className="gap-x-2 hidden items-center lg:flex">
          <div className="flex rounded-2xl w-full gap-2 md:w-max relative">
            <Input
              type="search"
              placeholder="What are you looking for"
              containerProps={{
                className: "min-w-[288px] bg-[#F5F5F5] rounded-2xl",
              }}
              className="border-none rounded-5xl focus:border-2 pl-9 placeholder:text-black"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <div className="!absolute left-3 top-[13px]">
              <svg
                width="13"
                height="14"
                viewBox="0 0 14 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.97811 7.95252C10.2126 7.38634 10.3333 6.7795 10.3333 6.16667C10.3333 4.92899 9.84167 3.742 8.9665 2.86683C8.09133 1.99167 6.90434 1.5 5.66667 1.5C4.42899 1.5 3.242 1.99167 2.36683 2.86683C1.49167 3.742 1 4.92899 1 6.16667C1 6.7795 1.12071 7.38634 1.35523 7.95252C1.58975 8.51871 1.93349 9.03316 2.36683 9.4665C2.80018 9.89984 3.31462 10.2436 3.88081 10.4781C4.447 10.7126 5.05383 10.8333 5.66667 10.8333C6.2795 10.8333 6.88634 10.7126 7.45252 10.4781C8.01871 10.2436 8.53316 9.89984 8.9665 9.4665C9.39984 9.03316 9.74358 8.51871 9.97811 7.95252Z"
                  fill="none"
                />
                <path
                  d="M13 13.5L9 9.5M10.3333 6.16667C10.3333 6.7795 10.2126 7.38634 9.97811 7.95252C9.74358 8.51871 9.39984 9.03316 8.9665 9.4665C8.53316 9.89984 8.01871 10.2436 7.45252 10.4781C6.88634 10.7126 6.2795 10.8333 5.66667 10.8333C5.05383 10.8333 4.447 10.7126 3.88081 10.4781C3.31462 10.2436 2.80018 9.89984 2.36683 9.4665C1.93349 9.03316 1.58975 8.51871 1.35523 7.95252C1.12071 7.38634 1 6.7795 1 6.16667C1 4.92899 1.49167 3.742 2.36683 2.86683C3.242 1.99167 4.42899 1.5 5.66667 1.5C6.90434 1.5 8.09133 1.99167 8.9665 2.86683C9.84167 3.742 10.3333 4.92899 10.3333 6.16667Z"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
          <div className="flex items-center gap-4 ml-4">
            <div className="flex items-center gap-4 ml-4 relative">
              <div className="relative">
                {/* Clickable Wishlist Icon */}
                <FaRegHeart
                  onClick={(event) => {
                    event.stopPropagation(); // Prevents unintended navigation
                    setIsOpen(!isOpen);
                  }}
                  className="text-2xl hover:scale-105 hover:cursor-pointer"
                />

                {/* Wishlist Dropdown */}
                {isOpen && (
                  <ul
                    role="menu"
                    data-popover="wishlist-menu"
                    data-popover-placement="bottom"
                    className="absolute z-10 min-w-[180px] overflow-auto rounded-lg border border-slate-200 bg-white p-1.5 shadow-lg shadow-sm focus:outline-none"
                  >
                    {wishlist.length > 0 ? (
                      wishlist.map((item, index) => (
                        <li
                          key={index}
                          role="menuitem"
                          className="cursor-pointer text-slate-800 flex w-full text-sm items-center rounded-md p-3 transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100"
                        >
                          {item}
                        </li>
                      ))
                    ) : (
                      <li className="p-3 text-gray-500 text-sm">
                        No items in wishlist
                      </li>
                    )}
                  </ul>
                )}
              </div>

              {wishListCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                  {wishListCount}
                </span>
              )}
            </div>

            <div className="flex items-center gap-4 ml-4 relative">
              <Link to="/cart" ><IoCartOutline className="text-3xl hover:scale-105 hover:cursor-pointer" /></Link>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                  {cartCount}
                </span>
              )}
            </div>
          </div>
          <div className="flex items-center gap-4 ml-4 relative">
            <Link to="/account" > <img src='/user.png' alt="account" className="text-3xl hover:scale-105 hover:cursor-pointer" /> </Link>
          </div>
        </div>


        <IconButton
          variant="text"
          aria-label="open dropdown"
          className="h-6 text-inherit w-6 active:bg-transparent focus:bg-transparent hover:bg-transparent lg:hidden ml-auto"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </IconButton>

      </div>

      <Collapse open={openNav}>
        <div className="container mx-auto text-black">
          {navList}
          <div className="flex flex-col gap-x-2 sm:flex-row sm:items-center">
            <div className="rounded-2xl w-full gap-2 md:w-max relative">
              <Input
                type="search"
                placeholder="What are you looking for"
                containerProps={{
                  className:
                    "min-w-[288px] bg-[#F5F5F5] rounded-2xl text-black",
                }}
                className="border-none rounded-5xl focus:border-2 pl-9 placeholder:text-black"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              <div className="!absolute left-3 top-[13px]">
                <svg
                  width="13"
                  height="14"
                  viewBox="0 0 14 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.97811 7.95252C10.2126 7.38634 10.3333 6.7795 10.3333 6.16667C10.3333 4.92899 9.84167 3.742 8.9665 2.86683C8.09133 1.99167 6.90434 1.5 5.66667 1.5C4.42899 1.5 3.242 1.99167 2.36683 2.86683C1.49167 3.742 1 4.92899 1 6.16667C1 6.7795 1.12071 7.38634 1.35523 7.95252C1.58975 8.51871 1.93349 9.03316 2.36683 9.4665C2.80018 9.89984 3.31462 10.2436 3.88081 10.4781C4.447 10.7126 5.05383 10.8333 5.66667 10.8333C6.2795 10.8333 6.88634 10.7126 7.45252 10.4781C8.01871 10.2436 8.53316 9.89984 8.9665 9.4665C9.39984 9.03316 9.74358 8.51871 9.97811 7.95252Z"
                    fill="none"
                  />
                  <path
                    d="M13 13.5L9 9.5M10.3333 6.16667C10.3333 6.7795 10.2126 7.38634 9.97811 7.95252C9.74358 8.51871 9.39984 9.03316 8.9665 9.4665C8.53316 9.89984 8.01871 10.2436 7.45252 10.4781C6.88634 10.7126 6.2795 10.8333 5.66667 10.8333C5.05383 10.8333 4.447 10.7126 3.88081 10.4781C3.31462 10.2436 2.80018 9.89984 2.36683 9.4665C1.93349 9.03316 1.58975 8.51871 1.35523 7.95252C1.12071 7.38634 1 6.7795 1 6.16667C1 4.92899 1.49167 3.742 2.36683 2.86683C3.242 1.99167 4.42899 1.5 5.66667 1.5C6.90434 1.5 8.09133 1.99167 8.9665 2.86683C9.84167 3.742 10.3333 4.92899 10.3333 6.16667Z"
                    stroke="black"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </Collapse>
    </Navbar>
  );
};

export default Header;
