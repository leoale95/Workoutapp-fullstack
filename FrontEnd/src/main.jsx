import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { WorkoutsContextProvider } from './context/workoutContext.jsx';
import { AuthContextProvider } from './context/authContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthContextProvider>
  <WorkoutsContextProvider>
    <App />
  </WorkoutsContextProvider>
</AuthContextProvider>,
)
