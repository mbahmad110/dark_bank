export type UserRole = "admin" | "accountOfficer"

export interface User {
  id: string
  username: string
  password: string // In a real app, this would be hashed
  fullName: string
  email: string
  role: UserRole
  createdAt: string
  lastLogin?: string
}

export interface Transaction {
  id: string
  date: string
  time: string
  type: "local" | "international" | "crypto"
  amount: string
  fee: string
  status: "pending" | "approved" | "rejected"
  accountOfficerId: string
  accountOfficerName: string
  approvedBy?: string
  approvedAt?: string
  details: Record<string, string>
}

