'use client'

import { useState } from 'react'

export default function VolunteersPage() {
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  // Mock volunteers data
  const volunteers = [
    {
      id: 1,
      name: 'Sarah Johnson',
      email: 'sarah@email.com',
      phone: '+91 9876543210',
      skills: 'Teaching, Mathematics',
      availability: 'Weekends',
      status: 'Active',
      joinDate: '2023-06-15',
      lastActivity: '2024-01-14',
      hoursContributed: 120
    },
    {
      id: 2,
      name: 'Michael Chen',
      email: 'michael@email.com',
      phone: '+91 9876543211',
      skills: 'Arts & Crafts, Music',
      availability: 'Weekday evenings',
      status: 'Active',
      joinDate: '2023-08-20',
      lastActivity: '2024-01-13',
      hoursContributed: 85
    },
    {
      id: 3,
      name: 'Priya Patel',
      email: 'priya@email.com',
      phone: '+91 9876543212',
      skills: 'Computer Skills, English',
      availability: 'Flexible',
      status: 'Pending',
      joinDate: '2024-01-10',
      lastActivity: 'N/A',
      hoursContributed: 0
    },
    {
      id: 4,
      name: 'David Smith',
      email: 'david@email.com',
      phone: '+91 9876543213',
      skills: 'Sports, Physical Training',
      availability: 'Saturdays',
      status: 'Inactive',
      joinDate: '2023-03-12',
      lastActivity: '2023-12-20',
      hoursContributed: 65
    },
    {
      id: 5,
      name: 'Anita Kumar',
      email: 'anita@email.com',
      phone: '+91 9876543214',
      skills: 'Counseling, Psychology',
      availability: 'Weekdays',
      status: 'Active',
      joinDate: '2023-09-05',
      lastActivity: '2024-01-15',
      hoursContributed: 95
    }
  ]

  const filteredVolunteers = volunteers.filter(volunteer => {
    const matchesFilter = filter === 'all' || volunteer.status.toLowerCase() === filter
    const matchesSearch = volunteer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         volunteer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         volunteer.skills.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const activeVolunteers = volunteers.filter(v => v.status === 'Active').length
  const pendingVolunteers = volunteers.filter(v => v.status === 'Pending').length
  const totalHours = volunteers.reduce((sum, v) => sum + v.hoursContributed, 0)

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Volunteers</h1>
          <p className="text-gray-600">Manage volunteer applications and activities</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
            Add Volunteer
          </button>
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
            Export List
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="text-3xl mr-4">👥</div>
            <div>
              <p className="text-sm font-medium text-gray-600">Active Volunteers</p>
              <p className="text-2xl font-bold text-green-600">{activeVolunteers}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="text-3xl mr-4">⏳</div>
            <div>
              <p className="text-sm font-medium text-gray-600">Pending Applications</p>
              <p className="text-2xl font-bold text-orange-600">{pendingVolunteers}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="text-3xl mr-4">⏱️</div>
            <div>
              <p className="text-sm font-medium text-gray-600">Total Hours</p>
              <p className="text-2xl font-bold text-blue-600">{totalHours}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="text-3xl mr-4">📊</div>
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Hours/Volunteer</p>
              <p className="text-2xl font-bold text-purple-600">
                {Math.round(totalHours / volunteers.length)}
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
              placeholder="Search by name, email, or skills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
          <div className="flex gap-2">
            {['all', 'active', 'pending', 'inactive'].map((status) => (
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

      {/* Volunteers Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredVolunteers.map((volunteer) => (
          <div key={volunteer.id} className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-orange-600 font-semibold text-lg">
                    {volunteer.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{volunteer.name}</h3>
                  <p className="text-sm text-gray-600">{volunteer.email}</p>
                </div>
              </div>
              <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                volunteer.status === 'Active' ? 'bg-green-100 text-green-800' :
                volunteer.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {volunteer.status}
              </span>
            </div>

            <div className="space-y-3">
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase">Skills</p>
                <p className="text-sm text-gray-900">{volunteer.skills}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase">Availability</p>
                <p className="text-sm text-gray-900">{volunteer.availability}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase">Join Date</p>
                  <p className="text-sm text-gray-900">{volunteer.joinDate}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase">Hours</p>
                  <p className="text-sm font-semibold text-blue-600">{volunteer.hoursContributed}</p>
                </div>
              </div>
            </div>

            <div className="mt-6 flex gap-2">
              <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-lg text-sm font-medium transition-colors">
                View Profile
              </button>
              {volunteer.status === 'Pending' && (
                <button className="flex-1 bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors">
                  Approve
                </button>
              )}
              {volunteer.status === 'Active' && (
                <button className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors">
                  Contact
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredVolunteers.length === 0 && (
        <div className="bg-white p-12 rounded-lg shadow text-center">
          <div className="text-4xl mb-4">🔍</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No volunteers found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria</p>
        </div>
      )}

      {/* Recent Activity */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Volunteer Activity</h2>
        <div className="space-y-3">
          {[
            { name: 'Sarah Johnson', activity: 'Conducted math tutoring session', time: '2 hours ago' },
            { name: 'Michael Chen', activity: 'Led art and craft workshop', time: '1 day ago' },
            { name: 'Anita Kumar', activity: 'Counseling session with children', time: '2 days ago' },
            { name: 'New Application', activity: 'Priya Patel submitted volunteer application', time: '3 days ago' }
          ].map((activity, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">{activity.name}</p>
                <p className="text-sm text-gray-600">{activity.activity}</p>
              </div>
              <p className="text-xs text-gray-500">{activity.time}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}