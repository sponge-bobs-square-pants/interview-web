const Auth_reducer = (state, action) => {
  if (action.type === 'LOGIN_USER') {
    localStorage.setItem('user', JSON.stringify(action.payload));
    return { ...state, user: action.payload };
  }
  if (action.type === 'JWT_TOKEN') {
    localStorage.setItem('token', JSON.stringify(action.payload));
    return { ...state, token: action.payload };
  }
  if (action.type === 'LOGOUT_USER') {
    localStorage.setItem('user', JSON.stringify(null));
    localStorage.setItem('password', JSON.stringify(''));
    localStorage.setItem('role', JSON.stringify(''));
    return { ...state, user: null, passwords: '', role: '' };
  }
  if (action.type === 'PASSWORD_LOGIN') {
    localStorage.setItem('password', JSON.stringify(action.payload));
    return { ...state, passwords: action.payload };
  }
  if (action.type === 'SET_ROLE') {
    localStorage.setItem('role', JSON.stringify(action.payload));
    return { ...state, role: action.payload };
  }
  if (action.type === 'SET_MANAGER') {
    return { ...state, Managers: action.payload };
  }
  if (action.type === 'SET_EMPLOYEE') {
    return { ...state, Employees: action.payload };
  }
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default Auth_reducer;
