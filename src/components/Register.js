import React, { useState } from "react";
import "./Register.css";
import { Link, useNavigate } from "react-router-dom";

function Register({ onFormSwitch }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = {};

    if (!formData.username.trim()) {
      validationErrors.username = "Username is required";
    }

    if (!formData.email.trim()) {
      validationErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      validationErrors.email = "Email is not valid";
    }

    if (!formData.password.trim()) {
      validationErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      validationErrors.password = "Password should be at least 8 characters";
    }

    if (formData.confirmPassword !== formData.password) {
      validationErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const emailExists = users.some(user => user.email === formData.email);
      if (emailExists) {
        setErrors({ email: "Email already exists" });
        return;
      }

      users.push({
        username: formData.username,
        email: formData.email,
        password: formData.password
      });

      localStorage.setItem('users', JSON.stringify(users));

      alert("Registered Successfully");
      navigate("/");
    }
  }

  return (
    <div className="main-container">
      <form className="form-container" onSubmit={handleSubmit}>
        <h3>Sign Up</h3>
        <input
          type="text"
          placeholder="Username"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
        {errors.username && <span>{errors.username}</span>}
        <input
          type="text"
          placeholder="example@gmail.com"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <span>{errors.email}</span>}
        <input
          type="password"
          placeholder="Create password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        {errors.password && <span>{errors.password}</span>}
        <input
          type="password"
          placeholder="Confirm password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
        {errors.confirmPassword && <span>{errors.confirmPassword}</span>}
        <button className="btn" type="submit">Create Account</button>
        <Link to="/" className='login-link'>Already have an account? Log In</Link>
      </form>
    </div>
  );
}

export default Register;
