// src/services/auth.js
const BASE_URL = "http://localhost:5000";

export const signup = async (userData) => {
  try {
    const response = await fetch(`${BASE_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Signup failed");
    }

    const data = await response.json();

    // Handle direct user object response (without nesting)
    const user = data.id ? data : data.user;

    if (!user?.id) {
      throw new Error("User ID not found in response");
    }

    localStorage.setItem("userId", user.id);
    localStorage.setItem("userData", JSON.stringify(user));
    return user;
  } catch (error) {
    throw error;
  }
};

export const login = async (credentials) => {
  try {
    // First find user by email/phone
    const usersResponse = await fetch(`${BASE_URL}/users`);
    if (!usersResponse.ok) {
      throw new Error("Failed to fetch users");
    }

    const allUsers = await usersResponse.json();
    const user = allUsers.find(
      (u) =>
        (u.email === credentials.emailOrPhone ||
          u.phone === credentials.emailOrPhone) &&
        u.password === credentials.password
    );

    if (!user) {
      throw new Error("Invalid credentials");
    }

    localStorage.setItem("userId", user.id);
    localStorage.setItem("userData", JSON.stringify(user));
    return user;
  } catch (error) {
    throw error;
  }
};

export const fetchUserById = async (userId) => {
  try {
    const response = await fetch(`${BASE_URL}/users/${userId}`);
    if (!response.ok) throw new Error("Failed to fetch user");
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const updateUser = async (userId, updates) => {
  try {
    const response = await fetch(`${BASE_URL}/users/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updates),
    });
    if (!response.ok) throw new Error("Failed to update user");
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const fetchProducts = async () => {
  try {
    const response = await fetch(`${BASE_URL}/products`);
    if (!response.ok) throw new Error("Failed to fetch products");
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const createOrder = async (orderData) => {
  try {
    const userId = localStorage.getItem("userId");
    const response = await fetch(`${BASE_URL}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...orderData, userId }),
    });
    if (!response.ok) throw new Error("Failed to create order");
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const fetchUserOrders = async () => {
  try {
    const userId = localStorage.getItem("userId");
    const response = await fetch(`${BASE_URL}/orders?userId=${userId}`);
    if (!response.ok) throw new Error("Failed to fetch orders");
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const createReview = async (reviewData) => {
  try {
    const userId = localStorage.getItem("userId");
    const response = await fetch(`${BASE_URL}/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...reviewData, userId }),
    });
    if (!response.ok) throw new Error("Failed to create review");
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const isAuthenticated = () => {
  return !!localStorage.getItem("userId");
};

export const getCurrentUser = () => {
  const userData = localStorage.getItem("userData");
  return userData ? JSON.parse(userData) : null;
};

export const logout = () => {
  localStorage.removeItem("userId");
  localStorage.removeItem("userData");
  window.location.href = "/signin";
};
