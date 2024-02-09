import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { store } from './Components/Redux/Store'
import { Provider } from 'react-redux'
import { FirstProvider } from './Components/Context/FirstContext';
import { AuthProvider } from './Components/Context/AuthContext';

  
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // <Provider store={store}>
    <FirstProvider>
    <AuthProvider>
    <App />
    </AuthProvider>
    </FirstProvider>
    
    // </Provider>
);
