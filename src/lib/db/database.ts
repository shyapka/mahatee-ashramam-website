import { supabase } from '@/lib/supabase'
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
  private hashPassword(password: string): string {
    return crypto.createHash('sha256').update(password).digest('hex')
  }

  async getAllDonations(): Promise<Donation[]> {
    try {
      const { data, error } = await supabase
        .from('donations')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching donations:', error)
        return []
      }

      // Map database fields to interface
      return (data || []).map(row => ({
        id: row.id,
        timestamp: row.timestamp,
        name: row.name,
        email: row.email,
        amount: row.amount,
        currency: row.currency,
        paymentMethod: row.payment_method,
        location: row.location,
        referenceId: row.reference_id,
        message: row.message,
        status: row.status,
        createdAt: row.created_at,
        updatedAt: row.updated_at
      }))
    } catch (error) {
      console.error('Database error:', error)
      return []
    }
  }

  async getDonationById(id: string): Promise<Donation | null> {
    try {
      const { data, error } = await supabase
        .from('donations')
        .select('*')
        .eq('id', id)
        .single()

      if (error || !data) {
        return null
      }

      return {
        id: data.id,
        timestamp: data.timestamp,
        name: data.name,
        email: data.email,
        amount: data.amount,
        currency: data.currency,
        paymentMethod: data.payment_method,
        location: data.location,
        referenceId: data.reference_id,
        message: data.message,
        status: data.status,
        createdAt: data.created_at,
        updatedAt: data.updated_at
      }
    } catch (error) {
      console.error('Error fetching donation:', error)
      return null
    }
  }

  async createDonation(donation: Omit<Donation, 'id' | 'createdAt' | 'updatedAt'>): Promise<Donation> {
    try {
      const { data, error } = await supabase
        .from('donations')
        .insert({
          timestamp: donation.timestamp,
          name: donation.name,
          email: donation.email,
          amount: donation.amount,
          currency: donation.currency,
          payment_method: donation.paymentMethod,
          location: donation.location,
          reference_id: donation.referenceId,
          message: donation.message,
          status: donation.status
        })
        .select()
        .single()

      if (error) {
        console.error('Error creating donation:', error)
        throw new Error('Failed to create donation')
      }

      console.log('✅ Donation saved to Supabase:', data.id)

      return {
        id: data.id,
        timestamp: data.timestamp,
        name: data.name,
        email: data.email,
        amount: data.amount,
        currency: data.currency,
        paymentMethod: data.payment_method,
        location: data.location,
        referenceId: data.reference_id,
        message: data.message,
        status: data.status,
        createdAt: data.created_at,
        updatedAt: data.updated_at
      }
    } catch (error) {
      console.error('Database error creating donation:', error)
      throw error
    }
  }

  async updateDonation(id: string, updates: Partial<Donation>): Promise<Donation | null> {
    try {
      const updateData: any = {}
      
      if (updates.name) updateData.name = updates.name
      if (updates.email) updateData.email = updates.email
      if (updates.amount) updateData.amount = updates.amount
      if (updates.currency) updateData.currency = updates.currency
      if (updates.paymentMethod) updateData.payment_method = updates.paymentMethod
      if (updates.location) updateData.location = updates.location
      if (updates.referenceId) updateData.reference_id = updates.referenceId
      if (updates.message) updateData.message = updates.message
      if (updates.status) updateData.status = updates.status

      const { data, error } = await supabase
        .from('donations')
        .update(updateData)
        .eq('id', id)
        .select()
        .single()

      if (error || !data) {
        return null
      }

      return {
        id: data.id,
        timestamp: data.timestamp,
        name: data.name,
        email: data.email,
        amount: data.amount,
        currency: data.currency,
        paymentMethod: data.payment_method,
        location: data.location,
        referenceId: data.reference_id,
        message: data.message,
        status: data.status,
        createdAt: data.created_at,
        updatedAt: data.updated_at
      }
    } catch (error) {
      console.error('Error updating donation:', error)
      return null
    }
  }

  async deleteDonation(id: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('donations')
        .delete()
        .eq('id', id)

      return !error
    } catch (error) {
      console.error('Error deleting donation:', error)
      return false
    }
  }

  async getUserByUsername(username: string): Promise<User | null> {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('username', username)
        .single()

      if (error || !data) {
        return null
      }

      return {
        id: data.id,
        username: data.username,
        passwordHash: data.password_hash,
        role: data.role,
        createdAt: data.created_at
      }
    } catch (error) {
      console.error('Error fetching user:', error)
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
    try {
      const { error } = await supabase
        .from('users')
        .update({ password_hash: this.hashPassword(newPassword) })
        .eq('username', username)

      return !error
    } catch (error) {
      console.error('Error updating user password:', error)
      return false
    }
  }
}

export const db = new Database()