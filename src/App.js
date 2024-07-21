import React, { useState } from 'react';
import './App.css';
import Table from './components/Table';
import Form from './components/Form';

function App() {
  const [formOpen, setFormOpen] = useState(false);
  const [formMode, setFormMode] = useState('add'); // 'add' or 'edit'
  const [currentIndex, setCurrentIndex] = useState(null); // index of the item being edited
  const [registrationDetails, setRegistrationDetails] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const submit = (details) => {
    if (formMode === 'add') {
      setRegistrationDetails([...registrationDetails, details]);
    } else if (formMode === 'edit') {
      const updatedRegistrationDetails = [...registrationDetails];
      updatedRegistrationDetails[currentIndex] = details;
      setRegistrationDetails(updatedRegistrationDetails);
    }
    setFormOpen(false);
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

  return (
    <div className="App">
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
    </div>
  );
}

export default App;