import api from "@/lib/axios";
import { User } from "@/data/mockData";

export const authService = {
  login: async (email: string, password: string) => {
    try {
      const response = await api.post("/auth/login", { email, password });
      const { token, user } = response.data;
      localStorage.setItem("auth_token", token);
      return user;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  },

  register: async (userData: {
    name: string;
    email: string;
    password: string;
  }) => {
    try {
      const response = await api.post("/auth/register", userData);
      const { token, user } = response.data;
      localStorage.setItem("auth_token", token);
      return user;
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem("auth_token");
  },

  getUserProfile: async () => {
    try {
      const response = await api.get("/profile");
      return response.data;
    } catch (error) {
      console.error("Get profile error:", error);
      throw error;
    }
  },

  updateUserProfile: async (userId: number, userData: Partial<User>) => {
    try {
      const response = await api.put(`/users/${userId}`, userData);
      return response.data;
    } catch (error) {
      console.error("Update profile error:", error);
      throw error;
    }
  },

  getDashboard: async (userId: number) => {
    try {
      const response = await api.get(`/dashboard/${userId}`);
      return response.data;
    } catch (error) {
      console.error("Get dashboard error:", error);
      throw error;
    }
  },

  getNotifications: async () => {
    try {
      const response = await api.get("/notifications");
      return response.data;
    } catch (error) {
      console.error("Get notifications error:", error);
      throw error;
    }
  },
};
