'use client'

import { useState, useEffect } from 'react'

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalDonations: 0,
    monthlyDonations: 0,
    activeVolunteers: 0,
    totalChildren: 0,
    pendingMessages: 0,
    galleryImages: 0
  })

  useEffect(() => {
    // Simulate loading data
    setStats({
      totalDonations: 2450000,
      monthlyDonations: 125000,
      activeVolunteers: 45,
      totalChildren: 103,
      pendingMessages: 12,
      galleryImages: 287
    })
  }, [])

  const recentDonations = [
    { id: 1, name: 'Rajesh Kumar', amount: 5000, date: '2024-01-15', type: 'Monthly' },
    { id: 2, name: 'Priya Sharma', amount: 1500, date: '2024-01-15', type: 'Child Sponsorship' },
    { id: 3, name: 'Anonymous', amount: 10000, date: '2024-01-14', type: 'One-time' },
    { id: 4, name: 'Tech Corp Ltd', amount: 25000, date: '2024-01-14', type: 'Corporate' },
    { id: 5, name: 'Sunita Devi', amount: 2000, date: '2024-01-13', type: 'Monthly' },
  ]

  const recentMessages = [
    { id: 1, name: 'John Doe', subject: 'Volunteer Inquiry', date: '2024-01-15', priority: 'medium' },
    { id: 2, name: 'Sarah Wilson', subject: 'Partnership Proposal', date: '2024-01-15', priority: 'high' },
    { id: 3, name: 'Mike Johnson', subject: 'Donation Question', date: '2024-01-14', priority: 'low' },
    { id: 4, name: 'Lisa Chen', subject: 'Media Interview Request', date: '2024-01-14', priority: 'high' },
  ]

  const upcomingEvents = [
    { id: 1, title: 'Annual Sports Day', date: '2024-01-20', type: 'Event' },
    { id: 2, title: 'Volunteer Orientation', date: '2024-01-22', type: 'Training' },
    { id: 3, title: 'Medical Checkup Camp', date: '2024-01-25', type: 'Health' },
    { id: 4, title: 'Parent-Teacher Meeting', date: '2024-01-28', type: 'Education' },
  ]

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Welcome to Mahatee Ashramam Admin Panel</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="text-3xl mr-4">💰</div>
            <div>
              <p className="text-sm font-medium text-gray-600">Total Donations</p>
              <p className="text-2xl font-bold text-gray-900">₹{stats.totalDonations.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="text-3xl mr-4">📅</div>
            <div>
              <p className="text-sm font-medium text-gray-600">This Month</p>
              <p className="text-2xl font-bold text-gray-900">₹{stats.monthlyDonations.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="text-3xl mr-4">👥</div>
            <div>
              <p className="text-sm font-medium text-gray-600">Active Volunteers</p>
              <p className="text-2xl font-bold text-gray-900">{stats.activeVolunteers}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="text-3xl mr-4">👶</div>
            <div>
              <p className="text-sm font-medium text-gray-600">Total Children</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalChildren}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="text-3xl mr-4">💬</div>
            <div>
              <p className="text-sm font-medium text-gray-600">Pending Messages</p>
              <p className="text-2xl font-bold text-orange-600">{stats.pendingMessages}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="text-3xl mr-4">📸</div>
            <div>
              <p className="text-sm font-medium text-gray-600">Gallery Images</p>
              <p className="text-2xl font-bold text-gray-900">{stats.galleryImages}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts and Tables Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Donations */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Recent Donations</h2>
            <button className="text-orange-500 hover:text-orange-600 text-sm font-medium">
              View All
            </button>
          </div>
          <div className="space-y-3">
            {recentDonations.map((donation) => (
              <div key={donation.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{donation.name}</p>
                  <p className="text-sm text-gray-600">{donation.date} • {donation.type}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-green-600">₹{donation.amount.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Messages */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Recent Messages</h2>
            <button className="text-orange-500 hover:text-orange-600 text-sm font-medium">
              View All
            </button>
          </div>
          <div className="space-y-3">
            {recentMessages.map((message) => (
              <div key={message.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{message.name}</p>
                  <p className="text-sm text-gray-600">{message.subject}</p>
                </div>
                <div className="text-right">
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                    message.priority === 'high' ? 'bg-red-100 text-red-800' :
                    message.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {message.priority}
                  </span>
                  <p className="text-xs text-gray-500 mt-1">{message.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Upcoming Events</h2>
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            Add Event
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {upcomingEvents.map((event) => (
            <div key={event.id} className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                  event.type === 'Event' ? 'bg-blue-100 text-blue-800' :
                  event.type === 'Training' ? 'bg-green-100 text-green-800' :
                  event.type === 'Health' ? 'bg-red-100 text-red-800' :
                  'bg-purple-100 text-purple-800'
                }`}>
                  {event.type}
                </span>
              </div>
              <h3 className="font-medium text-gray-900 mb-1">{event.title}</h3>
              <p className="text-sm text-gray-600">{event.date}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="p-4 bg-blue-50 hover:bg-blue-100 rounded-lg text-center transition-colors">
            <div className="text-2xl mb-2">➕</div>
            <p className="text-sm font-medium text-blue-800">Add Child</p>
          </button>
          <button className="p-4 bg-green-50 hover:bg-green-100 rounded-lg text-center transition-colors">
            <div className="text-2xl mb-2">📊</div>
            <p className="text-sm font-medium text-green-800">Generate Report</p>
          </button>
          <button className="p-4 bg-purple-50 hover:bg-purple-100 rounded-lg text-center transition-colors">
            <div className="text-2xl mb-2">📷</div>
            <p className="text-sm font-medium text-purple-800">Upload Photos</p>
          </button>
          <button className="p-4 bg-orange-50 hover:bg-orange-100 rounded-lg text-center transition-colors">
            <div className="text-2xl mb-2">📝</div>
            <p className="text-sm font-medium text-orange-800">Update Content</p>
          </button>
        </div>
      </div>
    </div>
  )
}