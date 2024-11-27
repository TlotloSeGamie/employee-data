// Home Component
import React, { useState, useEffect } from 'react';
import '../App.css';
import Table from './Table';
import Form from './Form';
import Navbar from './Navbar';

function Home() {
  const [formOpen, setFormOpen] = useState(false);
  const [formMode, setFormMode] = useState('add'); 
  const [currentIndex, setCurrentIndex] = useState(null); 
  const [registrationDetails, setRegistrationDetails] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewProfile, setViewProfile] = useState(null); 
  const [idError, setIdError] = useState('');

  useEffect(() => {
    const storedDetails = localStorage.getItem('registrationDetails');
    if (storedDetails) {
      setRegistrationDetails(JSON.parse(storedDetails));
    }
  }, []);
  
  useEffect(() => {
    localStorage.setItem('registrationDetails', JSON.stringify(registrationDetails));
  }, [registrationDetails]);

  const submit = (details) => {
    if (formMode === 'add') {
      const isDuplicate = registrationDetails.some(item => item.id === details.id);
      if (isDuplicate) {
        setIdError('ID number already registered.');
        alert('ID number already registered.');
        return;
      }
      setRegistrationDetails(prevDetails => [...prevDetails, details]);
      alert('Registration successful!');
    } else if (formMode === 'edit') {
      const updatedRegistrationDetails = [...registrationDetails];
      updatedRegistrationDetails[currentIndex] = details;
      setRegistrationDetails(updatedRegistrationDetails);
      alert('Record updated successfully!');
    }
    setFormOpen(false);
    setIdError(''); 
  };

  const handleEdit = (index) => {
    setCurrentIndex(index);
    setFormMode('edit');
    setFormOpen(true);
  };

  const handleDelete = (index) => {
    const updatedRegistrationDetails = registrationDetails.filter((_, i) => i !== index);
    setRegistrationDetails(updatedRegistrationDetails);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredDetails = registrationDetails.filter((details) =>
    details.names.toLowerCase().includes(searchTerm.toLowerCase())
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
      <input
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
            <p><strong>Full Name:</strong> {viewProfile.names}</p>
            <p><strong>Gender:</strong> {viewProfile.gender}</p>
            <p><strong>ID No.:</strong> {viewProfile.id}</p>
            <p><strong>Address:</strong> {viewProfile.address}, {viewProfile.suburb}, {viewProfile.city}, {viewProfile.zip}</p>
            <p><strong>Contact No.:</strong> {viewProfile.contact}</p>
            <p><strong>Email:</strong> {viewProfile.email}</p>
            <button className='close-btn' onClick={closeProfile}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
