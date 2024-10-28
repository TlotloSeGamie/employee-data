import React, { useState } from "react";
import "./Login.css";

function Login({ onFormSwitch, onLogin }) {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
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

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    onLogin(); 
  };

  return (
    <div className="main-container">
      <form className="form-container" onSubmit={handleSubmit}>
        <div className="heading">
          <h2>Employee Database</h2>
        </div>
        <h4>Sign In</h4>
        <label htmlFor="username"><b>Username</b></label>
        <input
          type="text"
          placeholder="Username"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
        {errors.username && <span>{errors.username}</span>}
        <label htmlFor="email"><b>Email Address</b></label>
        <input
          type="text"
          placeholder="example@gmail.com"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <span>{errors.email}</span>}
        <label htmlFor="password"><b>Password</b></label>
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        {errors.password && <span>{errors.password}</span>}
        <button type="submit" className="btn">Log In</button>
        <li>
          <a href="#" className="login-link" onClick={() => onFormSwitch('register')}>
            Don't have an account? Register
          </a>
        </li>
      </form>
    </div>
  );
}

export default Login;
