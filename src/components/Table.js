import React, { useState } from 'react';

function Table({ registrationDetails, onEdit, onDelete }) {
  const [selectedProfile, setSelectedProfile] = useState(null);

  const handleViewProfile = (index) => {
    setSelectedProfile(registrationDetails[index]);
  };

  const handleCloseProfile = () => {
    setSelectedProfile(null);
  };

  return (
    <div className='table-wrap'>
      {registrationDetails.length > 0 ? (
        <div>
          <table className='table'>
            <thead className='header'>
              <tr className='heads'>
                <th>Full Name</th>
                <th>ID No.</th>
                <th>Contact No.</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {registrationDetails.map((data, index) => (
                <tr key={index}>
                  <td>{data.names}</td>
                  <td>{data.id}</td>
                  <td>{data.contact}</td>
                  <td>{data.email}</td>
                  <td>
                    <span className='actions'>
                      <button className='edit' onClick={() => onEdit(index)}>edit</button>
                      <button className='delete' onClick={() => onDelete(index)}>delete</button>
                      <button className='view-profile' onClick={() => handleViewProfile(index)}>View Profile</button>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {selectedProfile && (
            <div className='profile-popout'>
              <button className='close-profile' onClick={handleCloseProfile}>Close</button>
              <h2>Profile Details</h2>
              {selectedProfile.image && (
                <img 
                  src={URL.createObjectURL(selectedProfile.image)} 
                  alt='Profile' 
                  className='profile-image'
                />
              )}
              <p><strong>Full Name:</strong> {selectedProfile.names}</p>
              <p><strong>ID No.:</strong> {selectedProfile.id}</p>
              <p><strong>Address:</strong> {selectedProfile.address}, {selectedProfile.suburb}, {selectedProfile.city}, {selectedProfile.zip}</p>
              <p><strong>Contact No.:</strong> {selectedProfile.contact}</p>
              <p><strong>Email:</strong> {selectedProfile.email}</p>
            </div>
          )}
        </div>
      ) : (
        <p className='no-data-message'>No record</p>
      )}
    </div>
  );
}

export default Table;
