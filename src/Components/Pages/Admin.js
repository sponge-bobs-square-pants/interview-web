import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuthContext } from '../Context/AuthContext';
import AddUserForm from '../Component/AddUserForm';

const Admin = () => {
  const { Managers, Employees, setEmployee, setManagers } = useAuthContext();
  const [manager, setSelectedManager] = useState('');
  const [employee, setSelectedEmployee] = useState('');

  useEffect(() => {
    const LoadPeople = async () => {
      const url = 'http://localhost:5000/api/v1/AdminPage';
      try {
        const response = await axios.get(url);
        setManagers(response.data.managers);
        setEmployee(response.data.employees);
      } catch (error) {
        console.log(error);
      }
    };
    LoadPeople();
  }, []);
  const AssignEmployee = async (manager, employee) => {
    console.log(manager, employee);
    const url = `http://localhost:5000/api/v1/AssignRoles?manager=${manager}&employee=${employee}`;
    try {
      const response = await axios.get(url);
      console.log(response);
    } catch (error) {}
  };

  const manage = Object.values(Managers);
  // console.log(manage)
  const employ = Object.values(Employees);

  return (
    <div>
      <label>Select employee</label>
      <select
        value={employee}
        onChange={(e) => setSelectedEmployee(e.target.value)}
      >
        <option value='' disabled>
          Choose an Employee
        </option>
        {employ.map((e, index) => {
          let userId = e.userId;
          return (
            <option key={index} value={userId}>
              {userId}
            </option>
          );
        })}
      </select>
      <label>Select Manager</label>
      <select
        value={manager}
        onChange={(e) => {
          setSelectedManager(e.target.value);
        }}
      >
        <option value='' disabled>
          Choose a Manager
        </option>
        {manage.map((m, index) => {
          // console.log(m.userId);
          return (
            <option key={index} value={m.userId}>
              {m.userId}
            </option>
          );
        })}
      </select>
      {console.log(manager, employee)}
      <button onClick={() => AssignEmployee(manager, employee)}>
        Assign Employee
      </button>
      <AddUserForm />
    </div>
  );
};

export default Admin;
