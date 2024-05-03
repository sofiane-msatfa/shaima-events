import axios from "axios";
import type { AccessTokenResponse } from "../dtos/access-token-response";

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true, // include cookies
});

export function setAccessTokenInterceptor(accessToken: string) {
  api.interceptors.request.use(
    (config) => {
      config.headers.Authorization = `Bearer ${accessToken}`;
      return config;
    },
    (error) => Promise.reject(error),
  );
}

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If the error status is 401 and there is no originalRequest._retry flag,
    // it means the token has expired and we need to refresh it
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const response = await api.post<AccessTokenResponse>("/auth/refresh");
        const { accessToken } = response.data;

        localStorage.setItem("access_token", accessToken);

        // Retry the original request with the new token
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return api(originalRequest);
      } catch (error) {
        // Handle refresh token error or redirect to login
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  },
);

export default api;
