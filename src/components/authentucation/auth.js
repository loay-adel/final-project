// src/services/auth.js
import bcrypt from "bcryptjs";

const BASE_URL = "http://localhost:5000";

// Password hashing utility
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

// Password verification utility
const verifyPassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Request failed");
  }
  return response.json();
};

export const signup = async (userData) => {
  try {
    // Check if user already exists by email
    const usersResponse = await fetch(
      `${BASE_URL}/users?email=${userData.email}`
    );
    const existingUsers = await handleResponse(usersResponse);

    if (existingUsers.length > 0) {
      throw new Error("User with this email already exists");
    }

    // Hash password before storing
    const hashedPassword = await hashPassword(userData.password);
    const userWithHashedPassword = {
      ...userData,
      password: hashedPassword,
    };

    const response = await fetch(`${BASE_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userWithHashedPassword),
    });

    const newUser = await handleResponse(response);

    // Store user ID and minimal info in localStorage
    localStorage.setItem("userId", newUser.id);
    return {
      id: newUser.id,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
    };
  } catch (error) {
    console.error("Signup error:", error);
    throw error;
  }
};

export const login = async (credentials) => {
  try {
    const response = await fetch(
      `${BASE_URL}/users?email=${credentials.email}`
    );
    const users = await handleResponse(response);

    if (users.length === 0) {
      throw new Error("User not found");
    }

    const user = users[0]; // Assuming emails are unique
    const isValid = await verifyPassword(credentials.password, user.password);

    if (!isValid) {
      throw new Error("Invalid credentials");
    }

    localStorage.setItem("userId", user.id);
    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    };
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

export const fetchCurrentUser = async () => {
  const userId = localStorage.getItem("userId");
  if (!userId) return null;

  try {
    const response = await fetch(`${BASE_URL}/users/${userId}`);
    const user = await handleResponse(response);
    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    };
  } catch (error) {
    console.error("Failed to fetch user:", error);
    logout(); // Auto-logout if user can't be fetched
    return null;
  }
};

export const isAuthenticated = () => {
  return !!localStorage.getItem("userId");
};

export const getCurrentUser = () => {
  const userId = localStorage.getItem("userId");
  return userId ? { id: userId } : null;
};

export const logout = () => {
  localStorage.removeItem("userId");
};

// Utility function to clear all auth-related data
export const clearAuthData = () => {
  logout();
  // Add any other auth-related cleanup here
};
