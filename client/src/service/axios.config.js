import axios from "axios";
import { useAuthStore } from "@/store/useAuthStore";
import { authService } from "./auth.service";

// Tạo axios instance
const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

// Trước khi gửi request → thêm token vào header
instance.interceptors.request.use((config) => {
  const accessToken = useAuthStore.getState().accessToken;
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

instance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/auth/refresh-token") &&
      !originalRequest.url.includes("/auth/signin")
    ) {
      originalRequest._retry = true;

      try {
        // Gọi API refresh token
        const response = await authService.refreshToken();
        const newAccessToken = response.data.accessToken;

        // Lưu token mới vào store (memory only)
        useAuthStore.getState().setAccessToken(newAccessToken);
        // Thử lại request với token mới
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return instance(originalRequest);
      } catch (refreshError) {
        // Reset user store
        const { logout } = useAuthStore.getState();
        logout();

        // Redirect to login

        throw refreshError;
      }
    }

    throw error.response?.data || error;
  }
);

export default instance;
