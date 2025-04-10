import React, { useState, useContext } from 'react';
import { Button } from '@material-tailwind/react';
import { CartContext } from "../../../context/CartContext";

const ShowProduct = ({ product,handleAddToCart }) => {
  const { addToCart } = useContext(CartContext);
  const [quantity, setQuantity] = useState(1);

  const increaseQty = () => {
    if (quantity < product.availableQuantity) {
      setQuantity(prev => prev + 1);
    }
  };

  const decreaseQty = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };


  if (!product) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 bg-white rounded-xl overflow-hidden max-w-5xl mx-auto my-8 shadow-lg'>
   <div className='relative bg-gray-50 flex items-center justify-center p-8'>
      {product.availableQuantity <= 5 && (
        <span className='absolute top-4 right-4 bg-red-100 text-red-800 text-xs font-bold px-3 py-1 rounded-full'>
          Only {product.availableQuantity} left!
        </span>
      )}
      <img 
        src={product.image} 
        alt={product.title} 
        className="w-full max-w-md h-auto object-contain aspect-square" 
      />
    </div>
  
    <div className='flex flex-col p-8'>
      <h1 className='text-3xl font-bold mb-4 text-gray-800'>{product.title}</h1>
  
      <div className='mb-6'>
        <p className="text-gray-600 mb-4">
          <span className="font-semibold text-gray-800">Description:</span> {product.description}
        </p>
        
        <div className='flex items-center gap-4 mb-2'>
          <span className="text-2xl font-bold text-blue-600">
            {product.price || 95} EGP
          </span>
          <span className={`text-sm px-2 py-1 rounded-full ${
            product.availableQuantity > 5 
              ? 'bg-green-100 text-green-800' 
              : 'bg-orange-100 text-orange-800'
          }`}>
            {product.availableQuantity > 5 ? 'In Stock' : 'Low Stock'}
          </span>
        </div>
        <p className="text-sm text-gray-500">
          {product.availableQuantity} available
        </p>
      </div>
  
      {/* Quantity Selector */}
      <div className="flex items-center justify-between mb-8 bg-gray-50 p-3 rounded-lg">
        <span className="text-gray-700 font-medium">Quantity:</span>
        <div className="flex items-center gap-3">
          <Button 
            onClick={decreaseQty} 
            disabled={quantity <= 1}
            className='!p-2 !min-w-0 !rounded-full !bg-gray-200 hover:!bg-gray-300 !text-gray-800'
            ripple={false}
          >
            -
          </Button>
          <span className="text-lg font-bold w-8 text-center">{quantity}</span>
          <Button 
            onClick={increaseQty} 
            disabled={quantity >= product.availableQuantity}
            className='!p-2 !min-w-0 !rounded-full !bg-gray-200 hover:!bg-gray-300 !text-gray-800'
            ripple={false}
          >
            +
          </Button>
        </div>
      </div>
  
      <Button 
        onClick={handleAddToCart}
        disabled={product.availableQuantity === 0}
        className={`w-full py-3 rounded-lg font-medium ${
          product.availableQuantity === 0
            ? '!bg-gray-400 cursor-not-allowed'
            : '!bg-blue-600 hover:!bg-blue-700'
        }`}
        fullWidth
      >
        {product.availableQuantity === 0 ? "Out of Stock" : "Add to Cart"}
      </Button>
  
      {product.availableQuantity <= 10 && product.availableQuantity > 0 && (
        <p className="mt-3 text-sm text-orange-600 text-center">
          Hurry! Only {product.availableQuantity} item{product.availableQuantity > 1 ? 's' : ''} remaining
        </p>
      )}
    </div>
  </div>
  );
};

export default ShowProduct;
