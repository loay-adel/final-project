import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const ProductsAdmin = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Change this to your real token or get from localStorage
  const authToken = localStorage.getItem("token") || "YOUR_BEARER_TOKEN_HERE";

  // Fixed categories list - replace or add your categories here:
  const categories = ["electronics", "men", "women", "food", "furniture"];

  const [newProduct, setNewProduct] = useState({
    title: "",
    description: "",
    image: "",
    price: "",
    discountPercentage: "",
    availableQuantity: "",
    category: "",
    tags: [],
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_URL}/products`);
        if (!response.ok) throw new Error("Failed to fetch products");

        const data = await response.json();

        // The backend returns categories with products nested
        // Flatten all products into one array with category info added
        const allProducts = [];
        for (const category in data.categories) {
          data.categories[category].forEach((product) => {
            allProducts.push({
              ...product,
              category,
            });
          });
        }

        setProducts(allProducts);
      } catch (error) {
        console.error("Fetch error:", error);
        Swal.fire("Error", "Failed to load products", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const deleteProduct = async (productId, category) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        // Optimistic removal
        setProducts((prev) => prev.filter((p) => p.id !== productId));

        const response = await fetch(
          `${import.meta.env.VITE_URL}/products/${encodeURIComponent(
            category
          )}/${productId}`,
          { method: "DELETE" }
        );

        if (!response.ok) {
          setProducts(products); // rollback on failure
          throw new Error(`Server responded with ${response.status}`);
        }

        Swal.fire("Deleted!", "Product removed successfully", "success");
      } catch (error) {
        console.error("Delete failed:", error);
        Swal.fire("Error", `Delete failed: ${error.message}`, "error");
      }
    }
  };

  // Handle inputs and update state
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // For tags, split by comma
    if (name === "tags") {
      setNewProduct((prev) => ({
        ...prev,
        tags: value
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
      }));
    } else {
      setNewProduct((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleNumberChange = (e) => {
    const { name, value } = e.target;
    // Accept only numbers or empty string to allow deleting
    if (value === "" || !isNaN(value)) {
      setNewProduct((prev) => ({
        ...prev,
        [name]: value === "" ? "" : Number(value),
      }));
    }
  };

  const addProduct = async () => {
    if (
      !newProduct.title.trim() ||
      !newProduct.price ||
      !newProduct.category.trim()
    ) {
      return Swal.fire(
        "Error",
        "Please provide Title, Price, and select Category.",
        "error"
      );
    }

    try {
      // Prepare data as backend expects (map fields)
      const productToSend = {
        title: newProduct.title,
        description: newProduct.description,
        price: newProduct.price,
        image: newProduct.image,
        category: newProduct.category,
        discount: newProduct.discountPercentage || 0,
        availableQuantity: newProduct.availableQuantity || 0,
        tags: newProduct.tags,
      };

      // Optimistic UI update with temp ID
      const tempId = `temp_${Date.now()}`;
      const productToAdd = {
        ...newProduct,
        id: tempId,
      };
      setProducts((prev) => [...prev, productToAdd]);
      console.log("🚀 Product being sent:", productToSend);
      //${import.meta.env.VITE_URL}/products

      const response = await fetch(`http://localhost:7000/api/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(productToSend),
      });

      if (!response.ok) {
        setProducts((prev) => prev.filter((p) => p.id !== tempId)); // rollback UI
        throw new Error(`Server responded with ${response.status}`);
      }

      const result = await response.json();

      // Replace temp product with real product from server
      setProducts((prev) =>
        prev.map((p) => (p.id === tempId ? result.product : p))
      );

      // Reset form
      setNewProduct({
        title: "",
        description: "",
        image: "",
        price: "",
        discountPercentage: "",
        availableQuantity: "",
        category: "",
        tags: [],
      });

      Swal.fire("Added!", "Product added successfully.", "success");
    } catch (error) {
      console.error("Add failed:", error);
      Swal.fire("Error", `Add failed: ${error.message}`, "error");
    }
  };

  if (loading) {
    return <div className="p-4 text-center">Loading products...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Product Management</h1>

      {/* Add New Product Form */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-10 max-w-4xl mx-auto">
        <h2 className="text-xl font-semibold mb-4">Add New Product</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left inputs */}
          <div className="space-y-4">
            <div>
              <label className="block font-medium mb-1" htmlFor="category">
                Category*
              </label>
              <select
                id="category"
                name="category"
                value={newProduct.category}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              >
                <option value="">-- Select Category --</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-medium mb-1" htmlFor="title">
                Title*
              </label>
              <input
                id="title"
                name="title"
                type="text"
                value={newProduct.title}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div>
              <label className="block font-medium mb-1" htmlFor="price">
                Price* (number)
              </label>
              <input
                id="price"
                name="price"
                type="number"
                min="0"
                step="0.01"
                value={newProduct.price}
                onChange={handleNumberChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div>
              <label
                className="block font-medium mb-1"
                htmlFor="availableQuantity"
              >
                Available Quantity (number)
              </label>
              <input
                id="availableQuantity"
                name="availableQuantity"
                type="number"
                min="0"
                value={newProduct.availableQuantity}
                onChange={handleNumberChange}
                className="w-full p-2 border rounded"
              />
            </div>
          </div>

          {/* Right inputs */}
          <div className="space-y-4">
            <div>
              <label className="block font-medium mb-1" htmlFor="description">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows="4"
                value={newProduct.description}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label className="block font-medium mb-1" htmlFor="image">
                Image URL
              </label>
              <input
                id="image"
                name="image"
                type="text"
                value={newProduct.image}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label
                className="block font-medium mb-1"
                htmlFor="discountPercentage"
              >
                Discount Percentage (number)
              </label>
              <input
                id="discountPercentage"
                name="discountPercentage"
                type="number"
                min="0"
                max="100"
                step="0.01"
                value={newProduct.discountPercentage}
                onChange={handleNumberChange}
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label className="block font-medium mb-1" htmlFor="tags">
                Tags (comma separated)
              </label>
              <input
                id="tags"
                name="tags"
                type="text"
                value={newProduct.tags.join(", ")}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
            </div>
          </div>
        </div>
        <div className="mt-6">
          <button
            onClick={addProduct}
            className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Add Product
          </button>
        </div>
      </div>

      {/* Products Table */}
      <div className="overflow-x-auto max-w-6xl mx-auto">
        <table className="min-w-full bg-white rounded-lg shadow-md">
          <thead>
            <tr>
              <th className="py-3 px-4 border-b text-left">Category</th>
              <th className="py-3 px-4 border-b text-left">Title</th>
              <th className="py-3 px-4 border-b text-left">Price</th>
              <th className="py-3 px-4 border-b text-left">Stock</th>
              <th className="py-3 px-4 border-b text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="py-4 px-6 text-center text-gray-500 italic"
                >
                  No products found.
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr key={product._id}>
                  <td className="py-2 px-4 border-b capitalize">
                    {product.category}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {product.title || product.name}
                  </td>
                  <td className="py-2 px-4 border-b">${product.price}</td>
                  <td className="py-2 px-4 border-b">
                    {product.availableQuantity || product.stock || 0}
                  </td>
                  <td className="py-2 px-4 border-b space-x-2">
                    <button
                      onClick={() =>
                        deleteProduct(product.id, product.category)
                      }
                      className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductsAdmin;
