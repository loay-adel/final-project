import { List, ListItem, Card } from "@material-tailwind/react";
import { Carousel, Rating, Button } from "@material-tailwind/react";
import {
  FaArrowLeft,
  FaArrowRight,
  FaHeart,
  FaShippingFast,
  FaHeadset,
  FaArrowUp,
  FaLaptop,
} from "react-icons/fa";

import { IoFastFood } from "react-icons/io5";
import { IoIosWoman, IoIosMan } from "react-icons/io";
import { FaHouse } from "react-icons/fa6";

import { SiAdguard } from "react-icons/si";
import { useState, useRef, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { IoMdEye } from "react-icons/io";
import { CartContext } from "../../context/CartContext";
import Swal from "sweetalert2";
import axios from "axios";

const Home = () => {
  const {
    products,

    addToCart,
    addToWishlist,
    isInWishlist,
    setProducts,
  } = useContext(CartContext);
  const isDisabled = true;
  const [showArrowUP, setShowArrowUP] = useState(false);
  const [rated, setRated] = useState(4);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const categories = [
    { name: "Men", icon: <IoIosMan className="text-3xl" /> },
    { name: "Women", icon: <IoIosWoman className="text-3xl" /> },
    { name: "Electronics", icon: <FaLaptop className="text-3xl" /> },
    { name: "Food", icon: <IoFastFood className="text-3xl" /> },
    { name: "furniture", icon: <FaHouse className="text-3xl" /> },
  ];

  const targetDate = new Date("2025-05-29T23:59:59");
  const [timeLeft, setTimeLeft] = useState(getTimeLeft(targetDate));

  const scrollContainer = useRef(null);
  const StarRating = ({ rating, maxRating = 5 }) => {
    return (
      <div className="flex items-center">
        {Array.from({ length: maxRating }).map((_, index) => {
          const filled = index < Math.floor(rating);
          const halfFilled =
            !filled && index < Math.ceil(rating) && rating % 1 !== 0;

          return (
            <svg
              key={index}
              className={`w-4 h-4 ${
                filled || halfFilled ? "text-yellow-700" : "text-gray-300"
              }`}
              fill={filled ? "currentColor" : "none"}
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
              />
            </svg>
          );
        })}
        <span className="ml-1 text-sm text-gray-500">
          {rating?.toFixed(1) || 0}
        </span>
      </div>
    );
  };
  const handleAddToCart = (product) => {
    addToCart(product);
    Swal.fire({
      title: "Product Added to Cart!",
      text: `${product.title} has been successfully added to your shopping cart.`,
      icon: "success",
      showConfirmButton: false,
      timer: 1500,
      position: "bottom-end",
      toast: true,
      background: "#48bb78",
      color: "white",
    });
  };

  const handleAddToWishlist = (product) => {
    addToWishlist(product);
    Swal.fire({
      title: "Added to Wishlist!",
      text: `${product.title} has been added to your wishlist.`,
      icon: "success",
      showConfirmButton: false,
      timer: 1500,
      position: "bottom-end",
      toast: true,
      background: "#4299e1",
      color: "white",
    });
  };
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_URL}/products`
        );

        const products = response.data;

        if (!Array.isArray(products)) {
          throw new Error("Invalid API response - expected an array");
        }

        const allProducts = products.map((product) => ({
          ...product,
          id: product._id,
          price: product.price ?? 19.99,
          discount: product.discount ?? 10,
          thumbnail:
            product.thumbnail || product.image || product.images?.[0] || "",
          rating: Math.min(product.rating ?? 3, 5),
        }));

        if (!allProducts.length) {
          console.warn("No valid products found");
          return;
        }

        setProducts(allProducts);
      } catch (err) {
        setError(err.message || "Failed to fetch products");
        console.error("Fetch error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  function getTimeLeft(target) {
    const now = new Date();
    const difference = target - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft(targetDate));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const viewportHeight = window.innerHeight;

      if (scrollPosition >= viewportHeight) {
        setShowArrowUP(true);
      } else {
        setShowArrowUP(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scroll = (direction) => {
    if (scrollContainer.current) {
      const scrollAmount = 300;
      scrollContainer.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  if (isLoading)
    return <div className="text-center py-20">Loading products...</div>;
  if (error)
    return <div className="text-center py-20 text-red-500">Error: {error}</div>;

  return (
    <div className="lg:container mt-3.5 mx-4 lg:mx-auto font-mainFont">
      {/* Hero Section */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-20 md:mb-0 lg:h-[45vh]">
        {/* Sidebar (Category List) */}
        <div className="lg:col-span-1 w-[250px] hidden lg:block h-[45vh]">
          <Card className="w-full h-full">
            <List>
              {/* <ListItem className="relative group flex items-center justify-between w-full px-4 py-2">
                Woman's Fashion
                <span className="ml-2 inline-block w-2 h-2 border-t-2 border-r-2 border-black transform rotate-45"></span>
                <div className="absolute left-full top-0 hidden group-hover:flex flex-col rounded-md bg-white shadow-md w-[200px] min-w-[200px] border border-gray-200 z-10 overflow-hidden">
                  <List>
                    <ListItem className="py-2 hover:bg-gray-100 cursor-pointer border-b-2">
                      Dresses
                    </ListItem>
                    <ListItem className="py-2 hover:bg-gray-100 cursor-pointer border-b-2">
                      Tops
                    </ListItem>
                    <ListItem className="py-2 hover:bg-gray-100 cursor-pointer">
                      Skirts
                    </ListItem>
                  </List>
                </div>
              </ListItem>
              <ListItem className="relative group flex items-center justify-between w-full px-4 py-2">
                Men's Fashion
                <span className="ml-2 inline-block w-2 h-2 border-t-2 border-r-2 border-black transform rotate-45"></span>
                <div className="absolute left-full top-0 hidden group-hover:flex flex-col rounded-md bg-white shadow-md w-[200px] min-w-[200px] border border-gray-200 z-10 overflow-hidden">
                  <List>
                    <ListItem className="py-2 hover:bg-gray-100 cursor-pointer border-b-2">
                      Tops
                    </ListItem>
                    <ListItem className="py-2 hover:bg-gray-100 cursor-pointer border-b-2">
                      Pants
                    </ListItem>
                    <ListItem className="py-2 hover:bg-gray-100 cursor-pointer">
                      Shoes
                    </ListItem>
                  </List>
                </div>
              </ListItem> */}
              {["Men", "Women", "Electronics", "Food", "Furniture"].map(
                (category, index) => (
                  <Link
                    key={index}
                    to={`/show-products/${category
                      .toLowerCase()
                      .replace(" & ", "-")}`}
                    className="text-initial"
                  >
                    <ListItem className="px-4 py-2 hover:bg-gray-100">
                      {category}
                    </ListItem>
                  </Link>
                )
              )}
            </List>
          </Card>
        </div>

        {/* Carousel Section */}
        <div className="lg:col-span-3 h-[45vh] -z-10">
          <Carousel
            autoplay
            loop
            prevArrow={() => <></>}
            nextArrow={() => <></>}
            className="rounded-xl h-full"
          >
            <img
              src="https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2560&q=80"
              loading="lazy"
              alt="image 1"
              className="h-full w-full object-cover"
            />
            <img
              src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2940&q=80"
              loading="lazy"
              alt="image 2"
              className="h-full w-full object-cover"
            />
            <img
              src="https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?ixlib=rb-4.0.3&auto=format&fit=crop&w=2940&q=80"
              loading="lazy"
              alt="image 3"
              className="h-full w-full object-cover"
            />
          </Carousel>
        </div>
      </div>

      {/* Flash Sales Section */}
      <div className="md:mt-40" id="FlashSale">
        <div className="flex flex-row">
          <span className="d-block bg-main rounded w-6 ml-2 md:ml-0"></span>
          <h1 className="text-4xl text-main ml-2.5 font-mainFont">Today's</h1>
        </div>
        <div className="flex flex-col text-4xl items-center md:flex-row md:gap-10 mt-2.5">
          <h1 className="font-bold">Flash Sales</h1>
          <div className="flex flex-col justify-between grow items-center md:flex-row">
            <div className="p-4 rounded-lg text-2xl text-center w-72 font-bold">
              <div className="flex justify-between text-sm">
                <span>Days</span>
                <span>Hours</span>
                <span>Minutes</span>
                <span>Seconds</span>
              </div>
              <div className="flex justify-around text-2xl w-full font-bold">
                <span>{timeLeft.days}</span>
                <span className="text-main">:</span>
                <span>{timeLeft.hours}</span>
                <span className="text-main">:</span>
                <span>{timeLeft.minutes}</span>
                <span className="text-main">:</span>
                <span>{timeLeft.seconds}</span>
              </div>
            </div>
            <div className="flex flex-row gap-5 items-center">
              <FaArrowLeft
                className="bg-gray-300 h-8 p-1.5 rounded-2xl w-8 hover:cursor-pointer"
                onClick={() => scroll("left")}
              />
              <FaArrowRight
                className="bg-gray-300 h-8 p-1.5 rounded-2xl w-8 hover:cursor-pointer"
                onClick={() => scroll("right")}
              />
            </div>
          </div>
        </div>

        {/* Flash Sales Products */}
        <div className="w-full mx-auto relative">
          <div
            ref={scrollContainer}
            className="flex p-4 overflow-x-auto scroll-smooth scrollbar-hide space-x-4"
          >
            {products
              .filter((product) => product.discount > 15)
              .map((product) => (
                <div
                  key={product._id}
                  className="bg-white p-4 rounded-lg text-center min-w-[16em] group hover:cursor-pointer"
                >
                  <div className="w-full bg-sec h-64 relative">
                    <span className="absolute top-2 left-4 bg-main text-white rounded-md w-[55px] h-[26px] text-sm flex items-center justify-center">
                      -{product.discount.toFixed()}%
                    </span>
                    <div className="absolute top-2 gap-2 right-4 flex justify-center items-center flex-col">
                      <button
                        aria-label="add product to wishlist"
                        className="rounded-full z-10"
                        onClick={() => handleAddToWishlist(product)}
                      >
                        <FaHeart
                          className={`text-xl transition-transform hover:scale-110 ${
                            isInWishlist(product.id)
                              ? "fill-red-500"
                              : "hover:fill-red-500"
                          }`}
                        />
                      </button>
                      <Link
                        to={`show-products/${product.category.toLowerCase()}/${
                          product._id
                        }`}
                        aria-label="show product"
                        className="rounded-full z-10"
                        onClick={() => {}}
                      >
                        <IoMdEye className="text-2xl hover:scale-110" />
                      </Link>
                    </div>
                    <div className="h-[100%] flex items-center justify-center relative">
                      <img
                        loading="lazy"
                        src={product.thumbnail}
                        alt={product.title}
                        className="rounded-md object-contain h-full"
                      />
                      <button
                        aria-label="add to cart"
                        className="absolute bottom-0 w-full bg-black text-white py-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                        onClick={() => handleAddToCart(product)}
                      >
                        <p>Add to Cart</p>
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 items-start">
                    <p className="font-medium">{product.title}</p>
                    <div className="flex gap-3">
                      <p className="text-main font-bold">${product.price}</p>
                      <p className="text-gray-400 line-through">
                        $
                        {(product.price / (1 - product.discount / 100)).toFixed(
                          2
                        )}
                      </p>
                    </div>
                    <div className="flex flex-row-reverse text-gray-400 font-bold items-center">
                      <StarRating rating={product.rating} />
                    </div>
                  </div>
                </div>
              ))}
          </div>

          {showArrowUP && (
            <FaArrowUp
              className="fixed right-14 bottom-7 bg-white text-black text-4xl p-2 rounded-full cursor-pointer hover:bg-gray-700 transition-colors duration-300 mix-blend-difference z-40"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            />
          )}

          <div className="flex justify-center mb-2 mt-4">
            <Link to="/show-products">
              <Button className="bg-main px-12 py-5 capitalize">
                View All Products
              </Button>
            </Link>
          </div>
        </div>

        {/* Categories Section */}
        <div className="bg-gray-300 h-[2px] w-full my-10"></div>
        <div className="flex flex-row">
          <span className="d-block bg-main rounded w-6 ml-2 md:ml-0"></span>
          <h1 className="text-4xl text-main ml-2.5">Categories</h1>
        </div>
        <div className="flex flex-col text-4xl items-center md:flex-row md:gap-10 mt-2.5">
          <h1 className="font-bold">Browse By Category</h1>
          <div className="flex flex-col justify-between grow items-center md:flex-row">
            <div className="p-4 rounded-lg text-2xl text-center w-72 font-bold"></div>
            <div className="flex flex-row gap-5 items-center">
              <FaArrowLeft
                className={`bg-gray-300 h-8 p-1.5 rounded-2xl w-8 ${
                  isDisabled
                    ? "cursor-not-allowed opacity-50"
                    : "hover:cursor-pointer"
                }`}
                onClick={() => {
                  if (!isDisabled) scroll("left");
                }}
              />
              <FaArrowRight
                className={`bg-gray-300 h-8 p-1.5 rounded-2xl w-8 ${
                  isDisabled
                    ? "cursor-not-allowed opacity-50"
                    : "hover:cursor-pointer"
                }`}
                onClick={() => {
                  if (!isDisabled) scroll("right");
                }}
              />
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 ">
            {categories.map((category, index) => (
              <Link
                key={index}
                to={`/show-products/${category.name.toLowerCase()}`}
                className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer gap-7 hover:bg-main hover:text-white"
              >
                <div className="mb-2 text-4xl">{category.icon}</div>
                <span className="text-sm font-medium">{category.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Best Selling Products */}
      <div className="bg-gray-300 h-[2px] w-full my-10"></div>
      <div className="flex flex-row">
        <span className="d-block bg-main rounded w-6 ml-2 md:ml-0"></span>
        <h1 className="text-4xl text-main ml-2.5">This Month</h1>
      </div>
      <div className="flex flex-col text-4xl items-center md:flex-row md:gap-10 mt-2.5">
        <h1 className="font-bold">Best Selling Products</h1>
        <div className="flex flex-col justify-between grow items-center md:flex-row">
          <div className="p-4 rounded-lg text-2xl text-center w-72 font-bold"></div>
          <div className="flex flex-row gap-5 items-center">
            <Link to="/show-products">
              <Button className="bg-main px-12 py-4">View All</Button>
            </Link>
          </div>
        </div>
      </div>
      <div className="flex p-4 overflow-x-auto scroll-smooth scrollbar-hide space-x-4">
        {products.slice(0, 5).map((product) => (
          <div
            key={product._id}
            className="bg-white p-4 rounded-lg text-center min-w-[16em] group hover:cursor-pointer"
          >
            <div className="w-full bg-sec h-64 relative">
              <span className="absolute top-2 left-4 bg-main text-white rounded-md w-[55px] h-[26px] text-sm flex items-center justify-center">
                -{product.discount.toFixed()}%
              </span>
              <div className="absolute top-2 gap-2 right-4 flex justify-center items-center flex-col">
                <button
                  aria-label="add product to wishlist"
                  className="rounded-full z-10"
                  onClick={() => handleAddToWishlist(product)}
                >
                  <FaHeart
                    className={`text-xl transition-transform hover:scale-110 ${
                      isInWishlist(product.id)
                        ? "fill-red-500"
                        : "hover:fill-red-500"
                    }`}
                  />
                </button>
                <Link
                  to={`show-products/${product.category.toLowerCase()}/${
                    product._id
                  }`}
                  aria-label="show product"
                  className="rounded-full z-10"
                  onClick={() => {}}
                >
                  <IoMdEye className="text-2xl hover:scale-110" />
                </Link>
              </div>
              <div className="h-[100%] flex items-center justify-center relative">
                <img
                  loading="lazy"
                  src={product.thumbnail}
                  alt={product.title}
                  className="rounded-md object-contain h-full"
                />
                <button
                  className="absolute bottom-0 w-full bg-black text-white py-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  onClick={() => handleAddToCart(product)}
                >
                  <p>Add to Cart</p>
                </button>
              </div>
            </div>
            <div className="flex flex-col gap-2 items-start">
              <p className="font-medium">{product.title}</p>
              <div className="flex gap-3">
                <p className="text-main font-bold">${product.price}</p>
                <p className="text-gray-400 line-through">
                  ${(product.price / (1 - product.discount / 100)).toFixed(2)}
                </p>
              </div>
              <div className="flex flex-row-reverse text-gray-400 font-bold items-center">
                <StarRating rating={product.rating} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Advertisement Banner */}
      <div className="relative bg-gradient-to-r from-main to-blue-800 rounded-xl shadow-xl overflow-hidden">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            {/* Banner Content */}
            <div className="md:w-2/3 mb-6 md:mb-0">
              <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                Limited Time Offer!
              </h2>
              <p className="mt-3 text-lg text-purple-100">
                Hurry up! grap your opportunity on our flsahs sale before it
                ends
              </p>
              <a href="#FlashSale">
                <button className="mt-6 px-6 py-3 bg-white text-purple-600 font-medium rounded-lg hover:bg-gray-100 transition duration-300 shadow-lg">
                  my opportunity
                </button>
              </a>
            </div>

            {/* Countdown Timer */}
            <div className="bg-black bg-opacity-30 rounded-lg p-4 backdrop-blur-sm">
              <h3 className="text-center text-white font-semibold mb-3">
                Offer ends in:
              </h3>
              <div className="flex space-x-2 sm:space-x-4">
                <div className="flex flex-col items-center">
                  <span className="text-2xl sm:text-3xl font-bold text-white bg-black bg-opacity-50 px-3 py-2 rounded">
                    {String(timeLeft.days).padStart(2, "0")}
                  </span>
                  <span className="text-xs text-purple-100 mt-1">Days</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-2xl sm:text-3xl font-bold text-white bg-black bg-opacity-50 px-3 py-2 rounded">
                    {String(timeLeft.hours).padStart(2, "0")}
                  </span>
                  <span className="text-xs text-purple-100 mt-1">Hours</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-2xl sm:text-3xl font-bold text-white bg-black bg-opacity-50 px-3 py-2 rounded">
                    {String(timeLeft.minutes).padStart(2, "0")}
                  </span>
                  <span className="text-xs text-purple-100 mt-1">Minutes</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-2xl sm:text-3xl font-bold text-white bg-black bg-opacity-50 px-3 py-2 rounded">
                    {String(timeLeft.seconds).padStart(2, "0")}
                  </span>
                  <span className="text-xs text-purple-100 mt-1">Seconds</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-0 w-32 h-32 bg-purple-400 rounded-full opacity-20 -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-400 rounded-full opacity-20 translate-x-1/2 translate-y-1/2"></div>
        </div>
      </div>

      {/* Our Products Section */}
      <div className="flex flex-row mt-10">
        <span className="d-block bg-main rounded w-6 ml-2 md:ml-0"></span>
        <h1 className="text-4xl text-main ml-2.5">Our Products</h1>
      </div>
      <div className="flex flex-col text-4xl items-center md:flex-row md:gap-10 mt-2.5">
        <h1 className="font-bold">Explore Our Products</h1>
        <div className="flex flex-col justify-between grow items-center md:flex-row">
          <div className="p-4 rounded-lg text-2xl text-center w-72 font-bold"></div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
        {products.slice(0, 8).map((product) => (
          <div
            key={product._id}
            className="bg-white p-4 rounded-lg text-center group hover:cursor-pointer hover:shadow-lg transition-shadow"
          >
            <div className="w-full bg-sec h-64 relative">
              <span className="absolute top-2 left-4 bg-main text-white rounded-md w-[55px] h-[26px] text-sm flex items-center justify-center">
                -{product.discount.toFixed()}%
              </span>
              <div className="absolute top-2 gap-2 right-4 flex justify-center items-center flex-col">
                <button
                  aria-label="add product to wishlist"
                  className="rounded-full z-10"
                  onClick={() => handleAddToWishlist(product)}
                >
                  <FaHeart
                    className={`text-xl transition-transform hover:scale-110 ${
                      isInWishlist(product.id)
                        ? "fill-red-500"
                        : "hover:fill-red-500"
                    }`}
                  />
                </button>
                <Link
                  to={`show-products/${product.category.toLowerCase()}/${
                    product._id
                  }`}
                  aria-label="show product"
                  className="rounded-full z-10"
                  onClick={() => {}}
                >
                  <IoMdEye className="text-2xl hover:scale-110" />
                </Link>
              </div>
              <div className="h-[100%] flex items-center justify-center relative">
                <img
                  loading="lazy"
                  src={product.thumbnail}
                  alt={product.title}
                  className="rounded-md object-contain h-full"
                />
                <button
                  className="absolute bottom-0 w-full bg-black text-white py-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  onClick={() => handleAddToCart(product)}
                >
                  <p>Add to Cart</p>
                </button>
              </div>
            </div>
            <div className="flex flex-col gap-2 items-start mt-4">
              <p className="font-medium text-lg">{product.title}</p>
              <div className="flex gap-3">
                <p className="text-main font-bold text-lg">${product.price}</p>
                <p className="text-gray-400 line-through">
                  ${(product.price / (1 - product.discount / 100)).toFixed(2)}
                </p>
              </div>
              <div className="flex flex-row-reverse text-gray-400 font-bold items-center">
                <StarRating rating={product.rating} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mb-2 mt-8">
        <Link to="/show-products">
          <Button className="bg-main px-12 py-5">View All Products</Button>
        </Link>
      </div>

      {/* Featured New Arrivals */}
      <div className="flex flex-row mt-10">
        <span className="d-block bg-main rounded w-6 ml-2 md:ml-0"></span>
        <h1 className="text-4xl text-main ml-2.5">Featured</h1>
      </div>
      <div className="flex flex-col text-4xl items-center md:flex-row md:gap-10 mt-2.5">
        <h1 className="font-bold">New Arrival</h1>
        <div className="flex flex-col justify-between grow items-center md:flex-row">
          <div className="p-4 rounded-lg text-2xl text-center w-72 font-bold"></div>
        </div>
      </div>

      {/* Featured Grid Gallery */}
      <div className=" mx-auto py-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* PlayStation 5 - Larger item spanning two rows */}
          <div className="col-span-2 md:col-span-6 md:row-span-2 relative group bg-black flex items-end">
            <img
              src="/ps5.webp"
              loading="lazy"
              alt="PlayStation 5"
              className="w-full  object-contain"
            />
            <div className="absolute inset-0  flex flex-col justify-end p-4 text-white items-start gap-5">
              <h2 className="text-xl font-bold">PlayStation 5</h2>
              <p className="text-sm mb-2">
                Black and White version of the PS5 coming out sale
              </p>
              <button className="bg-white text-black px-3 py-2 rounded text-sm hover:bg-gray-200">
                Shop Now
              </button>
            </div>
          </div>
          {/* Women's Collections */}
          <div className="col-span-2 md:col-span-6 relative group">
            <img
              src="/women.webp"
              loading="lazy"
              alt="Women's Collections"
              className="object-cover w-full"
            />
            <div className="absolute inset-0  flex flex-col justify-end p-4 text-white items-start gap-5">
              <h2 className="text-2xl font-bold">Women's Collections</h2>
              <p className="text-sm mb-2">
                Featured woman collections that give you another vibe
              </p>
              <button className="bg-white text-black px-3 py-2 rounded text-sm hover:bg-gray-200">
                <Link
                  to={`show-products/women`}
                  aria-label="show product"
                  className="rounded-full z-10"
                >
                  Shop Now
                </Link>
              </button>
            </div>
          </div>
          {/* Speakers */}
          <div className="col-span-2 md:col-span-3 relative group bg-black">
            <img
              src="/speakers.webp"
              alt="Speakers"
              loading="lazy"
              className=" object-contain md:scale-[1.4]"
            />
            <div className="absolute inset-0  flex flex-col justify-end p-4 text-white items-start gap-5">
              <h2 className="text-xl font-bold">Speakers</h2>
              <p className="text-sm mb-2">Amazon wireless speakers</p>
              <button className="bg-white text-black px-3 py-2 rounded text-sm hover:bg-gray-200">
                Shop Now
              </button>
            </div>
          </div>
          {/* Perfume */}
          <div className="col-span-2 md:col-span-3 relative group bg-[#535353]">
            <img
              src="/perfume.webp"
              loading="lazy"
              alt="Perfume"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex flex-col justify-end p-4 text-white items-start gap-5">
              <h2 className="text-xl font-bold">Perfume</h2>
              <p className="text-sm mb-2">Gucci Intense Oud EDP</p>
              <button className="bg-white text-black px-3 py-2 rounded text-sm hover:bg-gray-200">
                Shop Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="flex justify-evenly my-20 flex-col md:flex-row gap-10 md:gap-0">
        <div className="flex flex-col items-center gap-2 relative">
          <div className="absolute w-16 h-16 bg-[#c1c1c1] rounded-full -top-2 -z-10"></div>
          <FaShippingFast className="bg-[#2F2E30] text-white text-5xl rounded-full p-4 mb-2" />
          <p className="text-xl font-bold">FREE AND FAST DELIVERY</p>
          <p className="text-sm font-light">
            Free delivery for all orders over $140
          </p>
        </div>
        <div className="flex flex-col items-center gap-2 relative">
          <div className="absolute w-16 h-16 bg-[#c1c1c1] rounded-full -top-2 -z-10"></div>
          <FaHeadset className="bg-[#2F2E30] text-white text-5xl rounded-full p-4 mb-2" />
          <p className="text-xl font-bold">24/7 CUSTOMER SERVICE</p>
          <p className="text-sm font-light">Friendly 24/7 customer support</p>
        </div>
        <div className="flex flex-col items-center gap-2 relative">
          <div className="absolute w-16 h-16 bg-[#c1c1c1] rounded-full -top-2 -z-10"></div>
          <SiAdguard className="bg-[#2F2E30] text-white text-5xl rounded-full p-4 mb-2" />
          <p className="text-xl font-bold">MONEY BACK GUARANTEE</p>
          <p className="text-sm font-light">We return money within 30 days</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
