import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import JobFilters from '../components/JobFilters';
import JobList from '../components/JobList';
import { fetchJobs } from '../api/jobs';

const Jobs = () => {
  const [filters, setFilters] = useState({
    search: '',
    type: '',
    category: '',
    remote: false,
  });

  const { data: jobsResponse, isLoading, error, refetch } = useQuery({
    queryKey: ['jobs'],
    queryFn: () => fetchJobs(),
    retry: 1,
    retryDelay: 1000,
  });

  const handleFilterChange = (key: string, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleResetFilters = () => {
    setFilters({
      search: '',
      type: '',
      category: '',
      remote: false,
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <div className="h-8 bg-gray-200 rounded w-48 mb-4 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-64 animate-pulse"></div>
          </div>
          
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-10 bg-gray-200 rounded animate-pulse"></div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-lg animate-pulse"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2 animate-pulse"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2 animate-pulse"></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-3 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-3 bg-gray-200 rounded w-5/6 animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    const isServerError = error instanceof Error && error.message.includes('Backend server is not running');
    
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-4xl">❌</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {isServerError ? 'Backend Server Not Running' : 'Something went wrong'}
            </h3>
            <p className="text-gray-600 mb-4 max-w-md mx-auto">
              {isServerError 
                ? 'Please start the JSON server by running: npx json-server --watch db.json --port 3001'
                : 'We couldn\'t load the jobs. Please try again later.'
              }
            </p>
            <div className="space-y-2">
              <button
                onClick={() => refetch()}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors mr-2"
              >
                Try Again
              </button>
              {isServerError && (
                <div className="text-sm text-gray-500 mt-4">
                  <p>Make sure you have json-server installed:</p>
                  <code className="bg-gray-100 px-2 py-1 rounded text-xs">npm install -g json-server</code>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const jobs = jobsResponse?.data || [];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Job Opportunities
          </h1>
          <p className="text-gray-600">
            Discover {jobs.length} amazing job opportunities waiting for you
          </p>
        </div>

        <JobFilters 
          filters={filters}
          onFilterChange={handleFilterChange}
          onResetFilters={handleResetFilters}
        />
        <JobList jobs={jobs} filters={filters} />
      </div>
    </div>
  );
};

export default Jobs;
