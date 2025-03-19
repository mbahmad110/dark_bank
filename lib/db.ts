import type { User, UserRole, Transaction } from "./auth-types"

// This is a simulated database for the demo
// In a real application, this would be replaced with a real database like MongoDB, PostgreSQL, etc.

class Database {
  private users: User[] = [
    {
      id: "admin-1",
      username: "ips123",
      password: "ips123", // In a real app, this would be hashed
      fullName: "Admin User",
      email: "admin@infinityprosolutions.com",
      role: "admin",
      createdAt: new Date().toISOString(),
    },
  ]

  private transactions: Transaction[] = []
  private currentUser: User | null = null

  // User methods
  login(username: string, password: string): User | null {
    const user = this.users.find((u) => u.username === username && u.password === password)
    if (user) {
      this.currentUser = user
      user.lastLogin = new Date().toISOString()
      return user
    }
    return null
  }

  logout() {
    this.currentUser = null
  }

  getCurrentUser(): User | null {
    return this.currentUser
  }

  isLoggedIn(): boolean {
    return !!this.currentUser
  }

  hasRole(role: UserRole): boolean {
    return !!this.currentUser && this.currentUser.role === role
  }

  isAdmin(): boolean {
    return this.hasRole("admin")
  }

  isAccountOfficer(): boolean {
    return this.hasRole("accountOfficer")
  }

  // User management
  createUser(user: Omit<User, "id" | "createdAt">): User {
    const newUser: User = {
      ...user,
      id: `user-${Date.now()}`,
      createdAt: new Date().toISOString(),
    }
    this.users.push(newUser)
    return newUser
  }

  getAllUsers(): User[] {
    return [...this.users]
  }

  getAccountOfficers(): User[] {
    return this.users.filter((user) => user.role === "accountOfficer")
  }

  getUserById(id: string): User | undefined {
    return this.users.find((u) => u.id === id)
  }

  // Transaction methods
  createTransaction(
    transaction: Omit<Transaction, "id" | "date" | "time" | "status" | "accountOfficerId" | "accountOfficerName">,
  ): Transaction {
    if (!this.currentUser || this.currentUser.role !== "accountOfficer") {
      throw new Error("Only account officers can create transactions")
    }

    const newTransaction: Transaction = {
      ...transaction,
      id: `TX-${Date.now()}`,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
      status: "pending",
      accountOfficerId: this.currentUser.id,
      accountOfficerName: this.currentUser.fullName,
    }

    this.transactions.push(newTransaction)
    return newTransaction
  }

  getTransactionById(id: string): Transaction | undefined {
    return this.transactions.find((t) => t.id === id)
  }

  getAllTransactions(): Transaction[] {
    return [...this.transactions]
  }

  getPendingTransactions(): Transaction[] {
    return this.transactions.filter((t) => t.status === "pending")
  }

  getAccountOfficerTransactions(accountOfficerId: string): Transaction[] {
    return this.transactions.filter((t) => t.accountOfficerId === accountOfficerId)
  }

  approveTransaction(id: string): Transaction | null {
    if (!this.isAdmin()) return null

    const transaction = this.getTransactionById(id)
    if (transaction && transaction.status === "pending") {
      transaction.status = "approved"
      transaction.approvedBy = this.currentUser?.id
      transaction.approvedAt = new Date().toISOString()
      return transaction
    }
    return null
  }

  rejectTransaction(id: string): Transaction | null {
    if (!this.isAdmin()) return null

    const transaction = this.getTransactionById(id)
    if (transaction && transaction.status === "pending") {
      transaction.status = "rejected"
      transaction.approvedBy = this.currentUser?.id
      transaction.approvedAt = new Date().toISOString()
      return transaction
    }
    return null
  }
}

// Create a singleton instance
const db = new Database()

export default db

