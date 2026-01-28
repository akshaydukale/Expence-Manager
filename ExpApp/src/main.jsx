import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import { AuthProvider } from './AuthContext.jsx'


import App from './App.jsx'
import Login from './Login.jsx'
import { AuthContext } from './AuthContext.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>,
)
