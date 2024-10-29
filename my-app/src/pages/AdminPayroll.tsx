import React from "react";
import './CSS/AdminCalendar.css';  // You can reuse the same CSS file

const AdminPayroll = () => {
    return (
        <div className="admin-calendar">
            <header className="navbar">
                <div className="navbar-left">
                    <div className="servicesync-text">ServiceSync</div>
                    <div className="company-logo">Company Logo Here</div>
                </div>
                <div className="navbar-right">
                    <button>Home</button>
                    <button>Calendar</button>
                    <button>Jobs</button>
                    <button>Payroll</button>
                    <button>Log Out</button>
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
