import { useNavigate } from "react-router-dom"

// Auth fake — sin JWT real por ahora.
// Cuando conectes el backend, reemplaza el localStorage "fake-auth"
// por el token JWT real y activa el interceptor en api.ts

const AUTH_KEY = "privdata-auth"

export interface FakeUser {
  id: string
  name: string
  email: string
  role: "admin" | "analyst" | "viewer"
}

const FAKE_USER: FakeUser = {
  id: "u1",
  name: "Carlos Méndez",
  email: "cmendez@privdata.cl",
  role: "admin",
}

export function useAuth() {
  const navigate = useNavigate()

  const isAuthenticated = (): boolean => {
    return localStorage.getItem(AUTH_KEY) === "true"
  }

  const getUser = (): FakeUser | null => {
    if (!isAuthenticated()) return null
    return FAKE_USER
  }

  // Login fake: cualquier email/pass pasa
  const login = (email: string, _password: string): boolean => {
    if (!email) return false
    localStorage.setItem(AUTH_KEY, "true")
    return true
  }

  const logout = () => {
    localStorage.removeItem(AUTH_KEY)
    navigate("/login")
  }

  return { isAuthenticated, getUser, login, logout }
}
