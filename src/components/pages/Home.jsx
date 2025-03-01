const Home = () => {
import { List, ListItem, Card } from "@material-tailwind/react";
import {
  Carousel,
  IconButton,
  Rating,
  Typography,
  Button,
} from "@material-tailwind/react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";

const Home = () => {
  const targetDate = new Date("2025-02-28T23:59:59"); // Set your target date here
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
    <div className="container mx-auto mt-3.5">
      <div className="flex md:flex-row justify-between md:h-[50vh] mb-20 flex-col">
        <div className="w-[20%]">
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
        <div className="w-full md:w-[75%] ">
          <Carousel
            className="rounded-xl w-full"
            prevArrow={({ handlePrev }) => (
              <IconButton
                variant="text"
                color="white"
                size="lg"
                onClick={handlePrev}
                className="!absolute top-2/4 left-4 -translate-y-2/4"
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
                className="!absolute top-2/4 !right-4 -translate-y-2/4"
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
              src="/sales.jpg"
              alt="image 1"
              className="h-full w-full object-cover"
            />
            <img
              src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80"
              alt="image 2"
              className="h-full w-full object-cover"
            />
            <img
              src="https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80"
              alt="image 3"
              className="h-full w-full object-cover"
            />
          </Carousel>
        </div>
      </div>
      <div>
        <div className="flex flex-row">
          <span className="bg-main d-block w-6 rounded"></span>
          <h1 className="text-main   text-4xl ml-2.5 ">Today's</h1>
        </div>
        <div className="flex flex-col md:flex-row  text-4xl mt-2.5 items-center md:gap-10 ">
          <h1 className="font-bold">Flash Sales</h1>
          <div className="flex justify-between flex-col md:flex-row items-center grow">
            <div className="text-2xl font-bold text-center p-4  rounded-lg w-72">
              <div className="text-sm flex justify-between">
                <span>Days</span>
                <span>Hours</span>
                <span>Minutes</span>
                <span>Seconds</span>{" "}
              </div>
              <div className="flex justify-around  text-2xl font-bold w-full">
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
                className="bg-gray-300 w-8 h-8 rounded-2xl p-1.5 hover:cursor-pointer"
                onClick={() => scroll("left")}
              />
              <FaArrowRight
                className="bg-gray-300 w-8 h-8 rounded-2xl p-1.5 hover:cursor-pointer"
                onClick={() => scroll("right")}
              />
            </div>
          </div>
        </div>
        <div className="relative w-full  mx-auto">
          {/* Scrollable Product Container */}
          <div
            ref={scrollContainer}
            className="flex overflow-x-auto scroll-smooth space-x-4 p-4 scrollbar-hide"
          >
            {Array.from({ length: 10 }).map((_, index) => (
              <div
                key={index}
                className="w-60 min-w-[240px] bg-white shadow-lg rounded-lg p-4 text-center"
              >
                <img
                  src="./controller.png"
                  alt={`Product ${index + 1}`}
                  className="w-full h-32 object-cover rounded-md mb-2"
                />
                <div className="flex flex-col items-start gap-2">
                  <p className="">HAVIT HV-G92 Gamepad</p>
                  <div className="flex gap-3">
                    <p className="text-main ">150$</p>
                    <p className="line-through text-gray-400">180$</p>
                  </div>
                  <div className="flex items-center  font-bold text-gray-400 flex-row-reverse">
                    ({rated})
                    <Rating
                      value={4}
                      ratedColor="amber"
                      onChange={(value) => setRated(value)}
                      className="mr-2"
                    />
                    <Typography
                      color="red"
                      className="font-medium text-yellow-300 "
                    ></Typography>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-4 mb-2">
            <Button className="bg-main py-5 px-12">View All Products</Button>
          </div>
        </div>
        <div className="bg-gray-300 w-full h-[2px] my-10 "></div>
        <div className="flex flex-row">
          <span className="bg-main d-block w-6 rounded"></span>
          <h1 className="text-main   text-4xl ml-2.5 ">Categories</h1>
        </div>
        <div className="flex flex-col md:flex-row  text-4xl mt-2.5 items-center md:gap-10 ">
          <h1 className="font-bold">Browse By Category</h1>
          <div className="flex justify-between flex-col md:flex-row items-center grow">
            <div className="text-2xl font-bold text-center p-4  rounded-lg w-72"></div>
            <div className="flex flex-row gap-5 items-center">
              <FaArrowLeft
                className="bg-gray-300 w-8 h-8 rounded-2xl p-1.5 hover:cursor-pointer"
                onClick={() => scroll("left")}
              />
              <FaArrowRight
                className="bg-gray-300 w-8 h-8 rounded-2xl p-1.5 hover:cursor-pointer"
                onClick={() => scroll("right")}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};}

export default Home;
