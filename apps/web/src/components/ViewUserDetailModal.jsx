import React, { useState, useEffect } from 'react';
import { XCircle, Edit, Save, X, Trash2, UserCheck, UserX, AlertCircle } from 'lucide-react';

const ViewUserDetailModal = ({ isOpen, onClose, userDetails, onAction }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editableUserDetails, setEditableUserDetails] = useState(userDetails);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    setEditableUserDetails(userDetails);
  }, [userDetails]);

  if (!isOpen || !userDetails) return null;

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
      case 'pending': return <AlertCircle className="h-4 w-4" />;
      case 'suspended': return <UserX className="h-4 w-4" />;
      default: return null;
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditableUserDetails(prevDetails => ({
      ...prevDetails,
      [name]: value
    }));
  };

  const handleRoleChange = (e) => {
    setEditableUserDetails(prevDetails => ({
      ...prevDetails,
      role: e.target.value
    }));
  };

  const handleStatusChange = (e) => {
    setEditableUserDetails(prevDetails => ({
      ...prevDetails,
      status: e.target.value
    }));
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    onAction(editableUserDetails, 'edit');
    setIsEditing(false);
    onClose();
  };

  const handleCancelClick = () => {
    setEditableUserDetails(userDetails); // Reset to original details
    setIsEditing(false);
  };

  const handleActionClick = (action) => {
    if (action === 'delete') {
      setShowDeleteConfirm(true);
    } else {
      onAction(userDetails, action);
      onClose();
    }
  };

  const handleDeleteConfirm = () => {
    onAction(userDetails, 'delete');
    setShowDeleteConfirm(false);
    onClose();
  };

  const renderField = (label, value, name, type = 'text') => (
    <p className="mb-2">
      <strong>{label}:</strong>{' '}
      {isEditing ? (
        <input
          type={type}
          name={name}
          value={editableUserDetails[name] || ''}
          onChange={handleInputChange}
          className="ml-2 p-1 border rounded dark:bg-gray-700 dark:border-gray-600 w-full"
        />
      ) : (
        <span>{value || 'N/A'}</span>
      )}
    </p>
  );

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-10 mx-auto p-5 border w-11/12 md:w-2/3 lg:w-1/2 shadow-lg rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <h3 className="text-xl font-semibold">User Details: {userDetails.name}</h3>
          <div className="flex items-center space-x-2">
            {isEditing ? (
              <>
                <button
                  onClick={handleSaveClick}
                  className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 flex items-center"
                >
                  <Save className="h-4 w-4 mr-1" /> Save
                </button>
                <button
                  onClick={handleCancelClick}
                  className="px-3 py-1 bg-gray-400 text-white rounded-md hover:bg-gray-500 flex items-center"
                >
                  <X className="h-4 w-4 mr-1" /> Cancel
                </button>
              </>
            ) : (
              <button
                onClick={handleEditClick}
                className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 flex items-center"
              >
                <Edit className="h-4 w-4 mr-1" /> Edit
              </button>
            )}
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
              <XCircle className="h-6 w-6" />
            </button>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Basic Info */}
          <div>
            <h4 className="text-lg font-medium text-gray-700 dark:text-gray-200 mb-2">Basic Information</h4>
            {renderField('Full Name', userDetails.name, 'name')}
            {renderField('User ID', userDetails.id, 'id', 'text')}
            {renderField('Email Address', userDetails.email, 'email', 'email')}
            {renderField('Phone Number', userDetails.phone, 'phone')}
            {renderField('Date of Birth', userDetails.dob, 'dob', 'date')}
            {renderField('Gender', userDetails.gender, 'gender')}
            {renderField('National ID', userDetails.nin, 'nin')}
            <p className="mb-2">
              <strong>Role:</strong>{' '}
              {isEditing ? (
                <select
                  name="role"
                  value={editableUserDetails.role || 'Citizen'}
                  onChange={handleRoleChange}
                  className="ml-2 p-1 border rounded dark:bg-gray-700 dark:border-gray-600 w-full"
                >
                  <option value="Citizen">Citizen</option>
                  <option value="Official">Official</option>
                  <option value="Admin">Admin</option>
                </select>
              ) : (
                <span>{userDetails.role || 'Citizen'}</span>
              )}
            </p>
            <p className="mb-2">
              <strong>Account Status:</strong>{' '}
              {isEditing ? (
                <select
                  name="status"
                  value={editableUserDetails.status || 'pending'}
                  onChange={handleStatusChange}
                  className="ml-2 p-1 border rounded dark:bg-gray-700 dark:border-gray-600 w-full"
                >
                  <option value="verified">Verified</option>
                  <option value="pending">Pending</option>
                  <option value="suspended">Suspended</option>
                </select>
              ) : (
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ml-2 ${getStatusColor(userDetails.status)}`}>
                  {getStatusIcon(userDetails.status)}
                  <span className="ml-1 capitalize">{userDetails.status}</span>
                </span>
              )}
            </p>
          </div>

          {/* Activity Summary */}
          <div>
            <h4 className="text-lg font-medium text-gray-700 dark:text-gray-200 mb-2">Activity Summary</h4>
            <p><strong>Date Registered:</strong> {userDetails.joinDate}</p>
            <p><strong>Last Login:</strong> {userDetails.lastLogin}</p>
            <p><strong>Total Votes Cast:</strong> {userDetails.votingActivity?.totalVotesCast || 0}</p>
            <p><strong>Last Vote Cast Date:</strong> {userDetails.votingActivity?.lastVoteCastDate || 'N/A'}</p>
            <h5 className="font-medium mt-3 mb-1">Elections Participated In:</h5>
            {userDetails.votingActivity?.electionsParticipatedIn && userDetails.votingActivity.electionsParticipatedIn.length > 0 ? (
              <ul className="list-disc list-inside ml-4">
                {userDetails.votingActivity.electionsParticipatedIn.map((election, index) => (
                  <li key={index}>
                    {election.name} ({election.date}) - Status: {election.status}, Voted: {election.votedCandidate}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="ml-4">No elections participated in.</p>
            )}
          </div>

          {/* Documents / Attachments */}
          <div>
            <h4 className="text-lg font-medium text-gray-700 dark:text-gray-200 mb-2">Documents / Attachments</h4>
            <p><strong>Uploaded ID:</strong> {userDetails.uploadedId ? 'Yes' : 'No'}</p>
            <p><strong>Verification Status:</strong> {userDetails.verificationStatus || 'N/A'}</p>
          </div>
        </div>

        {/* Additional Actions */}
        <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
          <h4 className="text-lg font-medium text-gray-700 dark:text-gray-200 mb-3">Additional Actions</h4>
          <div className="flex flex-wrap gap-3">
            {userDetails.status !== 'verified' && (
              <button
                onClick={() => handleActionClick('verify')}
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 flex items-center"
              >
                <UserCheck className="h-4 w-4 mr-2" /> Verify Account
              </button>
            )}
            {userDetails.status === 'verified' ? (
              <button
                onClick={() => handleActionClick('suspend')}
                className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 flex items-center"
              >
                <UserX className="h-4 w-4 mr-2" /> Suspend Account
              </button>
            ) : (
              <button
                onClick={() => handleActionClick('activate')}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 flex items-center"
              >
                <UserCheck className="h-4 w-4 mr-2" /> Reactivate Account
              </button>
            )}
            <button
              onClick={() => handleActionClick('delete')}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 flex items-center"
            >
              <Trash2 className="h-4 w-4 mr-2" /> Delete User
            </button>
          </div>
        </div>

        <div className="mt-6 text-right">
          <button
            className="px-6 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
            onClick={onClose}
          >
            Close
          </button>
        </div>

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center">
            <div className="relative p-5 border w-96 shadow-lg rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
              <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">Confirm Deletion</h3>
              <div className="mt-2 px-7 py-3">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Are you sure you want to delete {userDetails.name}? This action cannot be undone.
                </p>
              </div>
              <div className="items-center px-4 py-3 flex justify-end space-x-3">
                <button
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
                  onClick={() => setShowDeleteConfirm(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                  onClick={handleDeleteConfirm}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewUserDetailModal;
