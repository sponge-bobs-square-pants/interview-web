import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  redirect,
} from 'react-router-dom';
import Login from './Components/Component/Login';
import { Admin, Manager, ErrorPage, Employee } from './Components/Pages/Index';
import ProtectedRoute from './Components/Component/ProtectedRoute';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Login />} />

        <Route element={<ProtectedRoute allowedRoles={['employee']} />}>
          <Route exact path='/Employee' element={<Employee />} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={['manager']} />}>
          <Route exact path='/Manager' element={<Manager />} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
          <Route exact path='/Admin' element={<Admin />} />
        </Route>
        <Route path='*' element={<ErrorPage />} />
      </Routes>
    </Router>
  );
};

export default App;
