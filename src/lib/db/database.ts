import { getStore } from '@netlify/blobs'
import crypto from 'crypto'

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
  private donationsStore = getStore('donations')
  private usersStore = getStore('users')
  private initialized = false

  private async ensureInitialized() {
    if (this.initialized) return
    
    // Initialize users if not exists
    try {
      const users = await this.usersStore.get('users.json', { type: 'json' })
      if (!users) {
        const defaultAdmin = {
          id: crypto.randomUUID(),
          username: 'admin',
          passwordHash: this.hashPassword('admin123'),
          role: 'admin',
          createdAt: new Date().toISOString()
        }
        await this.usersStore.set('users.json', [defaultAdmin])
      }
    } catch (error) {
      console.log('Initializing users store...')
      const defaultAdmin = {
        id: crypto.randomUUID(),
        username: 'admin',
        passwordHash: this.hashPassword('admin123'),
        role: 'admin',
        createdAt: new Date().toISOString()
      }
      await this.usersStore.set('users.json', [defaultAdmin])
    }

    // Initialize donations if not exists
    try {
      const donations = await this.donationsStore.get('donations.json', { type: 'json' })
      if (!donations) {
        await this.donationsStore.set('donations.json', [])
      }
    } catch (error) {
      console.log('Initializing donations store...')
      await this.donationsStore.set('donations.json', [])
    }
    
    this.initialized = true
  }

  private hashPassword(password: string): string {
    return crypto.createHash('sha256').update(password).digest('hex')
  }

  async getAllDonations(): Promise<Donation[]> {
    await this.ensureInitialized()
    try {
      const donations = await this.donationsStore.get('donations.json', { type: 'json' }) as Donation[]
      return donations || []
    } catch (error) {
      console.error('Error getting donations:', error)
      return []
    }
  }

  async getDonationById(id: string): Promise<Donation | null> {
    const donations = await this.getAllDonations()
    return donations.find(d => d.id === id) || null
  }

  async createDonation(donation: Omit<Donation, 'id' | 'createdAt' | 'updatedAt'>): Promise<Donation> {
    await this.ensureInitialized()
    const donations = await this.getAllDonations()
    
    const newDonation: Donation = {
      ...donation,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    
    donations.push(newDonation)
    await this.donationsStore.set('donations.json', donations)
    
    console.log('✅ Donation saved to Netlify Blobs:', newDonation.id)
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
    
    await this.donationsStore.set('donations.json', donations)
    return donations[index]
  }

  async deleteDonation(id: string): Promise<boolean> {
    const donations = await this.getAllDonations()
    const filtered = donations.filter(d => d.id !== id)
    
    if (filtered.length === donations.length) return false
    
    await this.donationsStore.set('donations.json', filtered)
    return true
  }

  async getUserByUsername(username: string): Promise<User | null> {
    await this.ensureInitialized()
    try {
      const users = await this.usersStore.get('users.json', { type: 'json' }) as User[]
      return users?.find((u: User) => u.username === username) || null
    } catch (error) {
      console.error('Error getting user:', error)
      return null
    }
  }

  async validateUser(username: string, password: string): Promise<User | null> {
    const user = await this.getUserByUsername(username)
    if (!user) return null
    
    const passwordHash = this.hashPassword(password)
    if (passwordHash !== user.passwordHash) return null
    
    return user
  }

  async updateUserPassword(username: string, newPassword: string): Promise<boolean> {
    await this.ensureInitialized()
    try {
      const users = await this.usersStore.get('users.json', { type: 'json' }) as User[]
      if (!users) return false
      
      const index = users.findIndex((u: User) => u.username === username)
      if (index === -1) return false
      
      users[index].passwordHash = this.hashPassword(newPassword)
      await this.usersStore.set('users.json', users)
      return true
    } catch (error) {
      console.error('Error updating user password:', error)
      return false
    }
  }
}

export const db = new Database()