import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { CartContext } from "../../../context/CartContext";
import ShowProduct from "./ShowProduct";
import ShowProducts from "./ShowProducts";

const Product = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { category, id } = useParams();
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    setLoading(true);
    setError(null);

    const url = `${import.meta.env.VITE_API_URL}products`.replace(/\/+$/, "");

    axios
      .get(url)
      .then((res) => {
        // Handle different possible response shapes
        let productsData = [];

        if (Array.isArray(res.data)) {
          productsData = res.data;
        } else if (res.data?.products && Array.isArray(res.data.products)) {
          productsData = res.data.products;
        } else if (res.data?.data && Array.isArray(res.data.data)) {
          productsData = res.data.data;
        }

        setAllProducts(productsData);

        // Filter by category (case-insensitive)
        let temp = productsData;
        if (category) {
          const target = category.trim().toLowerCase();
          temp = productsData.filter((p) =>
            p.category?.trim?.().toLowerCase() === target
          );
        }

        setFilteredProducts(temp);

        // Single product → always search in full list
        if (id) {
          const found = productsData.find((p) => p._id === id);
          setSelectedProduct(found || null);
        }
      })
      .catch((err) => {
        console.error("Failed to load products:", err);
        setError("Could not load products. Please try again later.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [category, id]);

  const handleAddToCart = (product) => {
    if (!product) return;

    addToCart(product);

    Swal.fire({
      title: "Added to Cart!",
      text: `${product.title} has been added successfully.`,
      icon: "success",
      toast: true,
      position: "bottom-end",
      showConfirmButton: false,
      timer: 1800,
      timerProgressBar: true,
      background: "#48bb78",
      color: "white",
    });
  };

  // ────────────────────────────────────────────────
  //                  RENDER
  // ────────────────────────────────────────────────

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "100px 20px" }}>
        <div className="spinner" style={{ margin: "0 auto" }} />
        <p>Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: "center", padding: "80px 20px", color: "#e53e3e" }}>
        <h2>Oops!</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      {id ? (
        selectedProduct ? (
          <ShowProduct
            product={selectedProduct}
            handleAddToCart={handleAddToCart}
          />
        ) : (
          <div style={{ textAlign: "center", padding: "100px 20px" }}>
            <h2>Product not found</h2>
            <p>The product with ID <strong>{id}</strong> could not be found.</p>
            <a href="/products" style={{ color: "#3182ce", textDecoration: "underline" }}>
              ← Back to all products
            </a>
          </div>
        )
      ) : (
        <ShowProducts
          products={category ? filteredProducts : allProducts}
          handleAddToCart={handleAddToCart}
          category={category}
        />
      )}
    </div>
  );
};

export default Product;