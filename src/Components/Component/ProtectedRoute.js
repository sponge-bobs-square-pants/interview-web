import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuthContext } from '../Context/AuthContext'
const ProtectedRoute = ({ allowedRoles }) => {
  const { user, role } = useAuthContext()
  const location = useLocation()
  console.log('ROLE:', role)
  if (role) {
    if (allowedRoles.includes(role)) {
      return <Outlet />
    } else {
      return <Navigate to="/" state={{ from: location }} replace />
    }
  } else {
    return <Navigate to="/" state={{ from: location }} replace />
  }
}

export default ProtectedRoute
