import React, { useState } from 'react';
import { useAuthContext } from '../Context/AuthContext';
import axios from 'axios';
// import ErrorPage from '../Pages/ErrorPage';
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const { login, user, pass, setRole, settoken, logout } = useAuthContext();
  // console.log(user, passwords);
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleUserChange = (e) => {
    // console.log(e.target.value);
    setUserId(e.target.value);
  };
  const handlePassChange = (e) => {
    setPassword(e.target.value);
  };
  const handleFormSubmit = async (user, userId, password) => {
    login(userId);
    pass(password);
    const url = `http://localhost:5000/api/v1/handleFormSubmit`;
    const data = { userId, password };
    try {
      const response = await axios.post(url, data);
      if (response.status === 200) {
        console.log(response.data);
        settoken(response.data.token);
        setRole(response.data.role);

        if (response.data.role === 'manager') {
          navigate('/Manager');
        }
        if (response.data.role === 'employee') {
          navigate('/Employee');
        }
        if (response.data.role === 'admin') {
          navigate('/Admin');
        } else {
          // logout();
        }
      }
      if (response.status === 401) {
        setRole('');
        navigate('/login');
        alert('Unauthorized Access');
      } else {
        // logout();
      }
    } catch (error) {
      console.log('There has been an issue', error);
      navigate('/login');
      alert('Unauthorized Access');
      // throw error
    }
  };
  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className='form-group'>
          <label>UserId</label>
          <input
            type='text'
            placeholder='Enter your user id'
            value={userId}
            onChange={handleUserChange}
          />
        </div>
        <div className='form-group'>
          <label>Password</label>
          <input
            type='Password'
            placeholder='Enter your password'
            value={password}
            onChange={handlePassChange}
          />
        </div>
        <button
          type='submit'
          onClick={() => handleFormSubmit(user, userId, password)}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
