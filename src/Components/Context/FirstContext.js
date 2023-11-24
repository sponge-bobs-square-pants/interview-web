// import axios from 'axios'
import React, { useContext, useEffect, useReducer } from 'react'
import reducer from '../Reducer/FirstReducer'

const getLocalStorage = () => {
    let value = localStorage.getItem('value')
    if (value) {
      return JSON.parse(value)
    } else {
      return 0
    }
  }
const initialState = {
  value:getLocalStorage(),
}

const FirstContext = React.createContext()

export const FirstProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const Increment = () => {
    dispatch({type:'INCREMENT_VALUE'})
  }
  const Decrement = () => {
    dispatch({type:'DECREMENT_VALUE'})
  }
  const Reset = () => {
    dispatch({type:'RESET_VALUE'})
  }
  return (
    <FirstContext.Provider value={{ ...state, Increment, Decrement, Reset}}>
      {children}
    </FirstContext.Provider>
  )
}

export const useFirstContext = () => {
  return useContext(FirstContext)
}