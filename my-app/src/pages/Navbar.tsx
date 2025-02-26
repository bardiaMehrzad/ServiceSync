import React from "react";
import { Link } from "react-router-dom";
const Navbar = () => {
    return (
        <header className="navbar">
            <div className="navbar-left">
                <div className="servicesync-text">ServiceSync</div>
                <div className="company-logo">Company Logo Here</div>
            </div>
            <div className="navbar-right">
                <Link to="/AdminHome">
                    <button>Home</button>
                </Link>
                <Link to="/AdminCalendar">
                    <button>Calendar</button>
                </Link>
                <Link to="/AdminJobPage">
                    <button>Jobs</button>
                </Link>
                <Link to="/AdminPayroll">
                    <button>Payroll</button>
                </Link>
                <Link to="/SignIn">
                    <button>Log Out</button>
                </Link>
                <div className="user-info">User Info Here</div>
            </div>
        </header>
    );
};

export default Navbar;
