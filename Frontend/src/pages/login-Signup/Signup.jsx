import React, { useState } from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const Signup = () => {
    const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    company: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log("Signup Data:", formData);
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/admin/register`, formData);
    if (response.status === 201) {
        navigate("/login");
        setFormData({
            firstname: "",
            lastname: "",
            email: "",
            password: "",
            company: "",
        });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-light-gray">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-center text-purple text-2xl font-bold mb-4">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-2">
          <input
            type="text"
            name="firstname"
            placeholder="First Name"
            value={formData.firstname}
            onChange={handleChange}
            className="input-field border border-soft-gray p-2 rounded-md w-full"
            required
          />
          <input
            type="text"
            name="lastname"
            placeholder="Last Name"
            value={formData.lastname}
            onChange={handleChange}
            className="input-field border border-soft-gray p-2 rounded-md w-full"
          />
          </div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="input-field border border-soft-gray p-2 rounded-md w-full"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="input-field border border-soft-gray p-2 rounded-md w-full"
            required
          />
          <input
            type="text"
            name="company"
            placeholder="Company"
            value={formData.company}
            onChange={handleChange}
            className="input-field border border-soft-gray p-2 rounded-md w-full"
            required
          />
        <div className="flex justify-center items-center">
          <button type="submit" className="btn-blue w-1/2 rounded-xl text-white font-semibold bg-purple py-2">Sign Up</button>
        </div>
        </form>
        <p className="text-center text-dark-gray mt-4">
          Already have an account? <a href="/login" className="text-purple">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
