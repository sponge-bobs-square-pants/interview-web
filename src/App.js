import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { decrement, increment } from './Components/Redux/counterSlice'
import { useFirstContext } from './Components/Context/FirstContext'

import { AuthProvider } from './Components/Context/AuthContext'
import { useAuthContext } from './Components/Context/AuthContext'
import { BrowserRouter as Router, Route, Routes, redirect } from 'react-router-dom'
import PrivateRoute from './Components/Component/PrivateRoute'
import Timesheet from './Components/Timesheet'
import Login from './Components/Component/Login'
import ErrorPage from './Components/Pages/ErrorPage'
import Manager from './Components/Pages/Manager'
import Employee from './Components/Pages/Employee'
import Admin from './Components/Pages/Admin'
const App = () => {
  // const count = useSelector((state) => state.counter.value)
  // const dispatch = useDispatch()

  // const {value, Increment, Decrement, Reset} = useFirstContext();
  // console.log(value, Increment);
// const {login, logout} = useAuthContext();
  // return (
  //   <AuthProvider>
  //   <Router>
  //     <Routes>
  //       {/* <Route exact path='/login' Component={Login}></Route> */}
  //       {/* <PrivateRoute exact path='/timesheet' roles={['admin', 'manager', 'employees']} Component={TimeSheet}></PrivateRoute> */}
  //     {/* <Route exact path='/Timesheet' element={<Timesheet />} /> */}
  //     </Routes>
  //   </Router>
  // </AuthProvider>
  // )
  const {role} = useAuthContext();
  return (
    // <AuthProvider>
    <Router>
    <Routes>

    <Route exact path='/' element={<Login />}/>
    <Route path='/Timesheet' element={<Timesheet />}></Route>
    <Route exact path='/Manager' element={<Manager />} />
    <Route exact path='/Employee' element={<Employee />} />
    <Route exact path='/Admin' element={<Admin />} />
    {/* <PrivateRoute exact path='/timesheet' roles={['admin']} Component={<Timesheet />}></PrivateRoute> */}
    {/* <Route exact path='/timesheet' element={<Timesheet />}></Route> */}
    <Route path="*" element={<ErrorPage />} />
    </Routes>
    </Router>
    // {/* </AuthProvider> */}
  )
}

export default App
