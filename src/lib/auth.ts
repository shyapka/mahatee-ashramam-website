import { NextRequest } from 'next/server'
import crypto from 'crypto'
import { db } from './db/database'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this-in-production'

interface JWTPayload {
  userId: string
  username: string
  role: string
  exp: number
}

export function createToken(payload: Omit<JWTPayload, 'exp'>): string {
  const exp = Math.floor(Date.now() / 1000) + (60 * 60 * 24) // 24 hours
  const data = { ...payload, exp }
  const header = { alg: 'HS256', typ: 'JWT' }
  
  const headerBase64 = Buffer.from(JSON.stringify(header)).toString('base64url')
  const payloadBase64 = Buffer.from(JSON.stringify(data)).toString('base64url')
  
  const signature = crypto
    .createHmac('sha256', JWT_SECRET)
    .update(`${headerBase64}.${payloadBase64}`)
    .digest('base64url')
  
  return `${headerBase64}.${payloadBase64}.${signature}`
}

export function verifyToken(token: string): JWTPayload | null {
  try {
    const [headerBase64, payloadBase64, signature] = token.split('.')
    
    const expectedSignature = crypto
      .createHmac('sha256', JWT_SECRET)
      .update(`${headerBase64}.${payloadBase64}`)
      .digest('base64url')
    
    if (signature !== expectedSignature) {
      return null
    }
    
    const payload = JSON.parse(Buffer.from(payloadBase64, 'base64url').toString())
    
    if (payload.exp < Math.floor(Date.now() / 1000)) {
      return null
    }
    
    return payload
  } catch {
    return null
  }
}

export async function authenticateRequest(request: NextRequest): Promise<JWTPayload | null> {
  const authHeader = request.headers.get('authorization')
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null
  }
  
  const token = authHeader.substring(7)
  return verifyToken(token)
}

export async function loginUser(username: string, password: string): Promise<string | null> {
  const user = await db.validateUser(username, password)
  if (!user) return null
  
  return createToken({
    userId: user.id,
    username: user.username,
    role: user.role
  })
}