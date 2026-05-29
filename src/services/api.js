import axios from "axios";

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const DOA_API_BASE_URL = import.meta.env.VITE_DOA_API_BASE_URL;

if (!API_BASE_URL) {
  throw new Error("VITE_API_BASE_URL belum dikonfigurasi.");
}

if (!DOA_API_BASE_URL) {
  throw new Error("VITE_DOA_API_BASE_URL belum dikonfigurasi.");
}

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export const getApiErrorMessage = (error) => {
  if (error.response?.data?.message) {
    return error.response.data.message;
  }

  if (error.code === "ECONNABORTED") {
    return "Request terlalu lama. Silakan coba lagi.";
  }

  if (error.message) {
    return error.message;
  }

  return "Terjadi kesalahan saat mengambil data.";
};
