import  { useState } from "react";
import { useParams } from "react-router-dom";
import products from "../../../data";
import ShowProduct from './ShowProduct'


const Product = () => {
  const { categoryName, typeOfProduct, product,id,color } = useParams();

  console.log(categoryName+" "+typeOfProduct+ product+id+color);
  
  const productList = products?.[categoryName]?.[typeOfProduct]?.[product] || [];
  
  const selectedProduct = productList.find((p) => p.id == id);

  if (!selectedProduct) {
    return <h2 className="text-center text-red-500">Product not found</h2>;
  }
  
  return (
    <div className="container mx-auto p-4">
      <ShowProduct product={selectedProduct}
      color={color} />
    </div>
  );
};

export default Product;
