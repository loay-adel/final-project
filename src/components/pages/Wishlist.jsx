import { useEffect, useState, useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Card, Button } from "@material-tailwind/react";
import { FiTrash2, FiEye, FiShoppingCart } from "react-icons/fi";
import { CartContext } from "../../context/CartContext";
import { Link } from "react-router-dom";

const Wishlist = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [wishlistProducts, setWishlistProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useContext(CartContext);
  const APIURl = import.meta.env.VITE_URL;
  // Get current user ID from localStorage
  const getCurrentUserId = () => {
    return localStorage.getItem("userId");
  };

  // Get wishlist IDs from appropriate source
  const getWishlistIds = () => {
    if (currentUser) return currentUser.wishlist || [];
    const guestWishlist = localStorage.getItem("guestWishlist");
    return guestWishlist ? JSON.parse(guestWishlist) : [];
  };

  // Update wishlist storage
  const updateWishlistStorage = async (ids) => {
    const userId = getCurrentUserId();

    if (userId && currentUser) {
      try {
        await fetch(`${APIURl}/users/${userId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ wishlist: ids }),
        });
      } catch (error) {
        console.error("Error updating wishlist:", error);
        toast.error("Failed to update wishlist");
      }
    } else {
      localStorage.setItem("guestWishlist", JSON.stringify(ids));
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const userId = getCurrentUserId();
      if (!userId) return;

      try {
        const response = await fetch(`${APIURl}/users/${userId}`);
        const userData = await response.json();
        setCurrentUser(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast.error("Failed to fetch user data");
      }
    };

    const fetchProducts = async () => {
      try {
        const response = await fetch(`${APIURl}/products`);
        const data = await response.json();

        if (!Array.isArray(data)) {
          throw new Error(
            "Invalid API response - expected an array of products"
          );
        }

        const allProducts = data.map((product) => ({
          ...product,
          id: product._id,
          price: product.price ?? 19.99,
          discountPercentage: product.discount ?? 10,
          thumbnail:
            product.thumbnail || product.image || product.images?.[0] || "",
          rating: Math.min(product.rating ?? 3, 5),
        }));

        setProducts(allProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
        toast.error("Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
    fetchProducts();
  }, []);

  useEffect(() => {
    if (products.length > 0) {
      const wishlistIds = getWishlistIds();
      const filteredProducts = products.filter((product) =>
        wishlistIds.includes(product.id)
      );
      setWishlistProducts(filteredProducts);
    }
  }, [currentUser, products]);

  const handleRemoveFromWishlist = async (productId) => {
    const updatedIds = getWishlistIds().filter((id) => id !== productId);

    await updateWishlistStorage(updatedIds);

    // Refresh user data if logged in
    if (currentUser) {
      try {
        const response = await fetch(`${APIURl}/users/${currentUser.id}`);
        const userData = await response.json();
        setCurrentUser(userData);
      } catch (error) {
        console.error("Error refreshing user data:", error);
      }
    }

    setWishlistProducts((prev) =>
      prev.filter((product) => product.id !== productId)
    );
    toast.success("Product has been removed from your wishlist");
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    toast.success("Added to cart");
  };

  const handleMoveAllToBag = () => {
    if (wishlistProducts.length === 0) {
      toast.info("There are no items to move to bag");
      return;
    }

    wishlistProducts.forEach((product) => {
      addToCart(product);
    });

    toast.success(`${wishlistProducts.length} items moved to your bag`);
  };

  const calculateDiscountedPrice = (originalPrice, discountPercentage) => {
    if (discountPercentage === 0) return originalPrice;
    return originalPrice - originalPrice * (discountPercentage / 100);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <WishlistHeader
        wishlistCount={wishlistProducts.length}
        onMoveAllToBag={handleMoveAllToBag}
      />

      {wishlistProducts.length === 0 ? (
        <div className="text-center py-16">
          <h2 className="text-2xl font-medium mb-4">Your wishlist is empty</h2>
          <p className="text-gray-500 mb-6">
            Add items to your wishlist to keep track of products you're
            interested in
          </p>
          <Button className="bg-main">
            <Link to="/">Continue Shopping</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {wishlistProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onRemove={handleRemoveFromWishlist}
              onAddToCart={() => handleAddToCart(product)}
              calculateDiscountedPrice={calculateDiscountedPrice}
            />
          ))}
        </div>
      )}

      {products.length > 0 && (
        <div className="mt-16">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              <div className="w-1 h-8 bg-red-500 mr-3"></div>
              <h2 className="text-xl font-semibold">Just For You</h2>
            </div>
            <Button variant="outlined" className="text-sm px-4 bg-main">
              See All
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.slice(0, 4).map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onRemove={handleRemoveFromWishlist}
                onAddToCart={() => handleAddToCart(product)}
                calculateDiscountedPrice={calculateDiscountedPrice}
              />
            ))}
          </div>
        </div>
      )}

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

const WishlistHeader = ({ wishlistCount, onMoveAllToBag }) => (
  <div className="flex justify-between items-center">
    <h2 className="text-2xl font-bold">My Wishlist ({wishlistCount})</h2>
    <Button className="bg-main" onClick={onMoveAllToBag}>
      Move All To Bag
    </Button>
  </div>
);

const ProductCard = ({
  product,
  onRemove,
  onAddToCart,
  calculateDiscountedPrice,
}) => {
  const discountedPrice = calculateDiscountedPrice(
    product.price,
    product.discountPercentage
  );
  const hasDiscount = product.discountPercentage > 0;

  return (
    <Card className="overflow-hidden group relative flex flex-col h-full">
      {hasDiscount && (
        <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded z-10">
          -{product.discountPercentage}%
        </div>
      )}

      <div className="relative h-48 sm:h-64 overflow-hidden">
        <img
          src={
            product.image ||
            product.thumbnail ||
            "https://placehold.co/400x300?text=Product+Image"
          }
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-2 right-2 flex flex-col gap-2">
          <Button
            variant="text"
            size="sm"
            className="rounded-full bg-white hover:bg-gray-100 text-gray-700 shadow-md"
            onClick={() => onRemove(product.id)}
          >
            <FiTrash2 className="h-4 w-4" />
          </Button>
          <Button
            variant="text"
            size="sm"
            className="rounded-full bg-white hover:bg-gray-100 text-gray-700 shadow-md"
          >
            <FiEye className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-medium text-lg mb-1">{product.title}</h3>

        <div className="mb-2">
          <StarRating rating={product.rating} />
        </div>

        <div className="mt-auto flex items-center justify-between pt-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-lg">
              ${discountedPrice.toFixed(2)}
            </span>
            {hasDiscount && (
              <span className="text-gray-500 line-through text-sm">
                ${product.price.toFixed(2)}
              </span>
            )}
          </div>
        </div>
      </div>

      <Button
        className="w-full rounded-none rounded-b-lg bg-main hover:bg-gray-800 text-white flex items-center justify-center gap-2"
        onClick={onAddToCart}
      >
        <FiShoppingCart className="h-4 w-4" />
        <span>Add To Cart</span>
      </Button>
    </Card>
  );
};

const StarRating = ({ rating, maxRating = 5 }) => {
  return (
    <div className="flex items-center">
      {Array.from({ length: maxRating }).map((_, index) => {
        const filled = index < Math.floor(rating);
        const halfFilled =
          !filled && index < Math.ceil(rating) && rating % 1 !== 0;

        return (
          <svg
            key={index}
            className={`w-4 h-4 ${
              filled || halfFilled ? "text-yellow-400" : "text-gray-300"
            }`}
            fill={filled ? "currentColor" : "none"}
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
            />
          </svg>
        );
      })}
      <span className="ml-1 text-sm text-gray-500">
        ({rating?.toFixed(1) || 0})
      </span>
    </div>
  );
};

export default Wishlist;
