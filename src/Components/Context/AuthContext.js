import React, { useState, useReducer, useContext } from "react";

import reducer from '../Reducer/AuthReducer'

// const getLocalStorage = () => {
//     let user = localStorage.getItem('user')
//     if (user) {
//       return JSON.parse(user)
//     } else {
//       return null
//     }
//   }
//   const getLocalStorageP = () => {
//     let password = localStorage.getItem('password')
//     if (password) {
//       return JSON.parse(password)
//     } else {
//       return ''
//     }
//   }
  const getLocalStorage = (datas) => {
    let data = localStorage.getItem(datas)
    if (data) {
      return JSON.parse(data)
    } else {
      return ''
    }
  }
  const getLocalStorageR = () => {
    let role = localStorage.getItem('role')
    if(role){
        return JSON.parse(role)
    }
    else{
        return ''
    }
  }

const initialState = {
    user:getLocalStorage('user'),
    passwords:getLocalStorage('password'),
    role:getLocalStorageR(),
    Managers:'', 
    Employees:'',
}

const AuthContext = React.createContext()

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const login = (userData) => {
    dispatch({type:'LOGIN_USER', payload:userData})
  }
  const pass = (userData) => {
    dispatch({type:'PASSWORD_LOGIN', payload:userData})
  }
  const setRole = (userData) => {
    dispatch({type:'SET_ROLE', payload:userData})
  }
//   const passlogin({})
  const logout = () => {
    dispatch({type:'LOGOUT_USER'})
  }
  const setManagers = (userData) => {
    dispatch({type:'SET_MANAGER', payload:userData})
  }
  const setEmployee = (userData) => {
    dispatch({type:'SET_EMPLOYEE', payload:userData})
  }
  return (
    <AuthContext.Provider value={{ ...state, login, logout, pass, setRole, setEmployee, setManagers }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => {
  return useContext(AuthContext)
}