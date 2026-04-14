import axios from "axios"

// Base URL apuntando a tu backend — cambia esto cuando conectes el backend real
const API_BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000/api"

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

// Interceptor para agregar el JWT cuando lo tengas
// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token")
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`
//   }
//   return config
// })

export default api
