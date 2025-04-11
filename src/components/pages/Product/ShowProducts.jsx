import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import {
  FaBoxOpen,
  FaShoppingCart,
  FaEye,
  FaArrowLeft,
  FaCheckCircle,
} from "react-icons/fa";

const ShowProducts = ({ products, handleAddToCart, category }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </h2>
        <p className="text-gray-600 text-lg">Discover our premium collection</p>
        <div className="w-20 h-1 bg-blue-500 mx-auto mt-4 rounded-full"></div>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-16">
          <div className="inline-block p-6 bg-gray-50 rounded-full mb-4">
            <FaBoxOpen className="text-4xl text-gray-400" />
          </div>
          <Typography variant="h5" color="gray" className="mb-2">
            No products available
          </Typography>
          <Typography color="gray" className="mb-4">
            We couldn't find any products in this category
          </Typography>
          <Button color="blue" variant="outlined" className="mt-4">
            <FaArrowLeft className="mr-2" />
            Back to Categories
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.length == 0 ? (
            <h1>loading</h1>
          ) : (
            products.map((product, index) => (
              <Card
                key={index}
                className="w-full hover:shadow-xl transition-shadow duration-300 border border-gray-100"
              >
                <CardHeader floated={false} className="h-60 relative">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="h-full w-full object-cover"
                  />
                  {product.availableQuantity <= 5 && (
                    <span className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      Only {product.availableQuantity} left
                    </span>
                  )}
                </CardHeader>
                <CardBody className="pt-3 pb-1">
                  <div className="flex justify-between items-start mb-2">
                    <Typography
                      variant="h6"
                      className="font-bold text-gray-900 line-clamp-1"
                    >
                      {product.title}
                    </Typography>
                    <Typography color="blue" className="font-bold text-lg">
                      {product.price || 95} EGP
                    </Typography>
                  </div>
                  <Typography className="text-sm text-gray-600 line-clamp-2 mb-3">
                    {product.description}
                  </Typography>
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <FaCheckCircle className="mr-1 text-green-500" />
                    <span>
                      {product.availableQuantity > 5 ? "In Stock" : "Low Stock"}
                    </span>
                  </div>
                </CardBody>
                <CardFooter className="flex flex-col gap-3 pt-1">
                  <Button
                    onClick={() => handleAddToCart(product)}
                    fullWidth
                    className="flex items-center justify-center bg-blue-600 hover:bg-blue-700"
                  >
                    <FaShoppingCart className="mr-2" />
                    Add to Cart
                  </Button>
                  <Link
                    to={`/show-products/${category}/${product.title}`}
                    className="w-full"
                  >
                    <Button
                      variant="outlined"
                      fullWidth
                      className="flex items-center justify-center border-blue-600 text-blue-600 hover:bg-blue-50"
                    >
                      <FaEye className="mr-2" />
                      View Details
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default ShowProducts;
