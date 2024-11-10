import React, { useState } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import './CSS/AdminCalendar.css';
import { Link } from 'react-router-dom';

const AdminCalendar = () => {
    const [date, setDate] = useState(new Date());
    const handleSelectDate = () => {
        const newDate = new Date(10 / 20 / 2024);
        setDate(newDate);
    };

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
                <div className="calendar-section">
                    <h2>Job Calendar</h2>
                    <div className="calendar">
                        <Calendar value={date} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminCalendar;
