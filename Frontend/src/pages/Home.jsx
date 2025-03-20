import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Nav from './components/Nav';
import FilterBar from './components/FilterBar';
import JobGrid from './components/JobGrid';
import CreateJobForm from './components/CreateJob';
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();
  const [showCreateJob, setShowCreateJob] = useState(false);
  const [jobAdded, setJobAdded] = useState(false); // Track job addition
  const [filters, setFilters] = useState({
    search: '',
    location: '',
    jobType: '',
    salary: '',
  });

  const formRef = useRef(null);

  useEffect(() => {
    if (showCreateJob) {
      gsap.fromTo(
        formRef.current,
        { y: '-100%', opacity: 0 },
        { y: '0%', opacity: 1, duration: 0.5, ease: 'power3.out' }
      );
    }
  }, [showCreateJob]);

  return (
    <div >
      <Link className='absolute top-8 right-4 text-sm bg-gray-200 hover:bg-gray-300 transition-all duration-200 font-semibold px-3 py-2 rounded-xl' to={user?"/logout":"/login"}>{user? "Log Out":"Log In / Sign Up"} </Link>
      <Nav setShowCreateJob={setShowCreateJob} />
      <FilterBar setFilters={setFilters} />
      <JobGrid jobAdded={jobAdded} filters={filters} /> {/* Pass filters to JobGrid */}

      {showCreateJob && (
  user ? (
    <div ref={formRef} className="absolute inset-0 z-50">
      <CreateJobForm setShowCreateJob={setShowCreateJob} setJobAdded={setJobAdded} />
    </div>
  ) : (
    navigate("/login")
  )
)}

    </div>
  );
};

export default Home;
