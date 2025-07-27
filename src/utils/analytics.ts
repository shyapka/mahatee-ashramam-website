// Analytics utility functions for donation tracking

declare global {
  interface Window {
    gtag: (command: string, targetId: string, config?: any) => void;
  }
}

// Track donation button clicks
export const trackDonationClick = (params: {
  location: 'us' | 'india' | 'homepage'
  amount?: number
  currency?: 'USD' | 'INR'
  source?: string
}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'donation_click', {
      event_category: 'donation',
      event_label: `${params.location}_${params.source || 'button'}`,
      value: params.amount || 0,
      currency: params.currency || 'USD',
      custom_map: {
        location: params.location,
        source: params.source
      }
    })
  }

  // Console log for development
  console.log('Donation Click Tracked:', params)
}

// Track donation amount selection
export const trackDonationAmountSelect = (params: {
  amount: number
  currency: 'USD' | 'INR'
  location: 'us' | 'india'
  title: string
}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'select_donation_amount', {
      event_category: 'donation',
      event_label: `${params.location}_${params.amount}${params.currency}`,
      value: params.amount,
      currency: params.currency,
      custom_map: {
        location: params.location,
        donation_title: params.title
      }
    })
  }

  console.log('Donation Amount Selected:', params)
}

// Track payment method selection
export const trackPaymentMethodSelect = (params: {
  method: string
  location: 'us' | 'india'
  amount: number
  currency: 'USD' | 'INR'
}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'select_payment_method', {
      event_category: 'donation',
      event_label: `${params.location}_${params.method}`,
      value: params.amount,
      currency: params.currency,
      custom_map: {
        payment_method: params.method,
        location: params.location
      }
    })
  }

  console.log('Payment Method Selected:', params)
}

// Track page visits
export const trackPageView = (page: string, title?: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'page_view', {
      page_title: title || page,
      page_location: window.location.href
    })
  }

  console.log('Page View Tracked:', { page, title })
}

// Track location detection results
export const trackLocationDetection = (params: {
  detectedCountry: string
  redirectTo: 'us' | 'india'
  source: 'ip' | 'geolocation' | 'fallback'
}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'location_detected', {
      event_category: 'donation',
      event_label: `${params.detectedCountry}_to_${params.redirectTo}`,
      custom_map: {
        detected_country: params.detectedCountry,
        redirect_to: params.redirectTo,
        detection_source: params.source
      }
    })
  }

  console.log('Location Detection Tracked:', params)
}
