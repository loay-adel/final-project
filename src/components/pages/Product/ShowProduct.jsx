import React, { useState } from "react";

export function FeaturedImageGallery({ images }) {
  const [active, setActive] = useState(images?.[0] || "");

  return (
    <div className="grid gap-4">
      {active && (
        <div>
          <img
            className="h-auto w-full max-w-full rounded-lg object-cover object-center md:h-[480px]"
            src={active}
            alt="Main Product"
          />
        </div>
      )}
      <div className="grid grid-cols-5 gap-4">
        {images?.map((img, index) => (
          <div key={index}>
            <img
              onClick={() => setActive(img)}
              src={img}
              className="h-20 max-w-full cursor-pointer rounded-lg object-cover object-center"
              alt={`Gallery Image ${index}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

const ShowProduct = ({ product, color }) => {
  const productImages = product?.color?.[color]?.img || [];

  return (
    <div className="text-center mt-4">
      {/* التحقق من وجود الصور قبل إرسالها */}
      {productImages.length > 0 && <FeaturedImageGallery images={productImages} />}
      <h1 className="text-lg font-bold">{product.name}</h1>
      <p className="text-gray-500">{product.brand}</p>
      <p className="text-xl font-semibold">${product.price}</p>
      <p className="text-gray-600">{product.description}</p>

      <button className="bg-red-500 text-white px-4 py-2 rounded mt-3">
        Buy Now
      </button>
    </div>
  );
};

export default ShowProduct;
