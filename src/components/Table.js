import React from 'react';

function Table({ registrationDetails, onEdit, onDelete }) {
  return (
    <div className='table-wrap'>
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
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;








