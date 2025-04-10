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
    <div className='grid grid-cols-1 md:grid-cols-2 shadow-xl bg-white p-6 rounded-xl overflow-hidden max-w-[90%] mx-auto my-8'>
      <img src={product.image} alt={product.title} className="w-full h-auto object-cover rounded-md" />

      <div className='flex flex-col justify-center px-6'>
        <h1 className='text-2xl font-bold mb-4 text-center text-blue-900'>{product.title}</h1>

        <p className="mb-4 text-gray-700">
          <span className="font-semibold">Description:</span> {product.description}
        </p>

        <p className="mb-2 text-lg text-green-700 font-semibold">Price: {product.price || 95} EGP</p>
        <p className="mb-4 text-sm text-gray-500">
          Available: {product.availableQuantity} piece{product.availableQuantity > 1 ? "s" : ""}
        </p>

        <div className="flex items-center justify-center gap-4 mb-6">
          <Button onClick={decreaseQty} disabled={quantity <= 1}>-</Button>
          <span className="text-lg font-bold">{quantity}</span>
          <Button onClick={increaseQty} disabled={quantity >= product.availableQuantity}>+</Button>
        </div>

        <Button 
          onClick={handleAddToCart}
          disabled={product.availableQuantity === 0}
          className='w-full bg-blue-500 hover:bg-blue-700 text-white'
        >
          {product.availableQuantity === 0 ? "Out of Stock" : "Add to Cart"}
        </Button>
      </div>
    </div>
  );
};

export default ShowProduct;
