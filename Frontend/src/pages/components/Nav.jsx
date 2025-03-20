import React from 'react';

function NavBar({ setShowCreateJob }) {
  return (
    <div className="fixed top-5 left-1/2 transform -translate-x-1/2 bg-white rounded-[25px] shadow-md py-[10px] px-[20px] flex items-center gap-[20px] z-10">
      
        <img className='w-15 h-10  rounded-full' src="https://www.datwebdigital.com/DWD/wp-content/uploads/2012/06/logo-design.jpg" alt="" />
      
      <a href="#" className="text-dark-gray font-semibold text-sm">Home</a>
      <a href="#" className="text-dark-gray font-semibold text-sm">Find Jobs</a>
      <a href="#" className="text-dark-gray font-semibold text-sm">Find Talents</a>
      <a href="#" className="text-dark-gray font-semibold text-sm">About us</a>
      <a href="#" className="text-dark-gray font-semibold text-sm">Testimonials</a>
      <button 
        onClick={() => setShowCreateJob(true)}
        className="bg-purple font-semibold text-white px-3 py-2 rounded-2xl text-sm"
      >
        Create Jobs
      </button>
    </div>
  );
}

export default NavBar;
