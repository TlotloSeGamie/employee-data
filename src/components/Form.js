import React, { useState } from 'react'

 function Form( {closeForm})  {

    const [names, setNames]= useState('');
    const [id, setId]= useState('');
    const [address, setAddress]= useState('');
    const [suburb, setSuburb]= useState('');
    const [city, setCity]= useState('');
    const [zip, setZip]= useState('');
    const [contact, setContact]= useState('');
    const [email, setEmail]= useState('');


  return (
    <div className='form-container' onClick={(e) => {
        if (e.target.className === "form-container") closeForm();
        }}
        >
      <div className='register'>
        <h4><b>Registration Form</b></h4>
        <form className='form-group'>
            <div>
                <label htmlFor='names'>Full Names:</label>
                <input name='names' type='text' placeholder='First and Last Name' onChange={(event)=> setNames(event.target.value)} />
            </div>
            <div>
                <label htmlFor='id'>Id Number:</label>
                <input name='id' type='text' placeholder='ID Number' onChange={(event)=> setId(event.target.value)} />
            </div>
            <div>
                <label htmlFor='address'>Full Address:</label>
                <input name='address' type='text' placeholder='Street Address' onChange={(event)=> setAddress(event.target.value)}  />
                <input name='suburb' type='text' placeholder='Suburb' onChange={(event)=> setSuburb(event.target.value)} />
                <input name='city' type='text' placeholder='City' onChange={(event)=> setCity(event.target.value)} />
                <input name='zip' type='text' placeholder='Zip Code' onChange={(event)=> setZip(event.target.value)} />
            </div>
            <div>
                <label htmlFor='contact'>Contact No.</label>
                <input name='contact' type='text' placeholder='Conctact Number' onChange={(event)=> setContact(event.target.value)} />
            </div>
            <div>
                <label htmlFor='email'>Email:</label>
                <input name='email' type='text' placeholder='example@example.com' onChange={(event)=> setEmail(event.target.value)} />
            </div>
            <button type='submit' className='btn' >Submit</button>
        </form>
      </div>
    </div>
  )
}
export default Form;