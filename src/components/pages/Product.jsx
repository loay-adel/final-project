import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { FaStar } from "react-icons/fa";
import { CartContext } from "../../context/CartContext";
import Swal from "sweetalert2";

const Product = () => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = (product) => {
    addToCart(product);
    Swal.fire({
      title: "Product Added to Cart!",
      text: `${product.title} has been successfully added to your shopping cart.`,
      icon: "success",
      draggable: true,
      confirmButtonText: "Okay",
    });
  };

  useEffect(() => {
    axios.get(`https://dummyjson.com/products`)
      .then((res) => setProducts(res.data.products))
      .catch((e) => console.log(e));
  }, []);

  return (
    <div className="row flex flex-wrap">
      {products.map((p) => (
        <div className="w-1/6 px-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5" key={p.id}>
          <div className="product py-4">
            <img src={p.images[0]} alt={p.category} className="h-40 w-full object-cover rounded-md" />
            <span className='block font-light text-green-600'>{p.category}</span>
            <h3 className='text-lg font-normal text-gray-800 mb-4'>{p.title.split(" ").slice(0, 2).join(" ")}</h3>
            <div className='flex justify-between items-center'>
              <span>{p.price} EGP</span>
              <span>{p.rating} <FaStar className="text-yellow-400" /></span>
            </div>
            <button onClick={() => handleAddToCart(p)} className='btn cursor-pointer my-2'>Add to Cart</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Product;
