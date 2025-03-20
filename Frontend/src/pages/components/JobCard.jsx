import React from "react";

function JobCard({ 
  title, 
  company, 
  location, 
  salary, 
  jobtype, 
  requirements, 
  responsibilities, 
  description, 
  applicationDeadline, 
  createdAt 
}) {

  return (
    <div className="bg-white flex flex-col justify-between p-3 sm:p-4 rounded-md shadow-md max-h-80 overflow-hidden">
      <div className="overflow-auto scrollbar-none">
        {/* Top Section - Company Logo & Post Time */}
        <div className="flex justify-between items-center mb-1 sm:mb-2">
          <div className="flex gap-2 items-center">
          <div className="w-8 sm:w-10 h-8 sm:h-10 bg-black rounded-full"></div>
          <span className="font-semibold">{company}</span>
          </div>
          <span className="font-medium bg-[#b0d9ff] text-xs sm:text-xs px-2 py-2 rounded">
            Posted on {new Date(createdAt).toLocaleDateString()} {/* Formatting Date */}
          </span>
        </div>

        {/* Job Title */}
        <h3 className="text-dark-gray text-base sm:text-lg font-semibold mb-1 sm:mb-2">
          {title}
        </h3>

        {/* Job Details with Remix Icons */}
        <div className="text-dark-gray text-sm sm:text-base mb-1 sm:mb-2">
          <p>
            <i className="ri-map-pin-range-line"></i> {location}   
            <i className="ri-building-line ml-3"></i> {jobtype}   
            <i className="ri-money-rupee-circle-line ml-3"></i> {salary}
          </p>
        </div>

        {/* Job Description */}
        <div className="text-dark-gray text-sm sm:text-base mb-2 sm:mb-4">
          <p className="text-sm font-medium">Detailed Overview</p>
          <p className="whitespace-pre-line sm:text-xs break-words">{description}</p>
        </div>
      </div>

      {/* Apply Button */}
      <button className="bg-purple font-semibold w-full text-white px-3 sm:px-4 py-3 sm:py-3 rounded-xl text-xs sm:text-sm">
        Apply Now
      </button>
    </div>
  );
}

export default JobCard;
