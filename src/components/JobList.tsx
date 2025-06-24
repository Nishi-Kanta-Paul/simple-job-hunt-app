
import React, { useMemo } from 'react';
import JobCard from './JobCard';
import { useAppContext } from '../context/AppContext';
import { Job } from '../context/AppContext';

const JobList = () => {
  const { state } = useAppContext();
  const { jobs, filters } = state;

  const filteredJobs = useMemo(() => {
    return jobs.filter((job: Job) => {
      const matchesSearch = filters.search === '' || 
        job.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        job.company.toLowerCase().includes(filters.search.toLowerCase()) ||
        job.description.toLowerCase().includes(filters.search.toLowerCase());

      const matchesType = filters.type === '' || job.type === filters.type;

      const matchesCategory = filters.category === '' || job.category === filters.category;

      const matchesRemote = !filters.remote || 
        job.type === 'Remote' || 
        job.location.toLowerCase().includes('remote');

      return matchesSearch && matchesType && matchesCategory && matchesRemote;
    });
  }, [jobs, filters]);

  if (filteredJobs.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-4xl">🔍</span>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No jobs found</h3>
        <p className="text-gray-600">Try adjusting your filters to see more results.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredJobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
};

export default JobList;
