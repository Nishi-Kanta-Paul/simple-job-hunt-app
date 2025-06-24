
import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, MapPin, Clock, DollarSign } from 'lucide-react';
import { Job } from '../context/AppContext';
import { useAppContext } from '../context/AppContext';

interface JobCardProps {
  job: Job;
}

const JobCard = ({ job }: JobCardProps) => {
  const { state, dispatch } = useAppContext();
  const isFavorite = state.favorites.includes(job.id);

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch({ type: 'TOGGLE_FAVORITE', payload: job.id });
  };

  return (
    <Link to={`/jobs/${job.id}`} className="block group">
      <div className={`bg-white rounded-xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
        job.featured ? 'border-blue-200 shadow-md' : 'border-gray-200 hover:border-gray-300'
      }`}>
        {job.featured && (
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-medium px-3 py-1 rounded-t-xl">
            ✨ Featured
          </div>
        )}
        
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-2xl">
                {job.logo}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                  {job.title}
                </h3>
                <p className="text-gray-600 text-sm">{job.company}</p>
              </div>
            </div>
            
            <button
              onClick={handleToggleFavorite}
              className={`p-2 rounded-lg transition-colors ${
                isFavorite 
                  ? 'text-red-500 bg-red-50 hover:bg-red-100' 
                  : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
              }`}
            >
              <Heart size={18} fill={isFavorite ? 'currentColor' : 'none'} />
            </button>
          </div>

          <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
            <div className="flex items-center space-x-1">
              <MapPin size={16} />
              <span>{job.location}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock size={16} />
              <span>{job.type}</span>
            </div>
            <div className="flex items-center space-x-1">
              <DollarSign size={16} />
              <span>{job.salary}</span>
            </div>
          </div>

          <p className="text-gray-700 text-sm mb-4 line-clamp-2">
            {job.description}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {job.requirements.slice(0, 2).map((req, index) => (
                <span
                  key={index}
                  className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-md"
                >
                  {req}
                </span>
              ))}
              {job.requirements.length > 2 && (
                <span className="text-xs text-gray-500">
                  +{job.requirements.length - 2} more
                </span>
              )}
            </div>
            
            <span className="text-xs text-gray-500">{job.posted}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default JobCard;
