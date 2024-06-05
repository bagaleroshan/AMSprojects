import React from 'react'
import { useLocation } from 'react-router-dom';

const UpdateSubject = () => {
  const location = useLocation();
  const updateData = location.state.updateData;
  return (
    <div> 
    <h2>UpdateSubject</h2>
    <pre>{JSON.stringify(updateData)}</pre>
  </div>
  )
}

export default UpdateSubject