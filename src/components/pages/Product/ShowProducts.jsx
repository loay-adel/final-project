import React from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from '@material-tailwind/react';
import { FaShoppingCart, FaEye } from 'react-icons/fa';

const ShowProducts = ({ products, handleAddToCart ,category}) => {


  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold">
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </h2>
        <p className="text-gray-600">Explore our top picks for you</p>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-16">
          <Typography variant="h5" color="gray">
            No products found in this category.
          </Typography>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <Card key={index} className="w-full shadow-md">
              <CardHeader floated={false} className="h-48">
                <img
                  src={product.image}
                  alt={product.title}
                  className="h-full w-full object-cover"
                />
              </CardHeader>
              <CardBody>
                <Typography variant="h6" className="font-bold mb-2">
                  {product.title}
                </Typography>
                <Typography className="text-sm text-gray-600 mb-3">
                  {product.description}
                </Typography>
                <Typography color="blue" className="font-semibold">
                  {product.price || 95} EGP
                </Typography>
              </CardBody>
              <CardFooter className="flex flex-col gap-2">
                <Button onClick={() => handleAddToCart(product)} fullWidth>
                  <FaShoppingCart className="mr-2" />
                  Add to Cart
                </Button>
                <Link to={`/show-products/${category}/${product.title}`}>
                <Button
                  variant="outlined"
                  onClick={() => viewProductDetails(product.title)}
                  fullWidth
                >
                  <FaEye className="mr-2" />
                  View Details
                </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ShowProducts;
