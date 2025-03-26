import { List, ListItem, Card } from "@material-tailwind/react";
import {
  Carousel,
  IconButton,
  Rating,
  Typography,
  Button,
} from "@material-tailwind/react";
import {
  FaArrowLeft,
  FaArrowRight,
  FaHeart,
  FaShippingFast,
  FaHeadset,
  FaArrowUp,
} from "react-icons/fa";
import { SiAdguard } from "react-icons/si";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

import { IoMdEye } from "react-icons/io";

const Home = () => {
  const targetDate = new Date("2025-03-28T23:59:59"); // Set your target date here
  const [timeLeft, setTimeLeft] = useState(getTimeLeft(targetDate));
  const [rated, setRated] = useState(4);

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
  });

  const scrollContainer = useRef(null);
  const scroll = (direction) => {
    if (scrollContainer.current) {
      const scrollAmount = 300; // Adjust scroll distance
      scrollContainer.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="container mt-3.5 mx-auto font-mainFont">
      <div className="flex flex-col justify-between mb-20 md:flex-row md:h-[50vh]">
        <div className="md:w-[20%] x-sm:mb-10">
          {" "}
          <Card className="w-full">
            <List>
              <a href="#" className="text-initial">
                <ListItem>Woman's Fashion</ListItem>
              </a>
              <a href="#" className="text-initial">
                <ListItem>man's Fashion</ListItem>
              </a>
              <a href="#" className="text-initial">
                <ListItem>Electronics</ListItem>
              </a>
              <a href="#" className="text-initial">
                <ListItem>Home & Lifestyle</ListItem>
              </a>
              <a href="#" className="text-initial">
                <ListItem>Medicine</ListItem>
              </a>
              <a href="#" className="text-initial">
                <ListItem>Sports & Outdoor</ListItem>
              </a>
              <a href="#" className="text-initial">
                <ListItem>Baby’s & Toys</ListItem>
              </a>
              <a href="#" className="text-initial">
                <ListItem>Groceries & Pets</ListItem>
              </a>
              <a href="#" className="text-initial">
                <ListItem>Health & Beauty</ListItem>
              </a>
            </List>
          </Card>
        </div>
        <div className="w-full md:w-[75%]">
          <Carousel
            className="rounded-xl w-full"
            prevArrow={({ handlePrev }) => (
              <IconButton
                variant="text"
                color="white"
                size="lg"
                onClick={handlePrev}
                className="-translate-y-2/4 !absolute left-4 top-2/4"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                  />
                </svg>
              </IconButton>
            )}
            nextArrow={({ handleNext }) => (
              <IconButton
                variant="text"
                color="white"
                size="lg"
                onClick={handleNext}
                className="-translate-y-2/4 !absolute !right-4 top-2/4"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  />
                </svg>
              </IconButton>
            )}
          >
            <img
              loading="lazy"
              src="/sales.jpg"
              alt="image 1"
              className="h-full w-full object-cover"
            />
            <img
              loading="lazy"
              src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80"
              alt="image 2"
              className="h-full w-full object-cover"
            />
            <img
              loading="lazy"
              src="https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80"
              alt="image 3"
              className="h-full w-full object-cover"
            />
          </Carousel>
        </div>
      </div>
      <div className="md:mt-40">
        <div className="flex flex-row">
          <span className="d-block bg-main rounded w-6"></span>
          <h1 className="text-4xl text-main ml-2.5  font-mainFont">Today's</h1>
        </div>
        <div className="flex flex-col text-4xl items-center md:flex-row md:gap-10 mt-2.5">
          <h1 className="font-bold">Flash Sales</h1>
          <div className="flex flex-col justify-between grow items-center md:flex-row">
            <div className="p-4 rounded-lg text-2xl text-center w-72 font-bold">
              <div className="flex justify-between text-sm">
                <span>Days</span>
                <span>Hours</span>
                <span>Minutes</span>
                <span>Seconds</span>{" "}
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
        <div className="w-full mx-auto relative">
          {/* Scrollable Product Container */}
          <div
            ref={scrollContainer}
            className="flex p-4 overflow-x-auto scroll-smooth scrollbar-hide space-x-4"
          >
            {Array.from({ length: 10 }).map((_, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-lg  text-center  min-w-[16em] group hover:cursor-pointer "
              >
                <div className="w-full bg-sec h-64  relative">
                  <span className="absolute top-2 left-4 bg-main text-white rounded-md w-[55px] h-[26px] text-sm flex items-center justify-center">
                    -35%
                  </span>
                  <div className="absolute top-2 gap-2 right-4 flex justify-center items-center flex-col">
                    <button className="  rounded-full z-10">
                      <FaHeart className="text-xl transition-transform hover:scale-110 hover:fill-red-500" />
                    </button>

                    <button className="   rounded-full z-10">
                      <IoMdEye className="text-2xl hover:scale-110 " />
                    </button>
                  </div>
                  <div className="h-[100%] flex items-center justify-center reltaive ">
                    <img
                      loading="lazy"
                      src="./controller.png"
                      alt={`Product ${index + 1}`}
                      className=" rounded-md   object-contain"
                    />
                    <button className="absolute bottom-0 w-full bg-black text-white py-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <p>Add to Cart</p>
                    </button>
                  </div>
                </div>
                <div className="flex flex-col gap-2 items-start">
                  <p className="">HAVIT HV-G92 Gamepad</p>
                  <div className="flex gap-3">
                    <p className="text-main">150$</p>
                    <p className="text-gray-400 line-through">180$</p>
                  </div>
                  <div className="flex flex-row-reverse text-gray-400 font-bold items-center">
                    ({rated})
                    <Rating
                      unratedColor="gray"
                      value={4}
                      ratedColor="amber"
                      onChange={(value) => setRated(value)}
                      className="mr-2"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <FaArrowUp
            className="fixed right-14 bottom-7 bg-[#f5f5f5] text-black  text-4xl p-2 rounded-full cursor-pointer hover:bg-gray-700 transition"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          />

          <div className="flex justify-center mb-2 mt-4">
            <Link to="/product">
              <Button className="bg-main px-12 py-5">View All Products</Button>
            </Link>
          </div>
        </div>
        <div className="bg-gray-300 h-[2px] w-full my-10"></div>
        <div className="flex flex-row">
          <span className="d-block bg-main rounded w-6"></span>
          <h1 className="text-4xl text-main ml-2.5">Categories</h1>
        </div>
        <div className="flex flex-col text-4xl items-center md:flex-row md:gap-10 mt-2.5">
          <h1 className="font-bold">Browse By Category</h1>
          <div className="flex flex-col justify-between grow items-center md:flex-row">
            <div className="p-4 rounded-lg text-2xl text-center w-72 font-bold"></div>
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
      </div>
      <div className="bg-gray-300 h-[2px] w-full my-10"></div>
      <div className="flex flex-row">
        <span className="d-block bg-main rounded w-6"></span>
        <h1 className="text-4xl text-main ml-2.5">This Month</h1>
      </div>
      <div className="flex flex-col text-4xl items-center md:flex-row md:gap-10 mt-2.5">
        <h1 className="font-bold">Best Selling Products</h1>
        <div className="flex flex-col justify-between grow items-center md:flex-row">
          <div className="p-4 rounded-lg text-2xl text-center w-72 font-bold"></div>
          <div className="flex flex-row gap-5 items-center"></div>
        </div>
      </div>
      <div
        ref={scrollContainer}
        className="flex p-4 overflow-x-auto scroll-smooth scrollbar-hide space-x-4"
      >
        {Array.from({ length: 10 }).map((_, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-lg  text-center  min-w-[16em] group hover:cursor-pointer "
          >
            <div className="w-full bg-sec h-64  relative">
              <span className="absolute top-2 left-4 bg-main text-white rounded-md w-[55px] h-[26px] text-sm flex items-center justify-center">
                -35%
              </span>
              <div className="absolute top-2 gap-2 right-4 flex justify-center items-center flex-col">
                <button className="  rounded-full z-10">
                  <FaHeart className="text-xl transition-transform hover:scale-110 hover:fill-red-500" />
                </button>

                <button className="   rounded-full z-10">
                  <IoMdEye className="text-2xl hover:scale-110 " />
                </button>
              </div>
              <div className="h-[100%] flex items-center justify-center reltaive ">
                <img
                  loading="lazy"
                  src="./controller.png"
                  alt={`Product ${index + 1}`}
                  className=" rounded-md   object-contain"
                />
                <button className="absolute bottom-0 w-full bg-black text-white py-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <p>Add to Cart</p>
                </button>
              </div>
            </div>
            <div className="flex flex-col gap-2 items-start">
              <p className="">HAVIT HV-G92 Gamepad</p>
              <div className="flex gap-3">
                <p className="text-main">150$</p>
                <p className="text-gray-400 line-through">180$</p>
              </div>
              <div className="flex flex-row-reverse text-gray-400 font-bold items-center">
                ({rated})
                <Rating
                  unratedColor="gray"
                  value={4}
                  ratedColor="amber"
                  onChange={(value) => setRated(value)}
                  className="mr-2"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mb-2 mt-4">
        <Link to="/product">
          <Button className="bg-main px-12 py-5">View All Products</Button>
        </Link>
      </div>

      <div className="mt-20">
        <img src="/ad.png" alt="" loading="lazy" />
      </div>

      <div className="flex flex-row mt-10">
        <span className="d-block bg-main rounded w-6"></span>
        <h1 className="text-4xl text-main ml-2.5">Our Products</h1>
      </div>
      <div className="flex flex-col text-4xl items-center md:flex-row md:gap-10 mt-2.5">
        <h1 className="font-bold">Explore Our Products</h1>
        <div className="flex flex-col justify-between grow items-center md:flex-row">
          <div className="p-4 rounded-lg text-2xl text-center w-72 font-bold"></div>
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
      <div
        ref={scrollContainer}
        className="flex p-4 flex-wrap justify-center md:justify-normal gap-4 md:gap-0 scroll-smooth scrollbar-hide space-x-4"
      >
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-lg  text-center  min-w-[23%] group hover:cursor-pointer "
          >
            <div className="w-full bg-sec h-64  relative">
              <span className="absolute top-2 left-4 bg-main text-white rounded-md w-[55px] h-[26px] text-sm flex items-center justify-center">
                -35%
              </span>
              <div className="absolute top-2 gap-2 right-4 flex justify-center items-center flex-col">
                <button className="  rounded-full z-10">
                  <FaHeart className="text-xl transition-transform hover:scale-110 hover:fill-red-500" />
                </button>

                <button className="   rounded-full z-10">
                  <IoMdEye className="text-2xl hover:scale-110 " />
                </button>
              </div>
              <div className="h-[100%] flex items-center justify-center reltaive ">
                <img
                  loading="lazy"
                  src="./controller.png"
                  alt={`Product ${index + 1}`}
                  className=" rounded-md   object-contain"
                />
                <button className="absolute bottom-0 w-full bg-black text-white py-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <p>Add to Cart</p>
                </button>
              </div>
            </div>
            <div className="flex flex-col gap-2 items-start">
              <p className="">HAVIT HV-G92 Gamepad</p>
              <div className="flex gap-3">
                <p className="text-main">150$</p>
                <p className="text-gray-400 line-through">180$</p>
              </div>
              <div className="flex flex-row-reverse text-gray-400 font-bold items-center">
                ({rated})
                <Rating
                  unratedColor="gray"
                  value={4}
                  ratedColor="amber"
                  onChange={(value) => setRated(value)}
                  className="mr-2"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mb-2 mt-4">
        <Link to="/product">
          <Button className="bg-main px-12 py-5">View All Products</Button>
        </Link>
      </div>
      <div className="flex flex-row mt-10">
        <span className="d-block bg-main rounded w-6"></span>
        <h1 className="text-4xl text-main ml-2.5">Featured</h1>
      </div>
      <div className="flex flex-col text-4xl items-center md:flex-row md:gap-10 mt-2.5">
        <h1 className="font-bold">New Arrival</h1>
        <div className="flex flex-col justify-between grow items-center md:flex-row">
          <div className="p-4 rounded-lg text-2xl text-center w-72 font-bold"></div>
        </div>
      </div>
      {/* grid gallary */}
      <div className=" mx-auto py-6">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-4">
          {/* PlayStation 5 - Larger item spanning two rows */}
          <div className="col-span-2 md:col-span-6 md:row-span-2 relative group bg-black flex items-end">
            <img
              src="/ps5.png"
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
              src="/women.png"
              alt="Women's Collections"
              className="object-cover w-full"
            />
            <div className="absolute inset-0  flex flex-col justify-end p-4 text-white items-start gap-5">
              <h2 className="text-2xl font-bold">Women's Collections</h2>
              <p className="text-sm mb-2">
                Featured woman collections that give you another vibe
              </p>
              <button className="bg-white text-black px-3 py-2 rounded text-sm hover:bg-gray-200">
                Shop Now
              </button>
            </div>
          </div>

          {/* Speakers */}
          <div className="col-span-2 md:col-span-3 relative group bg-black">
            <img
              src="/speakers.png"
              alt="Speakers"
              className=" object-contain scale-[1.4]"
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
              src="/perfume.png"
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

      <div className="flex  justify-evenly my-20 flex-col md:flex-row gap-10 md:gap-0">
        <div className="flex flex-col items-center gap-2 relative">
          <p className="absolute w-16 h-16 bg-[#c1c1c1] rounded-full -top-2 -z-10"></p>
          <FaShippingFast className="bg-[#2F2E30] text-white text-5xl rounded-full p-4 mb-2" />
          <p className="text-xl font-bold">FREE AND FAST DELIVERY</p>
          <p className="text-sm font-light">
            Free delivery for all orders over $140
          </p>
        </div>
        <div className="flex flex-col items-center gap-2 relative">
          <p className="absolute w-16 h-16 bg-[#c1c1c1] rounded-full -top-2 -z-10"></p>
          <FaHeadset className="bg-[#2F2E30] text-white text-5xl rounded-full p-4 mb-2" />
          <p className="text-xl font-bold">24/7 CUSTOMER SERVICE</p>
          <p className="text-sm font-light">Friendly 24/7 customer support</p>
        </div>
        <div className="flex flex-col items-center gap-2 relative">
          <p className="absolute w-16 h-16 bg-[#c1c1c1] rounded-full -top-2 -z-10"></p>
          <SiAdguard className="bg-[#2F2E30] text-white text-5xl rounded-full p-4 mb-2" />
          <p className="text-xl font-bold">MONEY BACK GUARANTEE</p>
          <p className="text-sm font-light">We reurn money within 30 days</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
