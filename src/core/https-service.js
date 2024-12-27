import axios from "axios";

const BASE_URL = "https://react-mini-projects-api.classbon.com";

export const httpService = axios.create({
  baseURL: BASE_URL,
});

export const httpsIntercepterService = axios.create({
  baseURL: BASE_URL,
});

httpsIntercepterService.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers = {
        Authorization: `Bearer ${token}`,
      };
    }
    return config;
  },
  (error) => Promise.reject(error)
);

httpsIntercepterService.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 401) {
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);
