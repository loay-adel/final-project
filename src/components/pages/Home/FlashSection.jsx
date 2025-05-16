import { List, ListItem, Card } from "@material-tailwind/react";
import { CartContext } from "../../../context/CartContext";
import {
  Carousel,
  IconButton,
  Rating,
  Typography,
  Button,
} from "@material-tailwind/react";
import { useContext } from "react";
import Swal from "sweetalert2";
import {
  FaArrowLeft,
  FaArrowRight,
  FaHeart,
  FaShippingFast,
  FaHeadset,
  FaArrowUp,
} from "react-icons/fa";
import { IoMdEye } from "react-icons/io";

import { Link } from "react-router-dom";



export default function FlashSection({timeLeft,scrollContainer,products,isInWishlist,rated}) {
 const { addToCart} = useContext(CartContext);
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
  return (
    <div>
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
                          isInWishlist(product._id)
                            ? "fill-red-500"
                            : "hover:fill-red-500"
                        }`}
                      />
                    </button>
                    <button
                      aria-label="show product"
                      className="rounded-full z-10"
                    >
                      <IoMdEye className="text-2xl hover:scale-110" />
                    </button>
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
          <Link to="/show-products">
            <Button className="bg-main px-12 py-5 capitalize">
              View All Products
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
