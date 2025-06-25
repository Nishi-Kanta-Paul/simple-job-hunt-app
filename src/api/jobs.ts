
import axios from 'axios';
import { Job } from '../context/AppContext';

const API_BASE_URL = 'http://localhost:3001';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000, // 5 second timeout
});

// Add response interceptor for better error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    if (error.code === 'ECONNREFUSED' || error.code === 'ERR_NETWORK') {
      throw new Error('Backend server is not running. Please start json-server on port 3001.');
    }
    throw error;
  }
);

export interface JobsResponse {
  data: Job[];
  total: number;
  page: number;
  limit: number;
}

export interface JobQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  type?: string;
  category?: string;
  location?: string;
}

export const fetchJobs = async (params: JobQueryParams = {}): Promise<JobsResponse> => {
  const { page = 1, limit = 10, search, type, category, location } = params;
  
  const queryParams = new URLSearchParams();
  queryParams.append('_page', page.toString());
  queryParams.append('_limit', limit.toString());
  
  if (search) {
    queryParams.append('q', search);
  }
  if (type) {
    queryParams.append('type', type);
  }
  if (category) {
    queryParams.append('category', category);
  }
  if (location) {
    queryParams.append('location_like', location);
  }

  const response = await api.get(`/jobs?${queryParams.toString()}`);
  
  return {
    data: response.data,
    total: parseInt(response.headers['x-total-count'] || '0'),
    page,
    limit,
  };
};

export const fetchJobById = async (id: string): Promise<Job | null> => {
  try {
    const response = await api.get(`/jobs/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching job:', error);
    return null;
  }
};

export const createJob = async (job: Omit<Job, 'id'>): Promise<Job> => {
  const response = await api.post('/jobs', job);
  return response.data;
};

export const updateJob = async (id: string, job: Partial<Job>): Promise<Job> => {
  const response = await api.put(`/jobs/${id}`, job);
  return response.data;
};

export const deleteJob = async (id: string): Promise<void> => {
  await api.delete(`/jobs/${id}`);
};
