import db from "./db"
import type { User } from "./auth-types"

export function isAuthenticated(): boolean {
  return db.isLoggedIn()
}

export function isAdmin(): boolean {
  return db.isAdmin()
}

export function isAccountOfficer(): boolean {
  return db.isAccountOfficer()
}

export function requireAuth(): boolean {
  if (!isAuthenticated()) {
    throw new Error("Authentication required")
  }
  return true
}

export function requireAdmin(): boolean {
  if (!isAdmin()) {
    throw new Error("Admin access required")
  }
  return true
}

export function requireAccountOfficer(): boolean {
  if (!isAccountOfficer()) {
    throw new Error("Account officer access required")
  }
  return true
}

export function login(username: string, password: string): User | null {
  return db.login(username, password)
}

export function logout(): void {
  db.logout()
}

export function getCurrentUser(): User | null {
  return db.getCurrentUser()
}

export function createAccountOfficer(fullName: string, email: string, username: string, password: string): User | null {
  if (!isAdmin()) return null

  return db.createUser({
    username,
    password,
    fullName,
    email,
    role: "accountOfficer",
  })
}

export function getAllAccountOfficers(): User[] {
  if (!isAdmin()) return []

  return db.getAccountOfficers()
}

