import React, { useState } from "react";

const ShowProduct = ({ product }) => {
  const images = product?.color?.black?.img || [];
  const [activeImage, setActiveImage] = useState(images[0]);
  const [quantity, setQuantity] = useState(1);
  const sizes = ["XS", "S", "M", "L", "XL"];
  const [selectedSize, setSelectedSize] = useState("M");

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
   

      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold">{product.name}</h1>
        <p className="text-gray-500">{product.brand}</p>
        <p className="text-xl font-semibold">${product.price}</p>
        <p className="text-gray-600">{product.description}</p>

        <div className="flex items-center gap-3">
          <p className="font-semibold">Colours:</p>
          <div className="w-6 h-6 rounded-full bg-red-500 cursor-pointer"></div>
          <div className="w-6 h-6 rounded-full bg-gray-700 cursor-pointer"></div>
        </div>

        <div className="flex items-center gap-3">
          <p className="font-semibold">Size:</p>
          {sizes.map((size) => (
            <button
              key={size}
              className={`border px-3 py-1 rounded ${
                selectedSize === size ? "bg-red-500 text-white" : "border-gray-300"
              }`}
              onClick={() => setSelectedSize(size)}
            >
              {size}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            className="border px-3 py-1 rounded bg-gray-200"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
          >
            -
          </button>
          <p>{quantity}</p>
          <button
            className="border px-3 py-1 rounded bg-gray-200"
            onClick={() => setQuantity(quantity + 1)}
          >
            +
          </button>
        </div>

        <button className="bg-red-500 text-white px-4 py-2 rounded">Buy Now</button>

        <div className="border p-4 rounded">
          <p className="font-semibold">🚚 Free Delivery</p>
          <p className="text-gray-500 text-sm">Enter your postal code for Delivery Availability</p>
        </div>
        <div className="border p-4 rounded">
          <p className="font-semibold">🔄 Return Delivery</p>
          <p className="text-gray-500 text-sm">Free 30 Days Delivery Returns.</p>
        </div>
      </div>
    </div>
  );
};

export default ShowProduct;
