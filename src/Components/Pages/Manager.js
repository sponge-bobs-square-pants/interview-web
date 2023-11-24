import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuthContext } from '../Context/AuthContext';

const Manager = () => {
  const { user: managerId } = useAuthContext();
  const [managerEmployees, setManagerEmployees] = useState([]);
  const [timesheets, setTimesheets] = useState([]);
  const [selectedGrade, setSelectedGrade] = useState(1); 

  useEffect(() => {
    // Fetch assigned employees for the manager
    const fetchEmployees = async () => {
      try {
        const response = await axios.get(`https://agamitechinterviewapi.onrender.com/api/v1/manager/employees/${managerId}`);
        // console.log(response.data.employeeIds);
        setManagerEmployees(response.data.employeeIds);
      } catch (error) {
        console.error(error);
      }
    };

    fetchEmployees();
  }, [managerId]);

  useEffect(() => {
    const fetchTimesheets = async () => {
      try {
        const employeeIds = managerEmployees.map((employee) => employee);
        console.log(employeeIds);
        const response = await axios.post('https://agamitechinterviewapi.onrender.com/api/v1/manager/all-timesheets', { employeeIds });
        setTimesheets(response.data.timesheets);
      } catch (error) {
        console.error(error);
      }
    };

    if (managerEmployees.length > 0) {
      fetchTimesheets();
    }
  }, [managerEmployees]);
  
  const handleGradeUpdate = async (timesheetId) => {
    try {
      const response = await axios.put(`https://agamitechinterviewapi.onrender.com/api/v1/manager/grade/${timesheetId}`, {
        managerGrade: selectedGrade,
      });
      setTimesheets((prevTimesheets) =>
        prevTimesheets.map((timesheet) =>
          timesheet._id === timesheetId ? { ...timesheet, managerGrade: selectedGrade } : timesheet
        )
      );

      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };


  // console.log(managerEmployees);
  return (
    <div>
    <h2>Manager Dashboard</h2>
    <div>
      <label>Select Employee: </label>
      <select>
        <option value="" disabled>
          Choose an Employee
        </option>
        {managerEmployees.map((employee, index) => (
          <option key={index} value={employee}>
            {employee}
          </option>
        ))}
      </select>
    </div>
    <div>
      <h3>Timesheets for Assigned Employees</h3>
      <ul>
        {timesheets.map((timesheet) => (
          <li key={timesheet._id}>
            <li>EmployeeId: {timesheet.employeeId}</li>
            <li>Project Name: {timesheet.projectName} </li>
            <li>Description: {timesheet.description}</li>
            <li>Hours Worked: {timesheet.hoursWorked}</li>
            <li>Remark: {timesheet.remark}</li>
            <li>Submission Date: {timesheet.submissionDate}</li>
            <li>
              Grade: {timesheet.managerGrade || 'Not Graded'}
              <select
                value={selectedGrade}
                onChange={(e) => setSelectedGrade(Number(e.target.value))}
              >
                {[1, 2, 3, 4, 5].map((grade) => (
                  <option key={grade} value={grade}>
                    {grade}
                  </option>
                ))}
              </select>
              <button onClick={() => handleGradeUpdate(timesheet._id)}>Grade</button>
            </li>
            <br />
          </li>
        ))}
      </ul>
    </div>
  </div>
);
};

export default Manager;
