
import React from 'react';
import JobTable from '../components/JobTable';

const JobManagement = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Job Management
          </h1>
          <p className="text-gray-600">
            Manage job postings with advanced filtering, search, and CRUD operations
          </p>
        </div>

        <JobTable />
      </div>
    </div>
  );
};

export default JobManagement;
