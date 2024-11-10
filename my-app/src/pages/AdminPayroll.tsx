import React from "react";
import './CSS/AdminCalendar.css';
import { Link } from 'react-router-dom'; // You can reuse the same CSS file

const AdminPayroll = () => {
    return (
        <div className="admin-calendar">
            <header className="navbar">
                <div className="navbar-left">
                    <div className="servicesync-text">ServiceSync</div>
                    <div className="company-logo">Company Logo Here</div>
                </div>
                <div className="navbar-right">
                    <Link to="/AdminHome"><button>Home</button></Link>
                    <Link to="/AdminCalendar"><button>Calendar</button></Link>
                    <Link to="/AdminJobPage"><button>Jobs</button></Link>
                    <Link to="/AdminPayroll"><button>Payroll</button></Link>
                    <Link to="/LoginPage"><button>Log Out</button></Link>
                    <div className="user-info">User Info Here</div>
                </div>
            </header>
            <div className="page-content">
                <h2>Payroll Information</h2>
                {/* Add your payroll content here */}
            </div>
        </div>
    );
};

export default AdminPayroll;
