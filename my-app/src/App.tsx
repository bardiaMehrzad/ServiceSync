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
import CompanyCreation from "./pages/CompanyCreation";
import AdminJobPage from "./pages/AdminJobPage";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AdminHome />} />
        <Route path="/LoginPage" element={<LoginPage />} />
        <Route path="/AdminCalendar" element={<AdminCalendar />} />
        <Route path="/AdminHome" element={<AdminHome />} />
        <Route path="/AdminPayroll" element={<AdminPayroll />} />
        <Route path="/AdminJobPage" element={<AdminJobPage />} />
        <Route path="/LoginPage" element={<LoginPage />} />
        <Route path="/CompanyCreation" element={<CompanyCreation />} />
      </Routes>
    </Router>
  );
}

export default App;
