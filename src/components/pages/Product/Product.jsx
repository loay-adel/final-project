import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { CartContext } from "../../../context/CartContext";
import ShowProduct from "./ShowProduct";
import ShowProducts from "./ShowProducts";
const Product = () => {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState(null); 
  const { category, name } = useParams();
  const { addToCart } = useContext(CartContext);
  useEffect(() => {
    axios
      .get(`https://inquisitive-wise-story.glitch.me/db.json`)
      .then((res) => {
        const formattedCategory = category[0].toUpperCase() + category.slice(1);
        const categoryProducts = res.data.categories[formattedCategory];
        if (categoryProducts) {
          if (name) {
            const singleProduct = categoryProducts.find((item) => item.title === name);
            setProduct(singleProduct);
          } else {
            setProducts(categoryProducts);
          }
        }
      })
      .catch((e) => console.log(e));
  }, [category, name]);

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
      {name ? (
        <ShowProduct product={product} handleAddToCart={handleAddToCart} />
      ) : (
        <ShowProducts products={products} handleAddToCart={handleAddToCart} category={category} />
      )}
    </div>
  );
};

export default Product;
