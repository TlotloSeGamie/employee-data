import React, { useState, useEffect } from 'react';
import './App.css';
import axios from "axios";
import Table from './components/Table';
import Form from './components/Form';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  const [formOpen, setFormOpen] = useState(false);
  const [formMode, setFormMode] = useState('add');
  const [currentIndex, setCurrentIndex] = useState(null);
  const [registrationDetails, setRegistrationDetails] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewProfile, setViewProfile] = useState(null);
  const [idError, setIdError] = useState('');

  const [currentForm, setCurrentForm] = useState('login'); 

  const onFormSwitch = (formName) => {
    setCurrentForm(formName);
  };

  const handleLogin = () => {
    alert('Logged in successfully!');
  };
  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/getEmployees');
      const data = response.data;

      setRegistrationDetails(data.data);

      localStorage.setItem('registrationDetails', JSON.stringify(data.data));
    } catch (error) {
      console.log("Error in getting employee", error);

      const storedDetails = JSON.parse(localStorage.getItem('registrationDetails')) || [];
      setRegistrationDetails(storedDetails);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const submit = async (details) => {
    if (formMode === 'add') {
      const isDuplicate = registrationDetails.some(item => item.idNumber === details.idNumber);
      if (isDuplicate) {
        setIdError('ID number already registered.');
        alert('ID number already registered.');
        return;
      }

      try {
        const response = await axios.post('http://localhost:5000/api/addEmployee', details);
        if (response.status === 200) {
          alert('Employee added successfully!');
          const updatedDetails = [...registrationDetails, details];
          setRegistrationDetails(updatedDetails);
          localStorage.setItem('registrationDetails', JSON.stringify(updatedDetails));
        } else {
          alert('Error adding employee');
        }
      } catch (error) {
        console.error("Error in adding employee", error);
        alert('Failed to add employee');
      }
    } else if (formMode === 'edit' && currentIndex !== null) {
      try {
        const response = await axios.put(`http://localhost:5000/api/updateEmployee/${registrationDetails[currentIndex].id}`, details);
        if (response.status === 200) {
          alert('Employee updated successfully!');
          const updatedDetails = [...registrationDetails];
          updatedDetails[currentIndex] = details;
          setRegistrationDetails(updatedDetails);
          localStorage.setItem('registrationDetails', JSON.stringify(updatedDetails));
        } else {
          alert('Error updating employee');
        }
      } catch (error) {
        console.error("Error in updating employee", error);
        alert('Failed to update employee');
      }
    }
    setFormOpen(false);
    setIdError('');
  };

  const handleEdit = (index) => {
    setCurrentIndex(index);
    setFormMode('edit');
    setFormOpen(true);
  };

  const handleDelete = async (index) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this employee?");
    if (!confirmDelete) return;
  
    try {
      const employeeId = registrationDetails[index].id; // Ensure `id` is the correct field
  
      const response = await axios.delete(`http://localhost:5000/api/deleteEmployee/${employeeId}`);
      if (response.status === 200) {
        alert('Employee deleted successfully!');
        
        // Directly update the state by removing the employee from the array
        const updatedDetails = registrationDetails.filter((_, i) => i !== index);
        setRegistrationDetails(updatedDetails);
        localStorage.setItem('registrationDetails', JSON.stringify(updatedDetails)); // Update localStorage if needed
      } else {
        alert('Error deleting employee');
      }
    } catch (error) {
      console.error("Error in deleting employee:", error);
      alert('Failed to delete employee');
    }
  };
  

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredDetails = registrationDetails.filter((details) =>
    details.firstName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewProfile = (index) => {
    setViewProfile(registrationDetails[index]);
  };

  const closeProfile = () => {
    setViewProfile(null);
  };

  return (
    <div className="App">
      <Navbar />
      {/* <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearch}
        className="search-bar"
      />
      <Table 
        registrationDetails={filteredDetails}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onViewProfile={handleViewProfile}
      />
      <button className='btn' onClick={() => {
        setFormMode('add');
        setFormOpen(true);
      }}>Add</button>
      {formOpen && 
        <Form 
          closeForm={() => setFormOpen(false)} 
          onSubmit={submit}
          initialDetails={formMode === 'edit' ? registrationDetails[currentIndex] : null}
        />
      }
      {viewProfile && (
        <div className='profile-modal'>
          <div className='profile-modal-content'>
            <h2>Employee Details</h2>
            <p><strong>Full Name:</strong> {viewProfile.firstName + " " + viewProfile.lastName}</p>
            <p><strong>ID No.:</strong> {viewProfile.idNumber}</p>
            <p><strong>Address:</strong> {viewProfile.address}, {viewProfile.suburb}, {viewProfile.city}, {viewProfile.zip}</p>
            <p><strong>Contact No.:</strong> {viewProfile.contact}</p>
            <p><strong>Email:</strong> {viewProfile.email}</p>
            <button className='close-btn' onClick={closeProfile}>Close</button>
          </div>
        </div>
      )} */}

      {currentForm === 'login' ? (
        <Login onFormSwitch={onFormSwitch} onLogin={handleLogin} />
      ) : (
        <Register onFormSwitch={onFormSwitch} />
      )}
    </div>
  );
}

export default App;
