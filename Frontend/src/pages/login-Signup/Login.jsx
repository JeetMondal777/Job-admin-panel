import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
    
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log("Login Data:", formData);
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/admin/login`, formData);
    if (response.status === 200) {
        console.log(response.data);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        
        navigate("/");
        setFormData({
            email: "",
            password: "",
        });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-light-gray">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-center text-purple text-2xl font-bold mb-4">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
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
          <div className="flex justify-center items-center">
          <button type="submit" className="btn-blue w-1/2 text-white font-semibold rounded-xl bg-purple py-2">Login</button>
          </div>
        </form>
        <p className="text-center text-dark-gray mt-4">
          Don't have an account? <a href="/signup" className="text-purple">Sign Up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
