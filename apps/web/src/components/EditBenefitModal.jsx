import React, { useState, useEffect } from 'react';
import { XCircle, Save, X, Trash2, Upload, FileText } from 'lucide-react';

const EditBenefitModal = ({ isOpen, onClose, benefitDetails, onSave, onDelete }) => {
  const [editableBenefit, setEditableBenefit] = useState(benefitDetails);
  const [attachmentFile, setAttachmentFile] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    setEditableBenefit(benefitDetails);
    if (benefitDetails && benefitDetails.attachment) {
      // Assuming benefitDetails.attachment is a URL or path to the existing file
      // For simplicity, we'll just set a placeholder name for display
      setAttachmentFile({ name: benefitDetails.attachment.split('/').pop() });
    } else {
      setAttachmentFile(null);
    }
  }, [benefitDetails]);

  if (!isOpen || !benefitDetails) return null;

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      const file = files[0];
      setAttachmentFile(file);
      setEditableBenefit(prevDetails => ({
        ...prevDetails,
        attachment: file ? file.name : null // Store file name or URL, actual file will be handled by onSave
      }));
    } else {
      setEditableBenefit(prevDetails => ({
        ...prevDetails,
        [name]: value
      }));
    }
  };

  const handleCategoryChange = (e) => {
    setEditableBenefit(prevDetails => ({
      ...prevDetails,
      category: e.target.value
    }));
  };

  const handleStatusChange = (e) => {
    setEditableBenefit(prevDetails => ({
      ...prevDetails,
      status: e.target.value
    }));
  };

  const handleSaveClick = () => {
    onSave(editableBenefit);
    onClose();
  };

  const handleCancelClick = () => {
    setEditableBenefit(benefitDetails); // Reset to original details
    onClose();
  };

  const handleDeleteClick = () => {
    setShowDeleteConfirm(true);
  };

  const handleDeleteConfirm = () => {
    onDelete(benefitDetails.id);
    setShowDeleteConfirm(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-10 mx-auto p-5 border w-11/12 md:w-2/3 lg:w-1/2 shadow-lg rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <h3 className="text-xl font-semibold">Edit Benefit: {benefitDetails.title}</h3>
          <div className="flex items-center space-x-2">
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
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
              <XCircle className="h-6 w-6" />
            </button>
          </div>
        </div>

        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Benefit Title</label>
            <input
              type="text"
              name="title"
              value={editableBenefit.title || ''}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-[#004040] focus:border-[#004040] dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Category</label>
            <select
              name="category"
              value={editableBenefit.category || ''}
              onChange={handleCategoryChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-[#004040] focus:border-[#004040] dark:bg-gray-700 dark:text-white"
            >
              <option value="">Select category</option>
              <option value="employment">Employment</option>
              <option value="healthcare">Healthcare</option>
              <option value="education">Education</option>
              <option value="business">Business</option>
              <option value="housing">Housing</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
            <textarea
              rows={3}
              name="description"
              value={editableBenefit.description || ''}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-[#004040] focus:border-[#004040] dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Eligibility</label>
            <textarea
              rows={2}
              name="eligibility"
              value={editableBenefit.eligibility || ''}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-[#004040] focus:border-[#004040] dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Amount or Value</label>
            <input
              type="text"
              name="amount"
              value={editableBenefit.amount || ''}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-[#004040] focus:border-[#004040] dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Status</label>
            <select
              name="status"
              value={editableBenefit.status || 'active'}
              onChange={handleStatusChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-[#004040] focus:border-[#004040] dark:bg-gray-700 dark:text-white"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="pending">Pending</option>
              <option value="expired">Expired</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Application Deadline</label>
            <input
              type="date"
              name="applicationDeadline"
              value={editableBenefit.applicationDeadline ? new Date(editableBenefit.applicationDeadline).toISOString().split('T')[0] : ''}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-[#004040] focus:border-[#004040] dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Attachment</label>
            <div className="mt-1 flex items-center">
              <input
                type="file"
                name="attachment"
                onChange={handleInputChange}
                className="hidden"
                id="attachment-upload"
              />
              <label
                htmlFor="attachment-upload"
                className="cursor-pointer px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 flex items-center"
              >
                <Upload className="h-4 w-4 mr-1" /> {attachmentFile ? 'Change File' : 'Upload File'}
              </label>
              {attachmentFile && (
                <span className="ml-2 text-sm text-gray-900 dark:text-white flex items-center">
                  <FileText className="h-4 w-4 mr-1" /> {attachmentFile.name}
                </span>
              )}
              {!attachmentFile && (
                <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">No file selected</span>
              )}
            </div>
          </div>
        </form>

        <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-end space-x-3">
          <button
            onClick={handleDeleteClick}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 flex items-center"
          >
            <Trash2 className="h-4 w-4 mr-2" /> Delete Benefit
          </button>
        </div>

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center">
            <div className="relative p-5 border w-96 shadow-lg rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
              <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">Confirm Deletion</h3>
              <div className="mt-2 px-7 py-3">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Are you sure you want to delete "{benefitDetails.title}"? This action cannot be undone.
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

export default EditBenefitModal;
