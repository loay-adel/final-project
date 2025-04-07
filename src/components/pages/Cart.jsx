
import { Link } from "react-router-dom";
import { IconButton } from "@material-tailwind/react";
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";



const Cart = () => {
  const { cart, increaseQty, decreaseQty, removeFromCart, getTotal, clearCart } = useContext(CartContext);

  return (
    <>
      <div className="flex gap-3 mt-5 container md:justify-start justify-center">
        <Link to="/" className="text-gray-400">Home</Link>
        <span>/</span>
        <button className="font-medium">Cart</button>
      </div>
      <section className="bg-white py-4 md:py-4">
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
            <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
              <table className="w-full text-left">
                <thead>
                  {cart.length > 0 &&
                    <tr className="border-b">
                      <th className="py-2">Product</th>
                      <th className="py-2">Price</th>
                      <th className="py-2">Quantity</th>
                      <th className="py-2">Subtotal</th>
                      <th className="py-2">Action</th>
                    </tr>
                  }

                </thead>
                <tbody>
                  {cart.length > 0 ? (
                    cart.map((item) => (
                      <tr key={item.id} className="border-b">
                        <td className="py-4 flex items-center">
                          <img className="h-20 w-20 mr-4" src={item.images[0]} alt={item.title} />
                          {item.title.split(" ").slice(0, 1).join(" ")}
                        </td>
                        <td className="py-4">{item.price} EGP</td>
                        <td className="py-4">
                          <div className="flex items-center gap-2">
                            <IconButton color="red" onClick={() => increaseQty(item.id)}>
                              +
                            </IconButton>
                            <h1>{item.quantity}</h1>
                            <IconButton color="red" onClick={() => decreaseQty(item.id)}>
                              -
                            </IconButton>
                          </div>
                        </td>
                        <td className="py-4">{item.subtotal.toFixed(2)} EGP</td>
                        <td className="py-4">
                          <button className="text-red-600 hover:underline" onClick={() => removeFromCart(item.id)}>
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <div className="flex flex-col items-center justify-center py-20 text-center text-gray-600">
                        <ShoppingCartIcon className="w-20 h-20 text-red-500 mb-4" />
                        <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
                        <p className="mb-6 text-gray-500">Looks like you haven’t added anything to your cart yet.</p>
                        <Link
                          to="/product"
                          className="inline-block bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg text-sm font-medium transition duration-300"
                        >
                          Return to Shop
                        </Link>
                      </div>
                    </tr>
                  )}
                </tbody>
              </table>
              {cart.length > 0 &&
                <div className="flex justify-between mt-4">
                  <Link className="px-4 py-2 border border-gray-300 rounded-md" to="/product">Return To Shop</Link>
                  <button className="px-4 py-2 border border-gray-300 rounded-md" onClick={clearCart}>Update Cart</button>
                </div>
              }
              {cart.length > 0 &&
                <div className="mt-8 flex flex-col lg:flex-row lg:justify-between lg:items-start">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-4">
                    <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
                      <form className="flex space-x-4">
                        <input type="text" placeholder="Coupon Code" className="block w-full rounded-lg border border-gray-300 p-2.5 text-sm text-gray-900" required />
                        <button type="submit" className="rounded-lg bg-red-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-700">Apply Coupon</button>
                      </form>
                    </div>
                  </div>
                  <div className="mt-6 lg:mt-0 lg:w-1/3">
                    <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
                      <p className="text-xl font-semibold text-gray-900 dark:text-white">Cart Total</p>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-base font-normal text-gray-500 dark:text-gray-400">Subtotal:</span>
                          <span className="text-base font-medium text-gray-900 dark:text-white">{getTotal().toFixed(2)} EGP</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-base font-normal text-gray-500 dark:text-gray-400">Shipping:</span>
                          <span className="text-base font-medium text-gray-900 dark:text-white">Free</span>
                        </div>
                        <div className="flex justify-between border-t border-gray-200 pt-2 dark:border-gray-700">
                          <span className="text-base font-bold text-gray-900 dark:text-white">Total:</span>
                          <span className="text-base font-bold text-gray-900 dark:text-white">{getTotal().toFixed(2)} EGP</span>
                        </div>
                      </div>
                      <Link to="/checkout">
                        <button className="w-full rounded-lg bg-red-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-700">Proceed to Checkout</button>
                      </Link>
                    </div>
                  </div>
                </div>
              }
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Cart;