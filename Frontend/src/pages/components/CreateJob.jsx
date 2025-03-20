import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import axios from "axios";

const CreateJobForm = ({ setShowCreateJob, setJobAdded }) => {
  const token = localStorage.getItem("token");
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    jobtype: "",
    salary: "",
    applicationDeadline: "",
    description: "",
  });

  const formRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      formRef.current,
      { y: "-100%", opacity: 0 },
      { y: "0%", opacity: 1, duration: 0.5, ease: "power3.out" }
    );
  }, []);

  const handleClose = () => {
    gsap.to(formRef.current, {
      y: "-100%",
      opacity: 0,
      duration: 0.5,
      ease: "power3.in",
      onComplete: () => setShowCreateJob(false),
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.title ||
      !formData.company ||
      !formData.location ||
      !formData.jobtype ||
      !formData.salary ||
      !formData.applicationDeadline ||
      !formData.description
    ) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/jobs/create`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      if (response.status === 201) {
        setJobAdded(prev => !prev); // Trigger job update in JobGrid
        handleClose();
      }
    } catch (error) {
      console.error("Error posting job:", error);
    }
  };

  return (
    <div className="absolute inset-0 flex items-center min-h-screen bg-black/50 justify-center bg-opacity-50 z-50">
      <div ref={formRef} className="bg-white w-[600px] p-6 rounded-lg shadow-lg relative">
        
        {/* Close Button */}
        <button 
          className="absolute top-3 right-4 text-gray-600 hover:text-black text-lg font-bold"
          onClick={handleClose}
        >
          ✕
        </button>

        <h2 className="text-center text-xl font-semibold mb-4">Create Job Opening</h2>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Job Title</label>
              <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="e.g. Software Engineer" className="w-full border p-2 rounded-md mt-1"/>
            </div>
            <div>
              <label className="text-sm font-medium">Company Name</label>
              <input type="text" name="company" value={formData.company} onChange={handleChange} placeholder="Amazon, Microsoft, Swiggy" className="w-full border p-2 rounded-md mt-1 text-gray-500"/>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <label className="text-sm font-medium">Location</label>
              <select name="location" value={formData.location} onChange={handleChange} className="w-full border p-2 rounded-md mt-1">
                <option value="">Choose Preferred Location</option>
                <option value="Remote">Remote</option>
                <option value="Onsite">Onsite</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium">Job Type</label>
              <select name="jobtype" value={formData.jobtype} onChange={handleChange} className="w-full border p-2 rounded-md mt-1">
                <option value="">Select Job Type</option>
                <option value="Full-Time">Full-Time</option>
                <option value="Part-Time">Part-Time</option>
                <option value="Internship">Internship</option>
                <option value="Contract">Contract</option>
              </select>
            </div>
          </div>

          <div className="mt-4">
            <label className="text-sm font-medium">Salary</label>
            <input type="text" name="salary" value={formData.salary} onChange={handleChange} placeholder="₹50,000/month or ₹12 LPA" className="w-full border p-2 rounded-md mt-1"/>
          </div>

          <div className="mt-4">
            <label className="text-sm font-medium">Application Deadline</label>
            <input type="date" name="applicationDeadline" value={formData.applicationDeadline} onChange={handleChange} className="w-full border p-2 rounded-md mt-1"/>
          </div>

          <div className="mt-4">
            <label className="text-sm font-medium">Job Description</label>
            <textarea name="description" value={formData.description} onChange={handleChange} className="w-full border p-2 rounded-md mt-1 h-24"></textarea>
          </div>

          <div className="flex justify-end items-center mt-6">
            <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded-md">Publish →</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateJobForm;
