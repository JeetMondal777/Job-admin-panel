import React, { useState, useRef, useEffect } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WorkIcon from '@mui/icons-material/Work';

function FilterBar({ setFilters }) {
  const [locationDropdown, setLocationDropdown] = useState(false);
  const [jobTypeDropdown, setJobTypeDropdown] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedJobType, setSelectedJobType] = useState('');
  const [search, setSearch] = useState('');
  const [salary, setSalary] = useState('');

  const locationRef = useRef(null);
  const jobTypeRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (locationRef.current && !locationRef.current.contains(event.target)) {
        setLocationDropdown(false);
      }
      if (jobTypeRef.current && !jobTypeRef.current.contains(event.target)) {
        setJobTypeDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Update filters in Home.jsx when inputs change
  useEffect(() => {
    setFilters({ search, location: selectedLocation, jobType: selectedJobType, salary });
  }, [search, selectedLocation, selectedJobType, salary]);

  // Check if any filter is applied
  const hasFilters = search || selectedLocation || selectedJobType || salary;

  // Clear all filters
  const clearFilters = () => {
    setSearch('');
    setSelectedLocation('');
    setSelectedJobType('');
    setSalary('');
  };

  return (
    <div className="bg-white p-4 rounded-md w-full shadow-md mt-24 justify-between flex sm:flex-row flex-wrap">
      {/* Search Job Title */}
      <div className="p-2 flex w-1/4">
        <div className="flex items-center border border-soft-gray p-2 rounded-md w-full">
          <SearchIcon className="mr-2" />
          <input
            type="text"
            placeholder="Search by Job Title, Role"
            className="outline-none w-full"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Preferred Location Dropdown */}
      <div className="p-2 flex w-1/4 relative" ref={locationRef}>
        <div
          className="flex items-center border border-soft-gray p-2 rounded-md w-full cursor-pointer"
          onClick={() => setLocationDropdown(!locationDropdown)}
        >
          <LocationOnIcon className="mr-2" />
          <span className="w-full">{selectedLocation || 'Preferred Location'}</span>
        </div>
        {locationDropdown && (
          <div className="absolute bg-white w-full border rounded-md mt-1 shadow-md z-10">
            {['Remote', 'Hybrid', 'Onsite'].map((location) => (
              <div
                key={location}
                className="p-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  setSelectedLocation(location);
                  setLocationDropdown(false);
                }}
              >
                {location}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Job Type Dropdown */}
      <div className="p-2 flex w-1/4 relative" ref={jobTypeRef}>
        <div
          className="flex items-center border border-soft-gray p-2 rounded-md w-full cursor-pointer"
          onClick={() => setJobTypeDropdown(!jobTypeDropdown)}
        >
          <WorkIcon className="mr-2" />
          <span className="w-full">{selectedJobType || 'Job Type'}</span>
        </div>
        {jobTypeDropdown && (
          <div className="absolute bg-white w-full border rounded-md mt-1 shadow-md z-10">
            {['Full-Time', 'Part-Time', 'Internship', 'Contract'].map((jobType) => (
              <div
                key={jobType}
                className="p-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  setSelectedJobType(jobType);
                  setJobTypeDropdown(false);
                }}
              >
                {jobType}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Salary Input */}
      <div className="p-2 flex w-1/4">
        <div className="flex items-center border border-soft-gray p-2 rounded-md w-full">
          <span className="mr-2">₹</span>
          <input
            type="text"
            placeholder="Salary Per Month"
            className="outline-none w-full"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
          />
        </div>
      </div>

      {/* Clear Filters Button (Only Visible When Filters Are Applied) */}
      {hasFilters && (
        <div className="p-2 flex items-center w-full justify-center">
          <button
            onClick={clearFilters}
            className="px-4 ml-auto w-1/9 py-2 bg-black text-white rounded-md hover:bg-red-600 transition"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}

export default FilterBar;
