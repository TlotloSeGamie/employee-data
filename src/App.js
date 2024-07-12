import React, { useState } from 'react';
import './App.css';
import Table from './components/Table';
import Form from './components/Form';
function App() {

  const [formOpen, setFormOpen] = useState (false);
  const [registrationDetails, setRegistrationDetails]= useState([]);
  const submit= (registrationDetails,names, id, address, suburb, city, zip, contact, email,)=>{
    setRegistrationDetails((registrationDetails)=>[...registrationDetails,{names:names, id:id, address:address, suburb:suburb, city:city, zip:zip, contact:contact, email:email}])
    
    console.log(registrationDetails);
};


  return (
    <div className="App">
      <Table/>
      <button className='btn' onClick={()=> setFormOpen(true)} >
        Add</button>
      {formOpen && <Form closeForm={()=>(
        setFormOpen(false)
      )} />}
    </div>
  );
}

export default App;
