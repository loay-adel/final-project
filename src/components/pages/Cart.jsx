import { Link } from "react-router-dom";
import { IconButton } from "@material-tailwind/react";
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import Swal from "sweetalert2";

const Cart = () => {
  const {
    cart,
    increaseQty,
    decreaseQty,
    removeFromCart,
    getTotal,
    clearCart,
    cartCount,
  } = useContext(CartContext);

  const handleRemoveItem = (id) => {
    Swal.fire({
      title: "Remove Item?",
      text: "Are you sure you want to remove this item from your cart?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, remove it!",
    }).then((result) => {
      if (result.isConfirmed) {
        removeFromCart(id);
        Swal.fire(
          "Removed!",
          "The item has been removed from your cart.",
          "success"
        );
      }
    });
  };

  const handleClearCart = () => {
    if (cartCount === 0) return;

    Swal.fire({
      title: "Clear Cart?",
      text: "Are you sure you want to remove all items from your cart?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, clear it!",
    }).then((result) => {
      if (result.isConfirmed) {
        clearCart();
        Swal.fire("Cleared!", "Your cart has been cleared.", "success");
      }
    });
  };

  return (
    <>
      <div className="flex gap-3 mt-5 container md:justify-start justify-center">
        <Link to="/" className="text-gray-400 hover:text-gray-600 transition">
          Home
        </Link>
        <span>/</span>
        <span className="font-medium">Cart</span>
      </div>

      <section className="bg-white py-4 md:py-8">
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          {cart.length > 0 && (
            <h1 className="text-3xl font-semibold text-gray-800 flex justify-center items-center gap-2 mb-6">
              Items in Your Cart :
              <span className="px-4 py-2 bg-red-600 text-white rounded-full text-xl font-semibold">
                {cartCount}
              </span>
            </h1>
          )}

          <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
            <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
              {/* Desktop Table View */}
              <div className="hidden sm:block">
                {cart.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="border-b">
                          <th className="py-2">Product</th>
                          <th className="py-2">Price</th>
                          <th className="py-2">Quantity</th>
                          <th className="py-2">Subtotal</th>
                          <th className="py-2">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {cart.map((item) => (
                          <tr
                            key={item._id}
                            className="border-b hover:bg-gray-50"
                          >
                            <td className="py-4 flex items-center">
                              <img
                                className="h-20 w-20 mr-4 object-cover rounded"
                                src={item.thumbnail || item.image}
                                alt={item.title}
                              />
                              <span className="font-medium">
                                {item.title.split(" ").slice(0, 2).join(" ")}
                              </span>
                            </td>
                            <td className="py-4">${item.price.toFixed(2)}</td>
                            <td className="py-4">
                              <div className="flex items-center gap-2">
                                <IconButton
                                  color="red"
                                  size="sm"
                                  onClick={() => decreaseQty(item._id)}
                                  disabled={item.quantity <= 1}
                                >
                                  -
                                </IconButton>
                                <span className="w-8 text-center">
                                  {item.quantity}
                                </span>
                                <IconButton
                                  color="red"
                                  size="sm"
                                  onClick={() => increaseQty(item._id)}
                                >
                                  +
                                </IconButton>
                              </div>
                            </td>
                            <td className="py-4 font-medium">
                              ${item.subtotal.toFixed(2)}
                            </td>
                            <td className="py-4">
                              <button
                                className="text-red-600 hover:text-red-800 transition font-medium"
                                onClick={() => handleRemoveItem(item._id)}
                              >
                                Remove
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-20 text-center">
                    <ShoppingCartIcon className="w-20 h-20 text-gray-300 mb-4" />
                    <h2 className="text-2xl font-semibold mb-2">
                      Your cart is empty
                    </h2>
                    <p className="mb-6 text-gray-500 max-w-md">
                      Looks like you haven't added anything to your cart yet.
                    </p>
                    <Link
                      to="/show-products"
                      className="inline-block bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition duration-300"
                    >
                      Continue Shopping
                    </Link>
                  </div>
                )}
              </div>

              {/* Mobile List View */}
              <div className="block sm:hidden">
                {cart.length > 0 ? (
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <div
                        key={item._id}
                        className="border rounded-lg p-4 hover:shadow-md transition"
                      >
                        <div className="flex gap-4">
                          <img
                            className="h-24 w-24 object-cover rounded"
                            src={item.thumbnail || item.image}
                            alt={item.title}
                          />
                          <div className="flex-1">
                            <h3 className="font-medium">
                              {item.title.split(" ").slice(0, 1).join(" ")}
                            </h3>
                            <p className="text-gray-600 mt-1">
                              ${item.price.toFixed(2)}
                            </p>
                            <div className="flex items-center justify-between mt-3">
                              <div className="flex items-center gap-2">
                                <IconButton
                                  color="red"
                                  size="sm"
                                  onClick={() => decreaseQty(item._id)}
                                  disabled={item.quantity <= 1}
                                >
                                  -
                                </IconButton>
                                <span className="w-8 text-center">
                                  {item.quantity}
                                </span>
                                <IconButton
                                  color="red"
                                  size="sm"
                                  onClick={() => increaseQty(item)}
                                >
                                  +
                                </IconButton>
                              </div>
                              <button
                                className="text-red-600 hover:text-red-800 text-sm font-medium"
                                onClick={() => handleRemoveItem(item.id)}
                              >
                                Remove
                              </button>
                            </div>
                            <p className="font-medium mt-2">
                              Subtotal: ${item.subtotal.toFixed(2)}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <ShoppingCartIcon className="w-16 h-16 text-gray-300 mb-4" />
                    <h2 className="text-xl font-semibold mb-2">
                      Your cart is empty
                    </h2>
                    <p className="mb-6 text-gray-500">
                      Start shopping to add items to your cart.
                    </p>
                    <Link
                      to="/product"
                      className="inline-block bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition"
                    >
                      Continue Shopping
                    </Link>
                  </div>
                )}
              </div>

              {cart.length > 0 && (
                <>
                  <div className="flex flex-col sm:flex-row justify-between gap-4 mt-6">
                    <Link
                      to="/product"
                      className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 text-center transition"
                    >
                      Return To Shoping
                    </Link>
                    <button
                      onClick={handleClearCart}
                      className={`px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition ${
                        cartCount === 0 ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                    >
                      Clear Cart
                    </button>
                  </div>

                  <div className="mt-8 flex flex-col lg:flex-row lg:justify-between lg:items-start gap-6">
                    <div className="w-full lg:w-1/2">
                      <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
                        <h3 className="text-lg font-semibold mb-4">
                          Coupon Code
                        </h3>
                        <form className="flex gap-2">
                          <input
                            type="text"
                            placeholder="Enter coupon code"
                            className="flex-1 block w-full rounded-lg border border-gray-300 p-2.5 text-sm"
                          />
                          <button
                            type="button"
                            className="rounded-lg bg-red-600 hover:bg-red-700 px-5 py-2.5 text-sm font-medium text-white transition"
                          >
                            Apply
                          </button>
                        </form>
                      </div>
                    </div>

                    <div className="w-full lg:w-1/2">
                      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                        <h3 className="text-xl font-semibold mb-4">
                          Cart Summary
                        </h3>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Subtotal:</span>
                            <span className="font-medium">
                              ${getTotal().toFixed(2)}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Shipping:</span>
                            <span className="font-medium">Free</span>
                          </div>
                          <div className="border-t border-gray-200 pt-3 flex justify-between">
                            <span className="font-semibold">Total:</span>
                            <span className="font-bold text-lg">
                              ${getTotal().toFixed(2)}
                            </span>
                          </div>
                        </div>
                        <Link to="/checkout">
                          <button className="w-full mt-6 rounded-lg bg-red-600 hover:bg-red-700 px-5 py-3 text-white font-medium transition">
                            Proceed to Checkout
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Cart;
