import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../Context/AuthContext'
import axios from 'axios';
const Employee = () => {
    const {user} = useAuthContext();
    const [hoursWorked, setHoursWorked] = useState('');
    const [projectName, setprojectName] = useState('');
    const [description, setDescription] = useState('');
    const [remark, setRemark] = useState('');
    const [TimeSheet, setTimeSheet] = useState([]);
    const [manager, setManager] = useState(null);
    const [editTimesheetId, setEditTimesheetId] = useState(null);
    const submitTimesheet = async () => {
        const employeeId = user;
        const data = {
            employeeId,
            hoursWorked,
            projectName,
            description,
            remark
        }
        try {
            const response = await axios.post('https://agamitechinterviewapi.onrender.com/api/v1/submit-timesheet', data)
            const latestTimesheet = response.data.timesheets[0];
            if (!latestTimesheet || latestTimesheet.managerGrade === null) {
                // If not graded, allow submission
                const submitResponse = await axios.post('https://agamitechinterviewapi.onrender.com/api/v1/submit-timesheet', data);
                if (submitResponse.data.success) {
                    console.log('TimeSheet has been submitted');
                } else {
                    console.log('Failed to submit the time sheet');
                }
            } else {
                console.log('You cannot edit a timesheet that has been graded by the manager.');
            }
        } catch (error) {
            console.log('There was some error', error);
        }

    }
    const getTimesheets = async (user) => {
        try {
            const url = `https://agamitechinterviewapi.onrender.com/api/v1/getetimesheet?employee=${user}`
            const response = await axios.get(url)
            setTimeSheet(response.data);
        } catch (error) {
            console.log(error);
        }
        
    }
    const getManager = async (user) => {
        try {
          const response = await axios.get(`https://agamitechinterviewapi.onrender.com/api/v1/getmyManager?employee=${user}`);
          if (response.data.Manager && response.data.Manager.length > 0) {
            const managerId = response.data.Manager[0].userId;
            setManager({ EmployeeId: managerId });
          } else {
            console.log('Manager not found');
          }
        } catch (error) {
          console.error('Error getting manager:', error);
        }
      };
    
    useEffect(() => {
        getManager(user);
      }, []);
      const handleEditClick = (timesheetId) => {
        console.log(timesheetId, 'Handel click');
        setEditTimesheetId(timesheetId);
    };

    const handleCancelEdit = () => {
        setEditTimesheetId(null);
    };
    const handleUpdateTimesheet = async (editTimesheetId) => {
        // console.log(editTimesheetId, 'updating Timesheet');
        const employeeId = user;
        const data = { 
            employeeId,
            hoursWorked,
            projectName,
            description,
            remark
        };
        console.log(typeof hoursWorked);
        try {
            const response = await axios.post(`http://localhost:5000/api/v1/update-timesheet/${editTimesheetId}`, data);
            alert(response.data)
            if (response.data.success) {
                console.log('Timesheet has been updated');
                setHoursWorked('');
                setprojectName('');
                setDescription('');
                setRemark('');
                setEditTimesheetId(null);
                getTimesheets(user);
            } else {
                console.log('Failed to update the timesheet');
            }
        } catch (error) {
            console.log('There was some error', error);
        }
    };
  
    const modifiedTS = Object.values(TimeSheet)
    // console.log(modifiedTS);
    // let modifiedTS = TimeSheet1[1]
    // console.log(modifiedTS);
  return (
    <div>
        <h2>Employee dashboard</h2>
        <form>
        <label>Manager</label>
        <input type='text' value={manager ? manager.EmployeeId : ''} disabled />
            <label>Hours worked</label>
            <input type='Number' value={hoursWorked} onChange={(e) => setHoursWorked(e.target.value)}></input>
            <label>Project Name</label>
            <input type='text' value={projectName} onChange={(e) => setprojectName(e.target.value)}></input>
            <label>description</label>
            <input type='text' value={description} onChange={(e) => setDescription(e.target.value)}></input>
            <label>Remark</label>
            <input type='text' value={remark} onChange={(e) => setRemark(e.target.value)}></input>
            {editTimesheetId ? (
                    <>
                        <button onClick={() => handleUpdateTimesheet(editTimesheetId)}>Update</button>
                        <button onClick={handleCancelEdit}>Cancel</button>
                    </>
                ) : (
                    <button type='button' onClick={submitTimesheet}>
                        Submit
                    </button>
                )}
        </form>

        {/* {console.log(hoursWorked, description, projectName, remark)} */}
        {/* {console.log( Timesheet1)} */}
        <button onClick={() => getTimesheets(user)}>Get the Timesheets</button>
        
        {modifiedTS.map((sheet, index) => (
  <div key={index}>
    {sheet.map((m, index1) => (
      <ul key={index1} style={{ color: 'black' }}>
        <li>Employee ID: {m.employeeId}</li>
        <li>Submission Date: {m.submissionDate}</li>
        {m.hoursWorked !== null && <li>Hours Worked: {m.hoursWorked}</li>}
        {m.description !== '' && <li>Description: {m.description}</li>}
        {m.projectName !== '' && <li>Project Name: {m.projectName}</li>}
        {m.remark !== '' && <li>Remark: {m.remark}</li>}
        <li>Grade:{m.managerGrade}</li>
        {!m.managerGrade && (
                                <button onClick={() => {
                                    const id=m._id
                                    console.log(id);
                                    handleEditClick(id)
                                }}>Edit Timesheet</button>
                            )}
      </ul>
    ))}
  </div>
))}
    </div>
    
  )
}

export default Employee
