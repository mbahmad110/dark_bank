"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { User } from "@/lib/auth-types"
import { login as authLogin, logout as authLogout, getCurrentUser } from "@/lib/auth"

type AuthContextType = {
  user: User | null
  isAuthenticated: boolean
  isAdmin: boolean
  isAccountOfficer: boolean
  login: (username: string, password: string) => User | null
  logout: () => void
}

// Default context value
const defaultContextValue: AuthContextType = {
  user: null,
  isAuthenticated: false,
  isAdmin: false,
  isAccountOfficer: false,
  login: () => null,
  logout: () => {},
}

const AuthContext = createContext<AuthContextType>(defaultContextValue)

export const useAuth = () => useContext(AuthContext)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [isAccountOfficer, setIsAccountOfficer] = useState(false)

  // Check if user is already authenticated
  useEffect(() => {
    try {
      const currentUser = getCurrentUser()
      if (currentUser) {
        setUser(currentUser)
        setIsAuthenticated(true)
        setIsAdmin(currentUser.role === "admin")
        setIsAccountOfficer(currentUser.role === "accountOfficer")
      }
    } catch (error) {
      console.error("Auth initialization error:", error)
    }
  }, [])

  const login = (username: string, password: string): User | null => {
    try {
      const user = authLogin(username, password)
      if (user) {
        setUser(user)
        setIsAuthenticated(true)
        setIsAdmin(user.role === "admin")
        setIsAccountOfficer(user.role === "accountOfficer")
      }
      return user
    } catch (error) {
      console.error("Login error:", error)
      return null
    }
  }

  const logout = () => {
    try {
      authLogout()
      setUser(null)
      setIsAuthenticated(false)
      setIsAdmin(false)
      setIsAccountOfficer(false)
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isAdmin,
        isAccountOfficer,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

