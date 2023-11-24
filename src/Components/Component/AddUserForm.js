import React, { useState } from 'react';
import axios from 'axios';

const AddUserForm = () => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newUser = {
      userId,
      password,
      role,
    };

    try {
      const response = await axios.post('https://agamitechinterviewapi.onrender.com/api/v1/addUser', newUser);
      console.log(response.data);
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  return (
    <div>
      <h2>Add New User</h2>
      <form onSubmit={handleSubmit}>
        <label>User ID:</label>
        <input type="text" value={userId} onChange={(e) => setUserId(e.target.value)} required />

        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

        <label>Role:</label>
        <input type="text" value={role} onChange={(e) => setRole(e.target.value)} required />

        <button type="submit">Add User</button>
      </form>
    </div>
  );
};

export default AddUserForm;
