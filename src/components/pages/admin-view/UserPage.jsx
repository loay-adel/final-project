import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [roleFilter, setRoleFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    setLoading(true);
    fetch(`${import.meta.env.VITE_URL}/users`)
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setFilteredUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch users:", err);
        setLoading(false);
      });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won’t be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626", // Red
      cancelButtonColor: "#6b7280", // Gray
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await fetch(`${import.meta.env.VITE_URL}/users/${id}`, {
            method: "DELETE",
          });

          if (res.ok) {
            Swal.fire("Deleted!", "User has been deleted.", "success");
            fetchUsers();
          } else {
            Swal.fire("Error", "Failed to delete user", "error");
          }
        } catch (err) {
          console.error(err);
          Swal.fire("Error", "Something went wrong", "error");
        }
      }
    });
  };

  const makeAdmin = (user) => {
    Swal.fire({
      title: `Make ${user.firstName} Admin?`,
      text: "They will have full access to the system.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#16a34a", // Green
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, promote",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await fetch(
            `${import.meta.env.VITE_URL}/users/${user.id}`,
            {
              method: "PATCH",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ role: "admin" }),
            }
          );

          if (res.ok) {
            Swal.fire(
              "Success",
              `${user.firstName} is now an admin.`,
              "success"
            );
            fetchUsers();
          } else {
            Swal.fire("Error", "Failed to update user role.", "error");
          }
        } catch (err) {
          console.error(err);
          Swal.fire("Error", "Something went wrong", "error");
        }
      }
    });
  };

  useEffect(() => {
    let result = [...users];

    if (roleFilter !== "all") {
      result = result.filter((user) => user.role === roleFilter);
    }

    if (searchTerm) {
      result = result.filter(
        (user) =>
          `${user.firstName} ${user.lastName}`
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredUsers(result);
  }, [roleFilter, searchTerm, users]);

  if (loading) return <p>Loading users...</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Users</h2>

      {/* Filters */}
      <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <input
          type="text"
          placeholder="Search by name or email"
          className="border px-3 py-2 rounded w-full sm:w-1/2"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="border px-3 py-2 rounded"
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
        >
          <option value="all">All Roles</option>
          <option value="admin">Admins</option>
          <option value="customer">Customers</option>
        </select>
      </div>

      {/* User List */}
      <ul className="space-y-4">
        {filteredUsers.map((user) => (
          <li key={user.id} className="bg-white p-6 rounded-lg shadow">
            <p>
              <strong>Name:</strong> {user.firstName} {user.lastName}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Role:</strong> {user.role}
            </p>
            <p>
              <strong>Phone:</strong> {user.phone || "N/A"}
            </p>
            <p>
              <strong>Wishlist:</strong> {user.wishlist.join(", ") || "None"}
            </p>

            <div className="mt-4 flex gap-2 flex-wrap">
              <button
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={() => handleDelete(user.id)}
              >
                Delete
              </button>
              <button
                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={() =>
                  Swal.fire(
                    "Coming Soon",
                    "Edit feature not implemented yet",
                    "info"
                  )
                }
              >
                Edit
              </button>
              {user.role !== "admin" && (
                <button
                  className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                  onClick={() => makeAdmin(user)}
                >
                  Make Admin
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>

      {filteredUsers.length === 0 && (
        <p className="text-gray-500 mt-4">No users found.</p>
      )}
    </div>
  );
};

export default UsersPage;
