import { useState } from 'react';

export default function AdminDashboard() {
  const [darkMode, setDarkMode] = useState(false);
  const [activeTimeFilter, setActiveTimeFilter] = useState('week');

  const stats = [
    {
      title: 'Total Users',
      value: '12,543',
      change: '+12%',
      changeType: 'increase',
      icon: 'users'
    },
    {
      title: 'Active IDs',
      value: '8,234',
      change: '+8%',
      changeType: 'increase',
      icon: 'id-card'
    },
    {
      title: 'Pending Reports',
      value: '47',
      change: '-23%',
      changeType: 'decrease',
      icon: 'exclamation'
    },
    {
      title: 'Benefits Applied',
      value: '1,856',
      change: '+15%',
      changeType: 'increase',
      icon: 'gift'
    }
  ];

  const quickLinks = [
    { title: 'Users Management', href: '/admin/users', icon: 'users', color: 'blue' },
    { title: 'Reports Management', href: '/reports', icon: 'document', color: 'red' },
    { title: 'Benefits Management', href: '/benefits', icon: 'gift', color: 'green' },
    { title: 'Voting Dashboard', href: '/admin/voting', icon: 'vote', color: 'blue' },
    { title: 'Applications Management', href: '/admin/applications', icon: 'clipboard', color: 'purple' },
    { title: 'Complaints Management', href: '/admin/complaints', icon: 'chat', color: 'orange' },
    { title: 'Reports Management', href: '/complaints', icon: 'chat', color: 'orange' },
    { title: 'Applications Tracking', href: '/applications', icon: 'clipboard', color: 'purple' },
    { title: 'Chat', href: '/admin/chat', icon: 'chat', color: 'purple' },
    { title: 'System Logs', href: '/logs', icon: 'terminal', color: 'gray' },
  ];

  const getIcon = (iconName) => {
    const icons = {
      users: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
        </svg>
      ),
      'id-card': (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
        </svg>
      ),
      exclamation: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 18.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
      ),
      gift: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
        </svg>
      ),
      document: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      chat: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
      clipboard: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
      vote: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      terminal: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      settings: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      logout: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
      )
    };
    return icons[iconName] || icons.document;
  };

  const getColorClasses = (color) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-600',
      red: 'bg-red-100 text-red-600',
      green: 'bg-green-100 text-green-600',
      orange: 'bg-orange-100 text-orange-600',
      purple: 'bg-purple-100 text-purple-600',
      gray: 'bg-gray-100 text-gray-600'
    };
    return colors[color] || colors.gray;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg">
        <div className="flex items-center justify-center h-16 px-4 bg-[#004040]">
          <h1 className="text-xl font-bold text-white">Admin Portal</h1>
        </div>
        
        <nav className="mt-5 px-2">
          <div className="space-y-1">
            <a href="/dashboard" className="bg-[#004040] text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md">
              <svg className="text-white mr-3 h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v3H8V5z" />
              </svg>
              Dashboard
            </a>
            
            {quickLinks.map((link) => (
              <a
                key={link.title}
                href={link.href}
                className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-2 py-2 text-sm font-medium rounded-md"
              >
                <div className="mr-3 h-6 w-6">
                  {getIcon(link.icon)}
                </div>
                {link.title}
              </a>
            ))}
            
            <hr className="my-4" />
            
            <a href="/settings" className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-2 py-2 text-sm font-medium rounded-md">
              {getIcon('settings')}
              <span className="ml-3">Settings</span>
            </a>
            
            <button 
              onClick={() => window.location.href = '/'}
              className="w-full text-left text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-2 py-2 text-sm font-medium rounded-md"
            >
              {getIcon('logout')}
              <span className="ml-3">Logout</span>
            </button>
          </div>
        </nav>
      </div>

      {/* Main content */}
      <div className="pl-64">
        {/* Top bar */}
        <div className="bg-white shadow">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">Theme:</span>
                  <button
                    onClick={() => setDarkMode(!darkMode)}
                    className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-[#004040] focus:ring-offset-2"
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${darkMode ? 'translate-x-6' : 'translate-x-1'}`} />
                  </button>
                </div>
                
                <div className="flex items-center">
                  <div className="text-sm">
                    <div className="font-medium text-gray-700">Admin User</div>
                    <div className="text-gray-500">admin@example.com</div>
                  </div>
                  <div className="ml-3 h-8 w-8 rounded-full bg-[#004040] flex items-center justify-center">
                    <span className="text-sm font-medium text-white">A</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard content */}
        <main className="py-6">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Time filter */}
            <div className="mb-6">
              <div className="flex space-x-2">
                {['day', 'week', 'month'].map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setActiveTimeFilter(filter)}
                    className={`px-3 py-1 text-sm rounded-md ${
                      activeTimeFilter === filter
                        ? 'bg-[#004040] text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {filter.charAt(0).toUpperCase() + filter.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
              {stats.map((stat) => (
                <div key={stat.title} className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div className={`p-2 rounded-md ${stat.changeType === 'increase' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                          {getIcon(stat.icon)}
                        </div>
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">{stat.title}</dt>
                          <dd>
                            <div className="text-lg font-medium text-gray-900">{stat.value}</div>
                          </dd>
                        </dl>
                      </div>
                      <div className={`text-sm ${stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'}`}>
                        {stat.change}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Charts placeholder */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <div className="bg-white shadow rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">User Registration Trends</h3>
                <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
                  <p className="text-gray-500">Chart placeholder - User registrations over time</p>
                </div>
              </div>
              
              <div className="bg-white shadow rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Application Status Distribution</h3>
                <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
                  <p className="text-gray-500">Chart placeholder - Application statuses</p>
                </div>
              </div>
            </div>

            {/* Quick actions */}
            <div className="bg-white shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                  {quickLinks.map((link) => (
                    <a
                      key={link.title}
                      href={link.href}
                      className="relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-[#004040] hover:bg-gray-50 rounded-lg border border-gray-200"
                    >
                      <div>
                        <span className={`rounded-lg inline-flex p-3 ring-4 ring-white ${getColorClasses(link.color)}`}>
                          {getIcon(link.icon)}
                        </span>
                      </div>
                      <div className="mt-4">
                        <h3 className="text-sm font-medium text-gray-900">
                          <span className="absolute inset-0" aria-hidden="true" />
                          {link.title}
                        </h3>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
