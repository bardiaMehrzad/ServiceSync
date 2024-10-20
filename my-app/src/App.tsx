import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';
import DefaultHome from "./pages/DefaultHome";
import AdminCalendar from "./pages/AdminCalendar";
import AdminHome from "./pages/AdminHome";
import './App.css'; 

function App() {
  return (
    <Router>
      <div className="button-container">
        <Link to="/">
          <button className="nav-button">Home</button>
        </Link>
        <Link to="/AdminCalendar">
          <button className="nav-button">Admin Calendar</button>
        </Link>
        <Link to="/AdminHome">
          <button className="nav-button">Admin Home</button>
        </Link>
      </div>

      <Routes>
        <Route path="/" element={<DefaultHome />} />
        <Route path="/AdminCalendar" element={<AdminCalendar />} />
        <Route path="/AdminHome" element={<AdminHome />} />
      </Routes>
    </Router>
  );
}

export default App;
