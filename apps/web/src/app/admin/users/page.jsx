'use client';

import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  Download,
  Eye,
  Edit,
  Trash2,
  UserCheck,
  UserX,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Shield,
  AlertTriangle
} from 'lucide-react';
import ViewUserDetailModal from '../../../components/ViewUserDetailModal';

export default function AdminUsersPage() {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const usersPerPage = 10;

  useEffect(() => {
    // DUMMY ONLY – REMOVE IN PRODUCTION
    setTimeout(() => {
      setUsers([
        {
          id: 1,
          name: 'Adebayo Johnson',
          email: 'adebayo.j@email.com',
          phone: '+2348123456789',
          dob: '1990-05-20',
          gender: 'Male',
          nin: '12345678901',
          status: 'verified',
          role: 'Citizen',
          joinDate: '2024-01-15',
          lastLogin: '2024-02-10',
          location: 'Lagos, Nigeria',
          documentCount: 3,
          avatar: null,
          votingActivity: {
            totalVotesCast: 5,
            lastVoteCastDate: '2024-02-01',
            electionsParticipatedIn: [
              { name: 'General Election 2024', date: '2024-02-01', status: 'Completed', votedCandidate: 'Candidate A' },
              { name: 'Local Council Election', date: '2023-11-10', status: 'Completed', votedCandidate: 'Candidate X' },
            ],
          },
          uploadedId: true,
          verificationStatus: 'Verified',
        },
        {
          id: 2,
          name: 'John Smith',
          email: 'john.smith@email.com',
          phone: '+12025550101',
          dob: '1988-11-12',
          gender: 'Male',
          nin: '98765432109',
          status: 'pending',
          role: 'Citizen',
          joinDate: '2024-02-08',
          lastLogin: '2024-02-09',
          location: 'Washington D.C., USA',
          documentCount: 1,
          avatar: null,
          votingActivity: {
            totalVotesCast: 0,
            lastVoteCastDate: 'N/A',
            electionsParticipatedIn: [],
          },
          uploadedId: false,
          verificationStatus: 'Pending',
        },
        {
          id: 3,
          name: 'Marie Dubois',
          email: 'marie.dubois@email.com',
          phone: '+33123456789',
          dob: '1995-03-01',
          gender: 'Female',
          nin: '12345098765',
          status: 'verified',
          role: 'Official',
          joinDate: '2024-01-20',
          lastLogin: '2024-02-11',
          location: 'Paris, France',
          documentCount: 4,
          avatar: null,
          votingActivity: {
            totalVotesCast: 2,
            lastVoteCastDate: '2024-01-28',
            electionsParticipatedIn: [
              { name: 'General Election 2024', date: '2024-01-28', status: 'Completed', votedCandidate: 'Candidate C' },
            ],
          },
          uploadedId: true,
          verificationStatus: 'Verified',
        },
        {
          id: 4,
          name: 'Yuki Tanaka',
          email: 'yuki.tanaka@email.com',
          phone: '+81345678901',
          dob: '1975-07-07',
          gender: 'Female',
          nin: '54321678901',
          status: 'suspended',
          role: 'Citizen',
          joinDate: '2024-01-10',
          lastLogin: '2024-01-25',
          location: 'Tokyo, Japan',
          documentCount: 2,
          avatar: null,
          votingActivity: {
            totalVotesCast: 1,
            lastVoteCastDate: '2024-01-15',
            electionsParticipatedIn: [
              { name: 'General Election 2024', date: '2024-01-15', status: 'Completed', votedCandidate: 'Candidate B' },
            ],
          },
          uploadedId: true,
          verificationStatus: 'Suspended',
        },
        {
          id: 5,
          name: 'Klaus Müller',
          email: 'klaus.muller@email.com',
          phone: '+493012345678',
          dob: '1982-09-18',
          gender: 'Male',
          nin: '10987654321',
          status: 'verified',
          role: 'Admin',
          joinDate: '2024-02-01',
          lastLogin: '2024-02-11',
          location: 'Berlin, Germany',
          documentCount: 3,
          avatar: null,
          votingActivity: {
            totalVotesCast: 0,
            lastVoteCastDate: 'N/A',
            electionsParticipatedIn: [],
          },
          uploadedId: true,
          verificationStatus: 'Verified',
        },
        {
          id: 6,
          name: 'Chioma Eze',
          email: 'chioma.eze@email.com',
          phone: '+2348678901234',
          dob: '1993-01-25',
          gender: 'Female',
          nin: '67890123456',
          status: 'pending',
          role: 'Citizen',
          joinDate: '2024-02-05',
          lastLogin: '2024-02-10',
          location: 'Enugu, Nigeria',
          documentCount: 1,
          avatar: null,
          votingActivity: {
            totalVotesCast: 0,
            lastVoteCastDate: 'N/A',
            electionsParticipatedIn: [],
          },
          uploadedId: false,
          verificationStatus: 'Pending',
        },
        {
          id: 7,
          name: 'Emily White',
          email: 'emily.white@email.com',
          phone: '+13125550102',
          dob: '1991-04-03',
          gender: 'Female',
          nin: '23456789012',
          status: 'verified',
          role: 'Citizen',
          joinDate: '2024-01-25',
          lastLogin: '2024-02-11',
          location: 'Chicago, USA',
          documentCount: 2,
          avatar: null,
          votingActivity: {
            totalVotesCast: 3,
            lastVoteCastDate: '2024-02-05',
            electionsParticipatedIn: [
              { name: 'General Election 2024', date: '2024-02-05', status: 'Completed', votedCandidate: 'Candidate A' },
            ],
          },
          uploadedId: true,
          verificationStatus: 'Verified',
        },
        {
          id: 8,
          name: 'Lucas Martin',
          email: 'lucas.martin@email.com',
          phone: '+33456789012',
          dob: '1985-08-22',
          gender: 'Male',
          nin: '34567890123',
          status: 'verified',
          role: 'Citizen',
          joinDate: '2024-01-30',
          lastLogin: '2024-02-10',
          location: 'Marseille, France',
          documentCount: 3,
          avatar: null,
          votingActivity: {
            totalVotesCast: 1,
            lastVoteCastDate: '2024-01-30',
            electionsParticipatedIn: [
              { name: 'General Election 2024', date: '2024-01-30', status: 'Completed', votedCandidate: 'Candidate B' },
            ],
          },
          uploadedId: true,
          verificationStatus: 'Verified',
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'verified': return 'text-green-700 bg-green-100';
      case 'pending': return 'text-yellow-700 bg-yellow-100';
      case 'suspended': return 'text-red-700 bg-red-100';
      default: return 'text-gray-700 bg-gray-100';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'verified': return <UserCheck className="h-4 w-4" />;
      case 'pending': return <AlertTriangle className="h-4 w-4" />;
      case 'suspended': return <UserX className="h-4 w-4" />;
      default: return <Users className="h-4 w-4" />;
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.nin.includes(searchTerm);
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const startIndex = (currentPage - 1) * usersPerPage;
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + usersPerPage);

  const handleUserAction = (user, action) => {
    switch (action) {
      case 'view':
        setSelectedUser(user);
        setIsModalOpen(true);
        break;
      case 'edit':
        alert('Edit user functionality');
        break;
      case 'suspend':
        if (confirm('Are you sure you want to suspend this user?')) {
          setUsers(users.map(u => 
            u.id === user.id ? { ...u, status: 'suspended' } : u
          ));
        }
        break;
      case 'activate':
        if (confirm('Are you sure you want to activate this user?')) {
          setUsers(users.map(u => 
            u.id === user.id ? { ...u, status: 'verified' } : u
          ));
        }
        break;
      case 'verify':
        if (confirm('Are you sure you want to verify this user?')) {
          setUsers(users.map(u => 
            u.id === user.id ? { ...u, status: 'verified', verificationStatus: 'Verified' } : u
          ));
        }
        break;
      case 'delete':
        setUsers(users.filter(u => u.id !== user.id));
        break;
    }
  };

  const exportUsers = () => {
    alert('Export functionality would be implemented here');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#004040]"></div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <button 
                  onClick={() => window.history.back()}
                  className="mr-4 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                >
                  ←
                </button>
                <h1 className="text-xl font-semibold text-gray-900 dark:text-white">User Management</h1>
              </div>
              
              <div className="flex items-center space-x-4">
                <button
                  onClick={exportUsers}
                  className="bg-[#004040] hover:bg-[#003030] text-white px-4 py-2 rounded-lg flex items-center"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total Users</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{users.length}</p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <UserCheck className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Verified</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {users.filter(u => u.status === 'verified').length}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <div className="flex items-center">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <AlertTriangle className="h-6 w-6 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Pending</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {users.filter(u => u.status === 'pending').length}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <div className="flex items-center">
                <div className="p-2 bg-red-100 rounded-lg">
                  <UserX className="h-6 w-6 text-red-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Suspended</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {users.filter(u => u.status === 'suspended').length}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow mb-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name, email, or National ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#004040] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-gray-400" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#004040] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="all">All Status</option>
                  <option value="verified">Verified</option>
                  <option value="pending">Pending</option>
                  <option value="suspended">Suspended</option>
                </select>
              </div>
            </div>
          </div>

          {/* Users Table */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      National ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Last Login
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {paginatedUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0">
                            <div className="h-10 w-10 rounded-full bg-[#004040] flex items-center justify-center">
                              <span className="text-sm font-medium text-white">
                                {user.name.charAt(0)}
                              </span>
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900 dark:text-white">{user.name}</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                              <MapPin className="h-3 w-3 mr-1" />
                              {user.location}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 dark:text-white flex items-center mb-1">
                          <Mail className="h-3 w-3 mr-2 text-gray-400" />
                          {user.email}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                          <Phone className="h-3 w-3 mr-2 text-gray-400" />
                          {user.phone}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-mono text-gray-900 dark:text-white">{user.nin}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">{user.documentCount} documents</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                          {getStatusIcon(user.status)}
                          <span className="ml-1 capitalize">{user.status}</span>
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 dark:text-white flex items-center">
                          <Calendar className="h-3 w-3 mr-2 text-gray-400" />
                          {user.lastLogin}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          Joined {user.joinDate}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleUserAction(user, 'view')}
                            className="text-blue-600 hover:text-blue-900"
                            title="View Details"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          {/* <button
                            onClick={() => handleUserAction(user, 'edit')}
                            className=""
                            title="Edit User"
                          >
                            <Edit className="h-4 w-4" />
                          </button> */}
                          {user.status === 'verified' ? (
                            <button
                              onClick={() => handleUserAction(user, 'suspend')}
                              className="text-red-600 hover:text-red-900"
                              title="Suspend User"
                            >
                              <UserX className="h-4 w-4" />
                            </button>
                          ) : (
                            <button
                              onClick={() => handleUserAction(user, 'activate')}
                              className="text-green-600 hover:text-green-900"
                              title="Activate User"
                            >
                              <UserCheck className="h-4 w-4" />
                            </button>
                          )}
                          <button
                            onClick={() => handleUserAction(user, 'delete')}
                            className="text-red-600 hover:text-red-900"
                            title="Delete User"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="bg-white dark:bg-gray-800 px-4 py-3 flex items-center justify-between border-t border-gray-200 dark:border-gray-700 sm:px-6">
                <div className="flex-1 flex justify-between sm:hidden">
                  <button
                    onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Showing <span className="font-medium">{startIndex + 1}</span> to{' '}
                      <span className="font-medium">{Math.min(startIndex + usersPerPage, filteredUsers.length)}</span> of{' '}
                      <span className="font-medium">{filteredUsers.length}</span> results
                    </p>
                  </div>
                  <div>
                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                      <button
                        onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
                        disabled={currentPage === 1}
                        className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm font-medium text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50"
                      >
                        Previous
                      </button>
                      
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                            page === currentPage
                              ? 'z-10 bg-[#004040] border-[#004040] text-white'
                              : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                          }`}
                        >
                          {page}
                        </button>
                      ))}
                      
                      <button
                        onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm font-medium text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50"
                      >
                        Next
                      </button>
                    </nav>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <ViewUserDetailModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        userDetails={selectedUser}
        onAction={handleUserAction}
      />
    </>
  );
}
