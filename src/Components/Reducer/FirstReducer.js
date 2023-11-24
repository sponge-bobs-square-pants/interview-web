


const Sidebar_reducer = (state, action) => {

  if (action.type === 'INCREMENT_VALUE') {
    const value = state.value + 1
    localStorage.setItem('value', JSON.stringify(value))
    return{...state, value}
  }
  if(action.type === 'DECREMENT_VALUE'){
    const value = state.value - 1
    localStorage.setItem('value', JSON.stringify(value))
    return{...state, value}
  }
  if(action.type === 'RESET_VALUE'){
    localStorage.setItem('value', JSON.stringify(0))
    return {...state, value:0}
  }
  throw new Error(`No Matching "${action.type}" - action type`);
}

export default Sidebar_reducer