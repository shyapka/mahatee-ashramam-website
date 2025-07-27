'use client'

import { useState, useEffect } from 'react'
import { RefreshCw, Download } from 'lucide-react'

interface Donation {
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

export default function DonationsPage() {
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [donations, setDonations] = useState<Donation[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    const savedToken = localStorage.getItem('adminToken')
    if (savedToken) {
      setToken(savedToken)
      fetchDonations(savedToken)
    } else {
      setIsLoading(false)
    }
  }, [])

  const fetchDonations = async (authToken: string) => {
    try {
      const response = await fetch('/api/donation', {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      })

      const data = await response.json()

      if (data.success) {
        setDonations(data.data.sort((a: Donation, b: Donation) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        ))
      } else if (response.status === 401) {
        localStorage.removeItem('adminToken')
        window.location.reload()
      }
    } catch (error) {
      console.error('Error fetching donations:', error)
    } finally {
      setIsLoading(false)
    }
  }


  const filteredDonations = donations.filter(donation => {
    const matchesFilter = filter === 'all' || donation.status.toLowerCase() === filter.toLowerCase()
    const matchesSearch = donation.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (donation.email?.toLowerCase().includes(searchTerm.toLowerCase()) || false) ||
                         (donation.referenceId?.toLowerCase().includes(searchTerm.toLowerCase()) || false)
    return matchesFilter && matchesSearch
  })

  const totalAmount = {
    USD: donations.filter(d => d.status === 'Verified' && d.currency === 'USD').reduce((sum, d) => sum + d.amount, 0),
    INR: donations.filter(d => d.status === 'Verified' && d.currency === 'INR').reduce((sum, d) => sum + d.amount, 0)
  }

  const exportToCSV = () => {
    const headers = ['Date', 'Name', 'Email', 'Amount', 'Currency', 'Payment Method', 'Location', 'Reference ID', 'Status', 'Message']
    const rows = filteredDonations.map(d => [
      new Date(d.createdAt).toLocaleString(),
      d.name,
      d.email || '',
      d.amount,
      d.currency,
      d.paymentMethod,
      d.location === 'india' ? 'India' : 'USA',
      d.referenceId || '',
      d.status,
      d.message || ''
    ])

    const csv = [headers, ...rows].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `donations_${new Date().toISOString().split('T')[0]}.csv`
    a.click()
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin text-orange-500 mx-auto mb-4" />
          <p className="text-gray-600">Loading donations...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Donations</h1>
          <p className="text-gray-600">Manage and track all donations</p>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => fetchDonations(token!)}
            className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-gray-900"
          >
            <RefreshCw className="h-4 w-4" />
            Refresh
          </button>
          <button 
            onClick={exportToCSV}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            Export Report
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="text-3xl mr-4">💰</div>
            <div>
              <p className="text-sm font-medium text-gray-600">USD Total</p>
              <p className="text-2xl font-bold text-green-600">${totalAmount.USD.toFixed(2)}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="text-3xl mr-4">🔄</div>
            <div>
              <p className="text-sm font-medium text-gray-600">INR Total</p>
              <p className="text-2xl font-bold text-blue-600">₹{totalAmount.INR.toFixed(2)}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="text-3xl mr-4">👥</div>
            <div>
              <p className="text-sm font-medium text-gray-600">Total Donors</p>
              <p className="text-2xl font-bold text-purple-600">{donations.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="text-3xl mr-4">⏳</div>
            <div>
              <p className="text-sm font-medium text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-orange-600">
                {donations.filter(d => d.status === 'Pending').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
          <div className="flex gap-2">
            {['all', 'new', 'verified', 'processed'].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 rounded-lg font-medium capitalize transition-colors ${
                  filter === status
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Donations Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Donor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Method
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Reference
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredDonations.map((donation) => (
                <tr key={donation.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <p className="font-medium text-gray-900">{donation.name}</p>
                      {donation.email && (
                        <p className="text-sm text-gray-500">{donation.email}</p>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <p className="font-bold text-green-600">{donation.currency} {donation.amount.toLocaleString()}</p>
                      <p className="text-sm text-gray-500">{donation.location === 'india' ? 'India' : 'USA'}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                      {donation.paymentMethod}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {donation.referenceId || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(donation.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                      donation.status === 'New' ? 'bg-yellow-100 text-yellow-800' :
                      donation.status === 'Verified' ? 'bg-blue-100 text-blue-800' :
                      donation.status === 'Processed' ? 'bg-green-100 text-green-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {donation.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-orange-600 hover:text-orange-900">
                        View
                      </button>
                      <button className="text-blue-600 hover:text-blue-900">
                        Receipt
                      </button>
                      {donation.status === 'New' && (
                        <button className="text-green-600 hover:text-green-900">
                          Verify
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredDonations.length === 0 && (
        <div className="bg-white p-12 rounded-lg shadow text-center">
          <div className="text-4xl mb-4">🔍</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No donations found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  )
}