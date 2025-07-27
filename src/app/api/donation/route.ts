import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db/database'
import { authenticateRequest } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    
    // Save to database
    const donation = await db.createDonation({
      timestamp: data.timestamp || new Date().toISOString(),
      name: data.name || 'Anonymous',
      email: data.email || '',
      amount: data.amount || 0,
      currency: data.currency || 'USD',
      paymentMethod: data.payment_method || '',
      location: data.location || '',
      referenceId: data.reference_id || '',
      message: data.message || '',
      status: data.status || 'New'
    })
    
    console.log('✅ Donation saved to database:', donation.id)
    
    return NextResponse.json({ 
      success: true, 
      message: 'Donation recorded successfully',
      data: {
        id: donation.id,
        timestamp: donation.timestamp,
        name: donation.name,
        amount: donation.amount,
        currency: donation.currency,
        location: donation.location
      }
    })
    
  } catch (error) {
    console.error('❌ Error recording donation:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to record donation' }, 
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    // Require authentication for viewing donations
    const auth = await authenticateRequest(request)
    if (!auth || auth.role !== 'admin') {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }
    
    const donations = await db.getAllDonations()
    
    return NextResponse.json({
      success: true,
      data: donations
    })
    
  } catch (error) {
    console.error('Error fetching donations:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch donations' },
      { status: 500 }
    )
  }
}
