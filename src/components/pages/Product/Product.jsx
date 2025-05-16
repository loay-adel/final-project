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
  const [allProduct, setAllProduct] = useState([]);

  const { category, id } = useParams();
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_URL}/products`)
      .then((res) => {
        if (res.data != null) {
          let filteredProducts = res.data;

          if (category) {
            filteredProducts = filteredProducts.filter(
              (product) => product.category === category
            );
          }

          if (id) {
            const productById = filteredProducts.find(
              (product) => product._id === id
            );
            if (productById) {
              setProduct(productById);
            }
          }

          setAllProduct(res.data);
          setProducts(filteredProducts);
        }
      })
      .catch((e) => console.log(e));
  }, [category, id]);

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
      {id ? (
        <ShowProduct product={product} handleAddToCart={handleAddToCart} />
      ) : category ? (
        <ShowProducts
          products={products}
          handleAddToCart={handleAddToCart}
          category={category}
        />
      ) : (
        <ShowProducts
          products={allProduct}
          handleAddToCart={handleAddToCart}
          category={category}
        />
      )}
    </div>
  );
};

export default Product;
