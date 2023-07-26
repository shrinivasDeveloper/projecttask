import React from 'react';
import { BrowserRouter as Router, Routes, Route,Link} from 'react-router-dom';
import Login from './pages/Login';
import Planet from './pages/Planet';
import './App.css';

function App() {
  return (
    <Router>
      <div className='container'>
         <nav>
          <ul>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/planet">Search Planets</Link>
            </li>
          </ul>
        </nav> 
        
       <Routes>
          <Route path="/login" element={<Login/>} />
          <Route path="/planet" element={<Planet/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
