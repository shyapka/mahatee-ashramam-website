import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { db } from '@/lib/db/database'

interface RazorpayPaymentEntity {
  id: string
  amount: number
  currency: string
  status: string
  order_id?: string
  international: boolean
  method?: string
  amount_refunded: number
  captured: boolean
  description?: string
  card_id?: string
  bank?: string
  wallet?: string
  vpa?: string
  email?: string
  contact?: string
  notes?: Record<string, any>
  fee?: number
  tax?: number
  error_code?: string
  error_description?: string
  created_at: number
}

interface RazorpayWebhookPayload {
  entity: string
  account_id: string
  event: string
  contains: string[]
  payload: {
    payment?: {
      entity: RazorpayPaymentEntity
    }
    order?: {
      entity: any
    }
  }
  created_at: number
}

function validateWebhookSignature(
  body: string,
  signature: string | null,
  secret: string
): boolean {
  if (!signature) return false

  try {
    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(body)
      .digest('hex')

    return crypto.timingSafeEqual(
      Buffer.from(signature),
      Buffer.from(expectedSignature)
    )
  } catch (error) {
    console.error('Error validating webhook signature:', error)
    return false
  }
}

function extractDonorInfo(payment: RazorpayPaymentEntity): {
  name: string
  email: string
  contact: string
} {
  const notes = payment.notes || {}

  return {
    name: notes.donor_name || notes.name || 'Anonymous',
    email: payment.email || notes.email || '',
    contact: payment.contact || notes.contact || ''
  }
}

export async function POST(request: NextRequest) {
  try {
    // Get raw body for signature verification
    const body = await request.text()

    // Get signature from headers
    const signature = request.headers.get('x-razorpay-signature')

    // Get webhook secret from environment
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET

    if (!webhookSecret) {
      console.error('RAZORPAY_WEBHOOK_SECRET not configured')
      return NextResponse.json(
        { error: 'Webhook secret not configured' },
        { status: 500 }
      )
    }

    // Validate signature
    const isValid = validateWebhookSignature(body, signature, webhookSecret)

    if (!isValid) {
      console.error('Invalid webhook signature')
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 401 }
      )
    }

    // Parse the webhook payload
    const webhookData: RazorpayWebhookPayload = JSON.parse(body)

    console.log(`📨 Received Razorpay webhook: ${webhookData.event}`)

    // Handle different events
    switch (webhookData.event) {
      case 'payment.captured':
        await handlePaymentCaptured(webhookData)
        break

      case 'payment.failed':
        await handlePaymentFailed(webhookData)
        break

      case 'payment.authorized':
        // Payment authorized but not yet captured
        console.log('Payment authorized:', webhookData.payload.payment?.entity.id)
        break

      default:
        console.log(`Unhandled event type: ${webhookData.event}`)
    }

    // Always return 200 to acknowledge receipt
    return NextResponse.json({
      success: true,
      message: 'Webhook processed successfully'
    })

  } catch (error) {
    console.error('❌ Webhook processing error:', error)

    // Return 200 even on error to prevent retries for malformed payloads
    // Log the error for debugging
    return NextResponse.json({
      success: false,
      message: 'Webhook processing failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}

async function handlePaymentCaptured(webhook: RazorpayWebhookPayload) {
  const payment = webhook.payload.payment?.entity

  if (!payment) {
    console.error('No payment entity in webhook payload')
    return
  }

  console.log(`💰 Processing captured payment: ${payment.id}`)

  try {
    // Extract donor information
    const donorInfo = extractDonorInfo(payment)

    // Convert amount from paise to rupees
    const amountInRupees = payment.amount / 100

    // Create donation record
    const donation = await db.createDonation({
      timestamp: new Date(payment.created_at * 1000).toISOString(),
      name: donorInfo.name,
      email: donorInfo.email,
      amount: amountInRupees,
      currency: 'INR',
      paymentMethod: payment.method || 'razorpay',
      location: 'india',
      referenceId: payment.id,
      message: payment.notes?.message || payment.description || '',
      status: 'Completed'
    })

    console.log(`✅ Donation saved: ${donation.id} for amount ₹${amountInRupees}`)

    // You can add additional processing here like:
    // - Sending confirmation email
    // - Updating analytics
    // - Triggering other workflows

  } catch (error) {
    console.error('Error saving donation:', error)
    throw error
  }
}

async function handlePaymentFailed(webhook: RazorpayWebhookPayload) {
  const payment = webhook.payload.payment?.entity

  if (!payment) {
    console.error('No payment entity in webhook payload')
    return
  }

  console.log(`❌ Payment failed: ${payment.id}`)
  console.log(`Reason: ${payment.error_code} - ${payment.error_description}`)

  try {
    // Extract donor information
    const donorInfo = extractDonorInfo(payment)

    // Convert amount from paise to rupees
    const amountInRupees = payment.amount / 100

    // Create donation record with failed status
    const donation = await db.createDonation({
      timestamp: new Date(payment.created_at * 1000).toISOString(),
      name: donorInfo.name,
      email: donorInfo.email,
      amount: amountInRupees,
      currency: 'INR',
      paymentMethod: payment.method || 'razorpay',
      location: 'india',
      referenceId: payment.id,
      message: `Failed: ${payment.error_code} - ${payment.error_description}`,
      status: 'Failed'
    })

    console.log(`📝 Failed donation recorded: ${donation.id}`)

  } catch (error) {
    console.error('Error recording failed donation:', error)
    throw error
  }
}

// GET method to verify the endpoint is accessible
export async function GET() {
  return NextResponse.json({
    message: 'Razorpay webhook endpoint',
    status: 'active',
    supportedEvents: [
      'payment.captured',
      'payment.failed',
      'payment.authorized'
    ]
  })
}