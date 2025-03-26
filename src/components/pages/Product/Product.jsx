import React, { useState } from "react";
import products from "../../../data";
import { useParams } from "react-router-dom";
import ShowProduct from './ShowProduct';

export function FeaturedImageGallery() {
  const data = [
    {
      imgelink: products.WomanFashion.Bags.Backpack[0].color.black.img[0],
    },
    {
      imgelink: products.WomanFashion.Bags.Backpack[0].color.black.img[1],   
    },
    {
      imgelink: products.WomanFashion.Bags.Backpack[0].color.black.img[2],
    },
    {
      imgelink: products.WomanFashion.Bags.Backpack[0].color.black.img[3],
    },
    {
      imgelink: products.WomanFashion.Bags.Backpack[0].color.black.img[4],
    },
  ];
 
  const [active, setActive] = useState(data[0].imgelink);

  return (
    <div className="grid gap-4">
      <div className="h-fit">
        <img
          className="h-[50%] w-[60%] rounded-lg object-cover object-center md:h-[480px]"
          src={active}
          alt="Havic HV G-92 Gamepad"
        />
      </div>
      <div className="grid grid-cols-5 gap-4">
        {data.map(({ imgelink }, index) => (
          <div key={index}>
            <img
              onClick={() => setActive(imgelink)}
              src={imgelink}
              className="h-20 max-w-full cursor-pointer rounded-lg object-cover object-center"
              alt={`Havic HV G-92 Gamepad - ${index + 1}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
const Product = () => {
  const { categoryName, typeOfProduct, product, id } = useParams();

  const productList = products?.[categoryName]?.[typeOfProduct]?.[product] || [];

  const selectedProduct = productList.find((p) => p.id == id);

  if (!selectedProduct) {
    return <h2 className="text-center text-red-500"></h2>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
      <FeaturedImageGallery product={selectedProduct} />
        <ShowProduct product={selectedProduct} />
      </div>
    </div>
  );
};

export default Product;