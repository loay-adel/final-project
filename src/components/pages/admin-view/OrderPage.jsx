import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/orders")
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch orders:", err);
        setLoading(false);
      });
  }, []);

  const updateOrderStatus = async (orderId, newStatus) => {
    const confirmed = await Swal.fire({
      title: "Are you sure?",
      text: `Do you want to mark this order as ${newStatus}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, update it!",
    });

    if (confirmed.isConfirmed) {
      try {
        const res = await fetch(`http://localhost:5000/orders/${orderId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: newStatus }),
        });

        if (!res.ok) throw new Error("Update failed");

        // Update local state after success
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.id === orderId ? { ...order, status: newStatus } : order
          )
        );

        Swal.fire("Updated!", "The order status has been updated.", "success");
      } catch (err) {
        Swal.fire("Error", "Failed to update order status.", "error");
      }
    }
  };

  if (loading) {
    return <p className="text-gray-600">Loading orders...</p>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Orders</h2>
      <ul className="space-y-4">
        {orders.map((order) => (
          <li
            key={order.id}
            className="bg-white p-6 rounded-lg shadow relative"
          >
            {/* حالة الطلب في الزاوية */}
            <span
              className={`absolute top-2 right-2 px-3 py-1 text-sm rounded-full font-semibold capitalize ${
                order.status === "pending"
                  ? "bg-gray-200 text-gray-800"
                  : order.status === "processing"
                  ? "bg-yellow-200 text-yellow-800"
                  : order.status === "shipped"
                  ? "bg-blue-200 text-blue-800"
                  : order.status === "delivered"
                  ? "bg-green-200 text-green-800"
                  : order.status === "cancelled"
                  ? "bg-red-200 text-red-800"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              {order.status}
            </span>

            <div className="mb-2">
              <span className="font-semibold">Order ID:</span> {order.id}
            </div>
            <div className="mb-2">
              <span className="font-semibold">User ID:</span> {order.userId}
            </div>
            <div className="mb-2">
              <span className="font-semibold">Total:</span> $
              {order.total.toFixed(2)}
            </div>
            <div className="mb-2">
              <span className="font-semibold">Payment Method:</span>{" "}
              {order.paymentMethod}
            </div>
            <div className="mb-2">
              <span className="font-semibold">Created At:</span>{" "}
              {new Date(order.createdAt).toLocaleString()}
            </div>
            <div>
              <span className="font-semibold">Shipping Address:</span>
              <p className="ml-4">
                {order.shippingAddress.street}, {order.shippingAddress.city},{" "}
                {order.shippingAddress.state} {order.shippingAddress.zip},{" "}
                {order.shippingAddress.country}
              </p>
            </div>

            {/* زر تغيير الحالة */}
            <div className="mt-4">
              {order.status !== "delivered" && (
                <button
                  onClick={() => updateOrderStatus(order.id, "delivered")}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                >
                  Mark as Delivered
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrdersPage;
