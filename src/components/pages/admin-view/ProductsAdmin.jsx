import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const ProductsAdmin = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editProductId, setEditProductId] = useState(null);
  const [newProduct, setNewProduct] = useState({
    title: "",
    price: "",
    description: "",
    image: "",
    discountPercentage: "",
    rating: "",
    availableQuantity: "",
    tags: [],
  });

  // Fetch products from the backend
  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.categories["Groceries & Pets"]);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch products:", err);
        setLoading(false);
      });
  }, []);

  // Delete product function with confirmation
  const deleteProduct = (productId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this action!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // Perform the delete action (fake it for now)
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product.id !== productId)
        );
        Swal.fire("Deleted!", "Your product has been deleted.", "success");
      }
    });
  };

  // Edit product function with a form
  const startEditProduct = (product) => {
    setIsEditing(true);
    setEditProductId(product.id);
    setNewProduct({
      title: product.title,
      price: product.price,
      description: product.description,
      image: product.image,
      discountPercentage: product.discountPercentage,
      rating: product.rating,
      availableQuantity: product.availableQuantity,
      tags: product.tags,
    });
  };

  // Update product function
  const updateProduct = () => {
    if (!newProduct.title || !newProduct.price) {
      Swal.fire("Error", "Please fill in all fields", "error");
      return;
    }
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === editProductId ? { ...product, ...newProduct } : product
      )
    );
    setIsEditing(false);
    setEditProductId(null);
    Swal.fire("Updated!", "The product has been updated.", "success");
  };

  // Add new product function
  const addProduct = () => {
    if (!newProduct.title || !newProduct.price) {
      Swal.fire("Error", "Please fill in all fields", "error");
      return;
    }
    const newProductData = {
      id: `gp${Date.now()}`,
      ...newProduct,
    };
    setProducts((prevProducts) => [...prevProducts, newProductData]);
    setNewProduct({
      title: "",
      price: "",
      description: "",
      image: "",
      discountPercentage: "",
      rating: "",
      availableQuantity: "",
      tags: [],
    });
    Swal.fire("Added!", "New product has been added.", "success");
  };

  if (loading) {
    return <p className="text-gray-600">Loading products...</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">
        Manage Products
      </h2>

      {/* Add New Product Form */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <h3 className="text-xl text-gray-700 mb-4">Add New Product</h3>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Product Title"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={newProduct.title}
            onChange={(e) =>
              setNewProduct({ ...newProduct, title: e.target.value })
            }
          />
          <input
            type="number"
            placeholder="Product Price"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={newProduct.price}
            onChange={(e) =>
              setNewProduct({ ...newProduct, price: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Product Description"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={newProduct.description}
            onChange={(e) =>
              setNewProduct({ ...newProduct, description: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Product Image URL"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={newProduct.image}
            onChange={(e) =>
              setNewProduct({ ...newProduct, image: e.target.value })
            }
          />
          <input
            type="number"
            placeholder="Discount Percentage"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={newProduct.discountPercentage}
            onChange={(e) =>
              setNewProduct({
                ...newProduct,
                discountPercentage: e.target.value,
              })
            }
          />
          <input
            type="number"
            placeholder="Rating"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={newProduct.rating}
            onChange={(e) =>
              setNewProduct({ ...newProduct, rating: e.target.value })
            }
          />
          <input
            type="number"
            placeholder="Available Quantity"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={newProduct.availableQuantity}
            onChange={(e) =>
              setNewProduct({
                ...newProduct,
                availableQuantity: e.target.value,
              })
            }
          />
          <input
            type="text"
            placeholder="Tags (comma-separated)"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={newProduct.tags.join(", ")}
            onChange={(e) =>
              setNewProduct({
                ...newProduct,
                tags: e.target.value.split(",").map((tag) => tag.trim()),
              })
            }
          />
          <button
            onClick={addProduct}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg"
          >
            Add Product
          </button>
        </div>
      </div>

      {/* Editing Product */}
      {isEditing && (
        <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
          <h3 className="text-xl text-gray-700 mb-4">Edit Product</h3>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Product Title"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={newProduct.title}
              onChange={(e) =>
                setNewProduct({ ...newProduct, title: e.target.value })
              }
            />
            <input
              type="number"
              placeholder="Product Price"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Product Description"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={newProduct.description}
              onChange={(e) =>
                setNewProduct({ ...newProduct, description: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Product Image URL"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={newProduct.image}
              onChange={(e) =>
                setNewProduct({ ...newProduct, image: e.target.value })
              }
            />
            <input
              type="number"
              placeholder="Discount Percentage"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={newProduct.discountPercentage}
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  discountPercentage: e.target.value,
                })
              }
            />
            <input
              type="number"
              placeholder="Rating"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={newProduct.rating}
              onChange={(e) =>
                setNewProduct({ ...newProduct, rating: e.target.value })
              }
            />
            <input
              type="number"
              placeholder="Available Quantity"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={newProduct.availableQuantity}
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  availableQuantity: e.target.value,
                })
              }
            />
            <input
              type="text"
              placeholder="Tags (comma-separated)"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={newProduct.tags.join(", ")}
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  tags: e.target.value.split(",").map((tag) => tag.trim()),
                })
              }
            />
            <button
              onClick={updateProduct}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg"
            >
              Update Product
            </button>
          </div>
        </div>
      )}

      {/* Displaying Products */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white shadow-md rounded-lg p-4">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-40 object-cover rounded-md mb-4"
            />
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              {product.title}
            </h3>
            <p className="text-gray-600 text-sm mb-2">{product.description}</p>
            <p className="text-gray-700 font-semibold">{product.price}$</p>
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-yellow-400">{product.rating}⭐</span>
              <span className="text-gray-500 text-sm">
                ({product.availableQuantity} in stock)
              </span>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => startEditProduct(product)}
                className="text-blue-500 hover:underline"
              >
                Edit
              </button>
              <button
                onClick={() => deleteProduct(product.id)}
                className="text-red-500 hover:underline"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsAdmin;
