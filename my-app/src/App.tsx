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
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import CompanyCreation from "./pages/CompanyCreation";
import AdminJobPage from "./pages/AdminJobPage";
import EmployeeCalendar from "./pages/EmployeeCalendar";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC-zHokpPV316sdixgDhPizAgz4h_m1U84",
  authDomain: "fir-for-auth-web-app.firebaseapp.com",
  projectId: "fir-for-auth-web-app",
  storageBucket: "fir-for-auth-web-app.firebasestorage.app",
  messagingSenderId: "79542475148",
  appId: "1:79542475148:web:2e835ba094dbf469979ea9",
  measurementId: "G-CVX4XY78EL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AdminHome />} />
        <Route path="/SignUp" element={<SignUpPage />} />
        <Route path="/SignIn" element={<SignInPage />} />
        <Route path="/ForgotPassword" element={<ForgotPasswordPage />} />
        <Route path="/AdminCalendar" element={<AdminCalendar />} />
        <Route path="/AdminHome" element={<AdminHome />} />
        <Route path="/AdminPayroll" element={<AdminPayroll />} />
        <Route path="/AdminJobPage" element={<AdminJobPage />} />
        <Route path="/CompanyCreation" element={<CompanyCreation />} />
        <Route path="/EmployeeCalendar" element={<EmployeeCalendar />} />
      </Routes>
    </Router>
  );
}

export default App;
