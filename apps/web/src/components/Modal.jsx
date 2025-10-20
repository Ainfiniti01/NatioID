import React from "react";

export const ApproveRejectApplication = ({ isOpen, onClose, onApprove, onReject, application }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h2 className="text-xl font-bold mb-4">Manage Application</h2>
        <p>Applicant: {application?.citizenName}</p>
        <p>Status: {application?.status}</p>
        <div className="mt-4 flex justify-end space-x-2">
          <button onClick={onClose} className="bg-gray-300 px-4 py-2 rounded">
            Cancel
          </button>
          <button onClick={onReject} className="bg-red-500 text-white px-4 py-2 rounded">
            Reject
          </button>
          <button onClick={onApprove} className="bg-green-500 text-white px-4 py-2 rounded">
            Approve
          </button>
        </div>
      </div>
    </div>
  );
};

export const RequestMoreInfo = ({ isOpen, onClose, onSendRequest, application }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h2 className="text-xl font-bold mb-4">
          Request Additional Information
        </h2>
        <p>Applicant: {application?.citizenName}</p>
        <textarea
          className="w-full mt-2 p-2 border rounded"
          placeholder="What information or documents are needed?"
        ></textarea>
        <div className="mt-4 flex justify-end space-x-2">
          <button onClick={onClose} className="bg-gray-300 px-4 py-2 rounded">
            Cancel
          </button>
          <button onClick={onSendRequest} className="bg-blue-500 text-white px-4 py-2 rounded">
            Send Request
          </button>
        </div>
      </div>
    </div>
  );
};

export const ViewComplaint = ({ isOpen, onClose, complaint }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h2 className="text-xl font-bold mb-4">Complaint Details</h2>
        <p><b>Complaint ID:</b> {complaint?.id}</p>
        <p><b>Submitted By:</b> {complaint?.citizenName}</p>
        <p><b>Date Submitted:</b> {complaint?.submissionDate}</p>
        <p><b>Description:</b> {complaint?.description}</p>
        <div className="mt-4 flex justify-end space-x-2">
          <button onClick={onClose} className="bg-gray-300 px-4 py-2 rounded">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export const MarkAsInReview = ({ isOpen, onClose, onMarkAsInReview }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h2 className="text-xl font-bold mb-4">Mark Complaint as In Review</h2>
        <p>Are you sure you want to mark this complaint as “In Review”?</p>
        <div className="mt-4 flex justify-end space-x-2">
          <button onClick={onClose} className="bg-gray-300 px-4 py-2 rounded">
            Cancel
          </button>
          <button onClick={onMarkAsInReview} className="bg-yellow-500 text-white px-4 py-2 rounded">
            Yes, Mark as In Review
          </button>
        </div>
      </div>
    </div>
  );
};

export const EscalateComplaint = ({ isOpen, onClose, onEscalate }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h2 className="text-xl font-bold mb-4">Escalate Complaint</h2>
        <select className="w-full mt-2 p-2 border rounded">
          <option>Supervisor</option>
          <option>Legal</option>
          <option>External Agency</option>
        </select>
        <textarea
          className="w-full mt-2 p-2 border rounded"
          placeholder="Add optional note or reason for escalation"
        ></textarea>
        <div className="mt-4 flex justify-end space-x-2">
          <button onClick={onClose} className="bg-gray-300 px-4 py-2 rounded">
            Cancel
          </button>
          <button onClick={onEscalate} className="bg-orange-500 text-white px-4 py-2 rounded">
            Escalate
          </button>
        </div>
      </div>
    </div>
  );
};

export const AutoResolveDuplicates = ({ isOpen, onClose, onAutoResolve }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h2 className="text-xl font-bold mb-4">Auto Resolve Duplicates</h2>
        <p>We found X other complaints matching this one.</p>
        <p>Would you like to auto-close them as duplicates?</p>
        <div className="mt-4 flex justify-end space-x-2">
          <button onClick={onClose} className="bg-gray-300 px-4 py-2 rounded">
            Cancel
          </button>
          <button onClick={onAutoResolve} className="bg-blue-500 text-white px-4 py-2 rounded">
            Auto-Resolve
          </button>
        </div>
      </div>
    </div>
  );
};

export const DeleteComplaint = ({ isOpen, onClose, onDelete }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h2 className="text-xl font-bold mb-4">Delete Complaint</h2>
        <p>Are you sure you want to delete this complaint? This action cannot be undone.</p>
        <div className="mt-4 flex justify-end space-x-2">
          <button onClick={onClose} className="bg-gray-300 px-4 py-2 rounded">
            Cancel
          </button>
          <button onClick={onDelete} className="bg-red-500 text-white px-4 py-2 rounded">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
