import { promises as fs } from 'fs'
import path from 'path'
import crypto from 'crypto'

const DB_DIR = path.join(process.cwd(), 'data')
const DONATIONS_FILE = path.join(DB_DIR, 'donations.json')
const USERS_FILE = path.join(DB_DIR, 'users.json')

export interface Donation {
  id: string
  timestamp: string
  name: string
  email?: string
  amount: number
  currency: 'USD' | 'INR'
  paymentMethod: string
  location: 'us' | 'india'
  referenceId?: string
  message?: string
  status: string
  createdAt: string
  updatedAt: string
}

export interface User {
  id: string
  username: string
  passwordHash: string
  role: 'admin'
  createdAt: string
}

class Database {
  private initialized = false

  private async ensureDataDir() {
    if (this.initialized) return
    
    try {
      await fs.access(DB_DIR)
    } catch {
      await fs.mkdir(DB_DIR, { recursive: true })
    }
    
    try {
      await fs.access(DONATIONS_FILE)
    } catch {
      await fs.writeFile(DONATIONS_FILE, JSON.stringify([]))
    }
    
    try {
      await fs.access(USERS_FILE)
    } catch {
      const defaultAdmin = {
        id: crypto.randomUUID(),
        username: 'admin',
        passwordHash: this.hashPassword('admin123'),
        role: 'admin',
        createdAt: new Date().toISOString()
      }
      await fs.writeFile(USERS_FILE, JSON.stringify([defaultAdmin]))
    }
    
    this.initialized = true
  }

  private hashPassword(password: string): string {
    return crypto.createHash('sha256').update(password).digest('hex')
  }

  async getAllDonations(): Promise<Donation[]> {
    await this.ensureDataDir()
    const data = await fs.readFile(DONATIONS_FILE, 'utf-8')
    return JSON.parse(data)
  }

  async getDonationById(id: string): Promise<Donation | null> {
    const donations = await this.getAllDonations()
    return donations.find(d => d.id === id) || null
  }

  async createDonation(donation: Omit<Donation, 'id' | 'createdAt' | 'updatedAt'>): Promise<Donation> {
    await this.ensureDataDir()
    const donations = await this.getAllDonations()
    const newDonation: Donation = {
      ...donation,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    donations.push(newDonation)
    await fs.writeFile(DONATIONS_FILE, JSON.stringify(donations, null, 2))
    return newDonation
  }

  async updateDonation(id: string, updates: Partial<Donation>): Promise<Donation | null> {
    const donations = await this.getAllDonations()
    const index = donations.findIndex(d => d.id === id)
    
    if (index === -1) return null
    
    donations[index] = {
      ...donations[index],
      ...updates,
      id: donations[index].id,
      createdAt: donations[index].createdAt,
      updatedAt: new Date().toISOString()
    }
    
    await fs.writeFile(DONATIONS_FILE, JSON.stringify(donations, null, 2))
    return donations[index]
  }

  async deleteDonation(id: string): Promise<boolean> {
    const donations = await this.getAllDonations()
    const filtered = donations.filter(d => d.id !== id)
    
    if (filtered.length === donations.length) return false
    
    await fs.writeFile(DONATIONS_FILE, JSON.stringify(filtered, null, 2))
    return true
  }

  async getUserByUsername(username: string): Promise<User | null> {
    await this.ensureDataDir()
    const data = await fs.readFile(USERS_FILE, 'utf-8')
    const users = JSON.parse(data)
    return users.find((u: User) => u.username === username) || null
  }

  async validateUser(username: string, password: string): Promise<User | null> {
    const user = await this.getUserByUsername(username)
    if (!user) return null
    
    const passwordHash = this.hashPassword(password)
    if (passwordHash !== user.passwordHash) return null
    
    return user
  }

  async updateUserPassword(username: string, newPassword: string): Promise<boolean> {
    await this.ensureDataDir()
    const data = await fs.readFile(USERS_FILE, 'utf-8')
    const users = JSON.parse(data)
    const index = users.findIndex((u: User) => u.username === username)
    
    if (index === -1) return false
    
    users[index].passwordHash = this.hashPassword(newPassword)
    await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2))
    return true
  }
}

export const db = new Database()