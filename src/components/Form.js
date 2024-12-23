import React, { useState, useEffect } from "react";

function Form({ closeForm, onSubmit, initialDetails }) {
  const [formState, setFormState] = useState({
    role: "",
    names: "",
    gender: "",
    idNumber: "",
    address: "",
    suburb: "",
    city: "",
    zip: "",
    contact: "",
    email: "",
    image: null,
  });

  const [errors, setErrors] = useState({
    email: "",
    idNumber: "",
    contact: "",
  });

  useEffect(() => {
    if (initialDetails) {
      setFormState({
        role: initialDetails.role,
        names: initialDetails.names,
        gender: initialDetails.gender || "",
        idNumber: initialDetails.idNumber,
        address: initialDetails.address,
        suburb: initialDetails.suburb,
        city: initialDetails.city,
        zip: initialDetails.zip,
        contact: initialDetails.contact,
        email: initialDetails.email,
        image: initialDetails.image || null,
      });
    }
  }, [initialDetails]);

  const validate = () => {
    let emailError = "";
    let idNumberError = "";
    let contactError = "";

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(formState.email)) {
      emailError = "Invalid email format";
    }

    if (!/^\d{13}$/.test(formState.idNumber)) {
      idNumberError = "ID must be exactly 13 digits";
    }

    if (!/^\d{1,10}$/.test(formState.contact)) {
      contactError = "Contact must be numeric and not more than 10 digits";
    }

    if (emailError || idNumberError || contactError) {
      setErrors({
        email: emailError,
        idNumber: idNumberError,
        contact: contactError,
      });
      return false;
    }

    return true;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const handleFileChange = (e) => {
    setFormState({
      ...formState,
      image: e.target.files[0],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      const newDetails = {
        ...formState,
        id: formState.idNumber, 
      };

      const storedData = JSON.parse(localStorage.getItem("registrationDetails")) || [];
      const updatedData = [...storedData, newDetails];

      localStorage.setItem("registrationDetails", JSON.stringify(updatedData));
      onSubmit(newDetails);

      alert("Data saved successfully!");
      closeForm();
    } else {
      alert("Please fix the errors before submitting.");
    }
  };

  return (
    <div
      className="form-container"
      onClick={(e) => {
        if (e.target.className === "form-container") closeForm();
      }}
    >
      <div className="register">
        <h4>
          <b>Registration Form</b>
        </h4>
        <div className="form-group">
          <div>
            <label htmlFor="role">Role:</label>
            <input
              id="role"
              name="role"
              type="text"
              placeholder="Role"
              value={formState.role}
              onChange={handleChange}
              className="role"
            />
          </div>

          <div>
            <label htmlFor="names">Full Names:</label>
            <input
              name="names"
              type="text"
              placeholder="First and Last Name"
              value={formState.names}
              onChange={handleChange}
              className="names"
            />
          </div>

          <div>
            <label htmlFor="gender">Gender:</label>
            <select id="gender" name="gender" value={formState.gender} onChange={handleChange}>
              <option value="" disabled>
                Gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          <div>
            <label htmlFor="idNumber">ID Number:</label>
            <input
              id="idNumber"
              name="idNumber"
              type="text"
              placeholder="ID Number"
              value={formState.idNumber}
              onChange={handleChange}
              className="id"
            />
            {errors.idNumber && <div className="error">{errors.idNumber}</div>}
          </div>

          <div>
            <label htmlFor="address">Full Address:</label>
            <input
              name="address"
              type="text"
              placeholder="Street Address"
              value={formState.address}
              onChange={handleChange}
              className="address"
            />
            <input
              name="suburb"
              type="text"
              placeholder="Suburb"
              value={formState.suburb}
              onChange={handleChange}
              className="suburb"
            />
            <input
              name="city"
              type="text"
              placeholder="City"
              value={formState.city}
              onChange={handleChange}
              className="city"
            />
            <input
              name="zip"
              type="text"
              placeholder="Zip Code"
              value={formState.zip}
              onChange={handleChange}
              className="zip"
            />
          </div>

          <div>
            <label htmlFor="contact">Contact No.</label>
            <input
              name="contact"
              type="text"
              placeholder="Contact Number"
              value={formState.contact}
              onChange={handleChange}
              className="contact"
            />
            {errors.contact && <div className="error">{errors.contact}</div>}
          </div>

          <div>
            <label htmlFor="email">Email Address:</label>
            <input
              name="email"
              type="text"
              placeholder="Email Address"
              value={formState.email}
              onChange={handleChange}
              className="email"
            />
            {errors.email && <div className="error">{errors.email}</div>}
          </div>

          <div>
            <label htmlFor="image">Upload Image:</label>
            <input
              name="image"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>

          <div className="form-buttons">
            <button type="submit" className="btn" onClick={handleSubmit}>
              Submit
            </button>
            <button type="button" onClick={closeForm} className="btn">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Form;
