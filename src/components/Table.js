import React from 'react'

const Table = (props) => {
  return (
    <div className='table-wrap'>
      <table className='table'>
        <thead>
            <tr>
                <th className='expand-0'>Full Name</th>
                <th className='expand-1'>ID No.</th>
                <th className='expand-2'>Contact No.</th>
                <th className='expand-3'>Email</th>
                <th className='expand-4'>Action</th>
            </tr>
        </thead>


        <tbody>
          <tr>
            <td>Name 1</td>
            <td>id no.1</td>
              <td>contact  1</td>
              <td className='label-1'>gmail.com</td>
                <td>  
                  <span className='actions'>
                    <button className='edit'>edit</button>
                    <button className='delete'>delete</button>
                    </span>
                </td> 
           </tr>
          <tr>


            
                <td>  
                  <span className='actions'>
                    <button className='edit'>edit</button>
                    <button className='delete'>delete</button>
                    </span>
                </td> 
           </tr>
          <tr>
            <td>Name 3</td>
            <td>id no.3</td>
              <td>contact  3</td>
              <td className='label-1'>gmail.com</td>
                <td>  
                  <span className='actions'>
                    <button className='edit'>edit</button>
                    <button className='delete'>delete</button>
                    </span>
                </td> 
           </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Table
 