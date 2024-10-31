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
import AdminPayroll from "./pages/AdminPayroll";
import LoginPage from "./pages/LoginPage";
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
        <Link to="/AdminPayroll">
          <button className="nav-button">Admin Payroll</button>
        </Link>
        <Link to="/LoginPage">
          <button className="nav-button">login page</button>
        </Link>
      </div>

      <Routes>
        <Route path="/" element={<DefaultHome />} />
        <Route path="/LoginPage" element={<LoginPage />} />
        <Route path="/AdminCalendar" element={<AdminCalendar />} />
        <Route path="/AdminHome" element={<AdminHome />} />
        <Route path="/AdminPayroll" element={<AdminPayroll />} />
        <Route path="/LoginPage" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
