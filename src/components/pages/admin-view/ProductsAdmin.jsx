import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const ProductsAdmin = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editProductId, setEditProductId] = useState(null);
  const [newProduct, setNewProduct] = useState({
    title: "",
    description: "",
    image: "",
    price: "",
    discountPercentage: "",
    rating: "",
    availableQuantity: "",
    thumbnail: "",
    images: [],
    tags: [],
    category: "",
  });

  // Fetch all products and transform the nested structure
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_URL}/products`);
        if (!response.ok) throw new Error("Failed to fetch products");

        const data = await response.json();

        // Transform categories object into flat array
        const allProducts = [];
        for (const category in data.categories) {
          data.categories[category].forEach((product) => {
            allProducts.push({
              ...product,
              category: category, // Add category to each product
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

  // Delete product with confirmation
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
        // Optimistic update
        setProducts((prev) => prev.filter((p) => p.id !== productId));

        const response = await fetch(
          `${import.meta.env.VITE_URL}/products/${encodeURIComponent(
            category
          )}/${productId}`,
          { method: "DELETE" }
        );

        if (!response.ok) {
          // Revert if API fails
          setProducts(products);
          throw new Error(`Server responded with ${response.status}`);
        }

        Swal.fire("Deleted!", "Product removed successfully", "success");
      } catch (error) {
        console.error("Delete failed:", error);
        Swal.fire("Error", `Delete failed: ${error.message}`, "error");
      }
    }
  };

  // Start editing a product
  const startEditProduct = (product) => {
    setIsEditing(true);
    setEditProductId(product.id);
    setNewProduct({
      title: product.title,
      description: product.description,
      image: product.image,
      price: product.price,
      discountPercentage: product.discountPercentage,
      rating: product.rating,
      availableQuantity: product.availableQuantity,
      thumbnail: product.thumbnail,
      images: product.images || [],
      tags: product.tags || [],
      category: product.category,
    });
  };

  // Update product
  const updateProduct = async () => {
    if (!newProduct.title || !newProduct.price || !newProduct.category) {
      return Swal.fire(
        "Error",
        "Title, price and category are required",
        "error"
      );
    }

    try {
      // Optimistic update
      setProducts((prev) =>
        prev.map((p) => (p.id === editProductId ? { ...p, ...newProduct } : p))
      );

      const response = await fetch(
        `${import.meta.env.VITE_URL}/products/${encodeURIComponent(
          newProduct.category
        )}/${editProductId}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newProduct),
        }
      );

      if (!response.ok) {
        // Revert if API fails
        setProducts(products);
        throw new Error(`Server responded with ${response.status}`);
      }

      const updatedProduct = await response.json();

      // Ensure UI matches server response
      setProducts((prev) =>
        prev.map((p) =>
          p.id === editProductId ? { ...p, ...updatedProduct } : p
        )
      );

      setIsEditing(false);
      setEditProductId(null);
      Swal.fire("Updated!", "Product updated successfully", "success");
    } catch (error) {
      console.error("Update failed:", {
        error: error.message,
        productId: editProductId,
        attemptedData: newProduct,
      });
      Swal.fire("Error", `Update failed: ${error.message}`, "error");
    }
  };

  // Add new product
  const addProduct = async () => {
    if (!newProduct.title || !newProduct.price || !newProduct.category) {
      return Swal.fire(
        "Error",
        "Title, price and category are required",
        "error"
      );
    }

    try {
      const tempId = `temp_${Date.now()}`;
      const productToAdd = { ...newProduct, id: tempId };

      // Optimistic update
      setProducts((prev) => [...prev, productToAdd]);

      const response = await fetch(
        `${import.meta.env.VITE_URL}/products/${encodeURIComponent(
          newProduct.category
        )}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newProduct),
        }
      );

      if (!response.ok) {
        // Revert if API fails
        setProducts(products);
        throw new Error(`Server responded with ${response.status}`);
      }

      const createdProduct = await response.json();

      // Replace temporary ID with server-generated ID
      setProducts((prev) =>
        prev.map((p) => (p.id === tempId ? createdProduct : p))
      );

      // Reset form
      setNewProduct({
        title: "",
        description: "",
        image: "",
        price: "",
        discountPercentage: "",
        rating: "",
        availableQuantity: "",
        thumbnail: "",
        images: [],
        tags: [],
        category: "",
      });

      Swal.fire("Added!", "New product created", "success");
    } catch (error) {
      console.error("Add failed:", error);
      Swal.fire("Error", `Add failed: ${error.message}`, "error");
    }
  };

  // Input handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({
      ...prev,
      [name]:
        name === "tags" ? value.split(",").map((tag) => tag.trim()) : value,
    }));
  };

  const handleNumberChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({
      ...prev,
      [name]: isNaN(value) ? value : Number(value),
    }));
  };

  if (loading)
    return <div className="p-4 text-center">Loading products...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-xl sm:text-3xl font-bold mb-8">Product Management</h1>

      {/* Add/Edit Form */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">
          {isEditing ? "Edit Product" : "Add New Product"}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Category*
              </label>
              <select
                name="category"
                value={newProduct.category}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
                required
              >
                <option value="">Select Category</option>
                {Array.from(new Set(products.map((p) => p.category))).map(
                  (cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  )
                )}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Title*</label>
              <input
                type="text"
                name="title"
                value={newProduct.title}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Price*</label>
              <input
                type="number"
                name="price"
                value={newProduct.price}
                onChange={handleNumberChange}
                className="w-full p-2 border rounded-md"
                step="0.01"
                min="0"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Stock*</label>
              <input
                type="number"
                name="availableQuantity"
                value={newProduct.availableQuantity}
                onChange={handleNumberChange}
                className="w-full p-2 border rounded-md"
                min="0"
                required
              />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={newProduct.description}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md h-32"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Image URL
              </label>
              <input
                type="url"
                name="image"
                value={newProduct.image}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Tags</label>
              <input
                type="text"
                name="tags"
                value={newProduct.tags.join(", ")}
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    tags: e.target.value.split(",").map((tag) => tag.trim()),
                  })
                }
                className="w-full p-2 border rounded-md"
                placeholder="tag1, tag2, tag3"
              />
            </div>
          </div>
        </div>

        <div className="mt-6 flex gap-4">
          {isEditing ? (
            <>
              <button
                onClick={updateProduct}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
              >
                Update Product
              </button>
              <button
                onClick={() => {
                  setIsEditing(false);
                  setEditProductId(null);
                  setNewProduct({
                    title: "",
                    description: "",
                    image: "",
                    price: "",
                    discountPercentage: "",
                    rating: "",
                    availableQuantity: "",
                    thumbnail: "",
                    images: [],
                    tags: [],
                    category: "",
                  });
                }}
                className="px-6 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={addProduct}
              className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
            >
              Add Product
            </button>
          )}
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
          >
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-48 object-cover"
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/300?text=No+Image";
              }}
            />
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-2">{product.title}</h3>
              <div className="flex justify-between items-center mb-2">
                <span className="text-blue-600 font-bold">
                  ${product.price.toFixed(2)}
                </span>
                <span className="text-sm bg-gray-100 px-2 py-1 rounded">
                  {product.category}
                </span>
              </div>
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                {product.description}
              </p>
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <span className="text-yellow-500">★ {product.rating}</span>
                  <span className="text-gray-500">•</span>
                  <span className="text-gray-600">
                    {product.availableQuantity} in stock
                  </span>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => startEditProduct(product)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteProduct(product.id, product.category)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsAdmin;
