import React, { useState, useEffect } from 'react';

function Form({ closeForm, onSubmit, initialDetails }) {
  const [formState, setFormState] = useState({
    names: "",
    id: "", 
    address: "", 
    suburb: "", 
    city: "", 
    zip: "", 
    contact: "", 
    email: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    id: "",
    contact: ""
  });

  useEffect(() => {
    if (initialDetails) {
      setFormState(initialDetails);
    }
  }, [initialDetails]);

  const validate = () => {
    let emailError = "";
    let idError = "";
    let contactError = "";

    // Email validation
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(formState.email)) {
      emailError = "Invalid email format";
    }

    // ID validation
    if (!/^\d{1,13}$/.test(formState.id)) {
      idError = "ID must be numeric and not more than 13 digits";
    }

    // Contact validation
    if (!/^\d{1,10}$/.test(formState.contact)) {
      contactError = "Contact must be numeric and not more than 10 digits";
    }

    if (emailError || idError || contactError) {
      setErrors({ email: emailError, id: idError, contact: contactError });
      return false;
    }

    return true;
  };

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
    setErrors({
      ...errors,
      [e.target.name]: ""
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formState);
    }
  };

  return (
    <div className='form-container' onClick={(e) => {
      if (e.target.className === "form-container" ) closeForm();
    }}>
      <div className='register'>
        <h4><b>Registration Form</b></h4>
        <form className='form-group' onSubmit={handleSubmit}>
          <div>
            <label htmlFor='names'>Full Names:</label>
            <input 
              name='names' 
              type='text' 
              placeholder='First and Last Name' 
              value={formState.names} 
              onChange={handleChange} 
              className='names'
            />
          </div>
          <div>
            <label htmlFor='id'>Id Number:</label>
            <input 
              name='id' 
              type='text' 
              placeholder='ID Number' 
              value={formState.id} 
              onChange={handleChange} 
              className='id'
            />
            <div className='error'>{errors.id}</div>
          </div>
          <div>
            <label htmlFor='address'>Full Address:</label>
            <input 
              name='address' 
              type='text' 
              placeholder='Street Address' 
              value={formState.address} 
              onChange={handleChange} 
              className='address'
            />
            <input 
              name='suburb' 
              type='text' 
              placeholder='Suburb' 
              value={formState.suburb} 
              onChange={handleChange} 
              className='suburb'
            />
            <input 
              name='city' 
              type='text' 
              placeholder='City' 
              value={formState.city} 
              onChange={handleChange} 
              className='city'
            />
            <input 
              name='zip' 
              type='text' 
              placeholder='Zip Code' 
              value={formState.zip} 
              onChange={handleChange} 
              className='zip'
            />
          </div>
          <div>
            <label htmlFor='contact'>Contact No.</label>
            <input 
              name='contact' 
              type='text' 
              placeholder='Contact Number' 
              value={formState.contact} 
              onChange={handleChange} 
              className='contact'
            />
            <div className='error'>{errors.contact}</div>
          </div>
          <div>
            <label htmlFor='email'>Email:</label>
            <input 
              name='email' 
              type='text' 
              placeholder='example@example.com' 
              value={formState.email} 
              onChange={handleChange} 
              className='email'
            />
            <div className='error'>{errors.email}</div>
          </div>
          <button type='submit' className='btn'>Submit</button>
        </form>
      </div>
    </div>
  );
}

export default Form;