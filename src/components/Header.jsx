import {
  Navbar,
  Collapse,
  Typography,
  IconButton,
  Input,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Button,
} from "@material-tailwind/react";
import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoCartOutline } from "react-icons/io5";
import { FaRegHeart, FaSearch } from "react-icons/fa";

import { FiUser, FiLogOut } from "react-icons/fi";
import { CartContext } from "../context/CartContext";
import { useAuth } from "./authentucation/authContext";

const Header = () => {
  const [openNav, setOpenNav] = useState(false);
  const navigate = useNavigate();
  const { cartCount, wishlistCount } = useContext(CartContext);
  const { isAuthenticated, user, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async (query) => {
    if (query.trim().length === 0) {
      setSearchResults([]);
      setShowSearchDropdown(false);
      return;
    }

    setIsSearching(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_URL}/products`);
      const data = await response.json();

      const allProducts = Object.values(data.categories).flatMap((category) =>
        Array.isArray(category) ? category : []
      );

      const results = allProducts.filter(
        (product) =>
          product.title.toLowerCase().includes(query.toLowerCase()) ||
          product.description.toLowerCase().includes(query.toLowerCase()) ||
          product.tags?.some((tag) =>
            tag.toLowerCase().includes(query.toLowerCase())
          )
      );

      setSearchResults(results.slice(0, 5));
      setShowSearchDropdown(results.length > 0);
    } catch (error) {
      console.error("Search error:", error);
      setSearchResults([]);
      setShowSearchDropdown(false);
    } finally {
      setIsSearching(false);
    }
  };

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      handleSearch(searchQuery);
    }, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  const handleSearchItemClick = (product) => {
    setSearchQuery("");
    setShowSearchDropdown(false);
    navigate(`/product/${product.id}`);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const navList = (
    <ul className="flex flex-col gap-2 lg:flex-row lg:gap-6 lg:items-center lg:mb-0 lg:mt-0 mb-4 mt-2">
      <Link to="/" className="flex active:border-b-2 items-center">
        Home
      </Link>
      <Link to="/contact" className="flex active:border-b-2 items-center">
        Contact
      </Link>
      <Link to="/about" className="flex active:border-b-2 items-center">
        About
      </Link>
      {!isAuthenticated && (
        <Menu>
          <MenuHandler>
            <span className="cursor-pointer">Sign In</span>
          </MenuHandler>
          <MenuList className="bg-white rounded-lg shadow-lg">
            <MenuItem onClick={() => navigate("/signin")}>Sign In</MenuItem>
            <MenuItem onClick={() => navigate("/signup")}>
              Create Account
            </MenuItem>
          </MenuList>
        </Menu>
      )}
    </ul>
  );

  return (
    <Navbar fullWidth className="lg:px-8 lg:py-4 mx-auto px-4 py-2">
      <div className="container flex flex-wrap justify-between text-black items-center mx-auto">
        <Typography className="text-black text-xl cursor-pointer font-bold mr-4 py-1.5">
          <Link to="/">Exclusive</Link>
        </Typography>
        <div className="hidden lg:block">{navList}</div>
        <div className="gap-x-2 hidden items-center lg:flex">
          {/* Search Bar with Dropdown */}
          <div className="flex rounded-2xl w-full gap-2 md:w-max relative">
            <div className="relative w-full">
              <div className="relative flex items-center">
                <Input
                  type="search"
                  placeholder="What are you looking for?"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => searchQuery && setShowSearchDropdown(true)}
                  onBlur={() =>
                    setTimeout(() => setShowSearchDropdown(false), 200)
                  }
                  containerProps={{
                    className: "min-w-[288px] bg-[#F5F5F5] rounded-2xl",
                  }}
                  className="border-none rounded-5xl focus:border-2 pl-9 placeholder:text-black"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
                <FaSearch className="absolute left-3 text-gray-500" />
              </div>

              {/* Search Dropdown */}
              {showSearchDropdown && (
                <div className="absolute z-50 mt-1 w-full bg-white rounded-md shadow-lg border border-gray-200 max-h-80 overflow-auto">
                  {isSearching ? (
                    <div className="p-4 text-center">Searching...</div>
                  ) : searchResults.length > 0 ? (
                    searchResults.map((product) => (
                      <div
                        key={product.id}
                        className="p-3 hover:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-0"
                        onClick={() => handleSearchItemClick(product)}
                      >
                        <div className="flex items-center">
                          <img
                            src={product.image || product.thumbnail}
                            alt={product.title}
                            className="w-10 h-10 object-cover rounded mr-3"
                          />
                          <div>
                            <Typography variant="small" className="font-medium">
                              {product.title}
                            </Typography>
                            <Typography
                              variant="small"
                              className="text-gray-500"
                            >
                              ${product.price}
                            </Typography>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center">No results found</div>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4 ml-4">
            {/* Wishlist Icon */}
            <div className="relative">
              <Link to="/wishlist">
                <FaRegHeart className="text-2xl hover:scale-105 hover:cursor-pointer" />
              </Link>
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                  {wishlistCount}
                </span>
              )}
            </div>
            {/* Cart Icon */}
            <div className="relative">
              <Link to="/cart">
                <IoCartOutline className="text-3xl hover:scale-105 hover:cursor-pointer" />
              </Link>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                  {cartCount}
                </span>
              )}
            </div>
          </div>
          <Menu>
            <MenuHandler>
              <span className="cursor-pointer">
                {isAuthenticated && user && (
                  <MenuHandler>
                    <img
                      src="/user.png"
                      className="cursor-pointer text-3xl hover:scale-105 hover:cursor-pointer"
                      alt=""
                    />
                  </MenuHandler>
                )}
              </span>
            </MenuHandler>
            {isAuthenticated && (
              <MenuList className="bg-white rounded-lg shadow-lg">
                <MenuItem className="flex items-center gap-2 hover:bg-gray-100">
                  <FiUser />
                  <Typography variant="small" className="font-medium">
                    <Link to="/account">
                      My Profile {isAuthenticated && user?.firstName}
                    </Link>
                  </Typography>
                </MenuItem>
                <hr className="my-2 border-gray-200" />
                <MenuItem
                  className="flex items-center gap-2 hover:bg-gray-100"
                  onClick={handleLogout}
                >
                  <FiLogOut />
                  <Typography variant="small" className="font-medium">
                    Sign Out
                  </Typography>
                </MenuItem>
              </MenuList>
            )}
          </Menu>
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
          {/* Mobile Search */}
          <div className="relative mt-4">
            <div className="relative flex items-center">
              <Input
                type="search"
                placeholder="What are you looking for?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => searchQuery && setShowSearchDropdown(true)}
                onBlur={() =>
                  setTimeout(() => setShowSearchDropdown(false), 200)
                }
                containerProps={{
                  className: "min-w-full bg-[#F5F5F5] rounded-2xl",
                }}
                className="border-none rounded-5xl focus:border-2 pl-9 placeholder:text-black"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              <FaSearch className="absolute left-3 text-gray-500" />
            </div>

            {/* Mobile Search Dropdown */}
            {showSearchDropdown && (
              <div className="absolute z-50 mt-1 w-full bg-white rounded-md shadow-lg border border-gray-200 max-h-80 overflow-auto">
                {isSearching ? (
                  <div className="p-4 text-center">Searching...</div>
                ) : searchResults.length > 0 ? (
                  searchResults.map((product) => (
                    <div
                      key={product.id}
                      className="p-3 hover:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-0"
                      onClick={() => handleSearchItemClick(product)}
                    >
                      <div className="flex items-center">
                        <img
                          src={product.image || product.thumbnail}
                          alt={product.title}
                          className="w-10 h-10 object-cover rounded mr-3"
                        />
                        <div>
                          <Typography variant="small" className="font-medium">
                            {product.title}
                          </Typography>
                          <Typography variant="small" className="text-gray-500">
                            ${product.price}
                          </Typography>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-4 text-center">No results found</div>
                )}
              </div>
            )}
          </div>
        </div>
      </Collapse>
    </Navbar>
  );
};

export default Header;
