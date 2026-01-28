import React from 'react'
import{ BrowserRouter as Router, Routes, Route, Link,useLocation} from 'react-router-dom';
import Dash from './Dash.jsx'
import Login from './Login.jsx'

const App = () => {
  return (
    <>
    <Router>
      
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/dash' element={<Dash />} />
       
      </Routes>
    </Router>
    
    </>
  )
}

export default App
