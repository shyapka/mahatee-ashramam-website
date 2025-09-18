import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    // Get raw body
    const body = await request.text()

    // Log everything for debugging
    console.log('=== RAZORPAY WEBHOOK DEBUG ===')
    console.log('Headers:', Object.fromEntries(request.headers.entries()))
    console.log('Body:', body)

    // Parse JSON
    let webhookData
    try {
      webhookData = JSON.parse(body)
      console.log('Parsed webhook data:', JSON.stringify(webhookData, null, 2))
    } catch (e) {
      console.error('Failed to parse JSON:', e)
      return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
    }

    // Check environment variables
    console.log('Environment check:')
    console.log('- RAZORPAY_WEBHOOK_SECRET exists:', !!process.env.RAZORPAY_WEBHOOK_SECRET)
    console.log('- NEXT_PUBLIC_SUPABASE_URL exists:', !!process.env.NEXT_PUBLIC_SUPABASE_URL)
    console.log('- NEXT_PUBLIC_SUPABASE_ANON_KEY exists:', !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

    // Log the event details
    console.log('Event:', webhookData.event)
    console.log('Payment ID:', webhookData.payload?.payment?.entity?.id)
    console.log('Amount:', webhookData.payload?.payment?.entity?.amount)

    // Try to extract key fields safely
    const payment = webhookData.payload?.payment?.entity
    if (payment) {
      console.log('Payment details:')
      console.log('- ID:', payment.id)
      console.log('- Amount:', payment.amount)
      console.log('- Currency:', payment.currency)
      console.log('- Status:', payment.status)
      console.log('- Email:', payment.email)
      console.log('- Contact:', payment.contact)
      console.log('- Notes:', JSON.stringify(payment.notes))
    }

    return NextResponse.json({
      success: true,
      message: 'Debug webhook received',
      event: webhookData.event,
      paymentId: payment?.id
    })

  } catch (error) {
    console.error('❌ Debug webhook error:', error)
    console.error('Error stack:', error instanceof Error ? error.stack : 'Unknown error')

    return NextResponse.json({
      success: false,
      error: 'Debug webhook failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Razorpay debug webhook endpoint',
    status: 'active',
    purpose: 'Debugging webhook issues without database operations'
  })
}