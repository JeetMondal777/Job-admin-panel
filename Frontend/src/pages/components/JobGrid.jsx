import React, { useEffect, useState } from 'react';
import JobCard from './JobCard';
import axios from 'axios';

const JobGrid = ({ jobAdded, filters }) => { // Receive filters
  const token = localStorage.getItem('token');
  const [jobs, setJobs] = useState([]);

  const getAllJobs = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/jobs`);

      if (response.status === 200) {
        const jobArray = Array.isArray(response.data) ? response.data : response.data.jobs || [];
        const sortedJobs = jobArray
          .map(job => ({
            id: job._id,
            title: job.title || 'Untitled',
            company: job.company || 'Unknown Company',
            location: job.location || 'N/A',
            salary: job.salary || 'Not specified',
            jobtype: job.jobtype || 'N/A',
            description: job.description || 'No description available',
            createdAt: job.createdAt ? new Date(job.createdAt) : new Date(),
          }))
          .sort((a, b) => b.createdAt - a.createdAt);

        setJobs(sortedJobs);
      }
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  useEffect(() => {
    getAllJobs();
  }, [jobAdded]);

  // Apply Filters
  const filteredJobs = jobs.filter(job =>
    job.title.toLowerCase().includes(filters.search.toLowerCase()) &&
    (!filters.location || job.location === filters.location) &&
    (!filters.jobType || job.jobtype === filters.jobType)
  );

  return (
    <div className="grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
      {filteredJobs.length ? filteredJobs.map(job => <JobCard key={job.id} {...job} />) : <p>No jobs available</p>}
    </div>
  );
};

export default JobGrid;
