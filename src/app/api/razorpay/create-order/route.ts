import { NextRequest, NextResponse } from 'next/server'
import Razorpay from 'razorpay'

interface CreateOrderRequest {
  amount: number
  currency: string
  receipt?: string
  notes?: Record<string, any>
}

export async function POST(request: NextRequest) {
  try {
    // Get API keys from environment
    const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID
    const keySecret = process.env.RAZORPAY_KEY_SECRET

    if (!keyId || !keySecret) {
      console.error('Razorpay API keys not configured')
      return NextResponse.json(
        { error: 'Payment service not configured' },
        { status: 500 }
      )
    }

    const body: CreateOrderRequest = await request.json()
    const { amount, currency = 'INR', receipt, notes } = body

    // Validate required fields
    if (!amount || amount <= 0) {
      return NextResponse.json(
        { error: 'Valid amount is required' },
        { status: 400 }
      )
    }

    // Initialize Razorpay instance
    const razorpay = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    })

    // Create order
    const orderOptions = {
      amount: Math.round(amount * 100), // Convert to paise
      currency: currency.toUpperCase(),
      receipt: receipt || `donation_${Date.now()}`,
      notes: notes || {}
    }

    console.log('Creating Razorpay order:', orderOptions)

    const order = await razorpay.orders.create(orderOptions)

    console.log('✅ Razorpay order created:', order.id)

    return NextResponse.json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      receipt: order.receipt
    })

  } catch (error) {
    console.error('❌ Error creating Razorpay order:', error)

    return NextResponse.json(
      {
        error: 'Failed to create payment order',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

// GET method for testing
export async function GET() {
  return NextResponse.json({
    message: 'Razorpay order creation endpoint',
    status: 'active',
    keyConfigured: !!process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    secretConfigured: !!process.env.RAZORPAY_KEY_SECRET
  })
}