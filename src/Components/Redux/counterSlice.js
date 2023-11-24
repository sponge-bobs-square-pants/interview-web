import { createSlice } from '@reduxjs/toolkit'

const getLocalStorage = () => {
  let value = localStorage.getItem('value')
  if (value) {
    return JSON.parse(value)
  } else {
    return 0
  }
}

const initialState = {
  value: getLocalStorage(),
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1
      localStorage.setItem('value', JSON.stringify(state.value))
    },
    decrement: (state) => {
      state.value -= 1
      localStorage.setItem('value', JSON.stringify(state.value))
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload
      localStorage.setItem('value', JSON.stringify(state.value))
    },
  },
})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = counterSlice.actions

export default counterSlice.reducer