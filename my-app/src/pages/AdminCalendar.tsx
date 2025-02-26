import React, { useState } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import './CSS/AdminCalendar.css';
import { Link } from 'react-router-dom';
import GoogleCalendar from "./APIs/GoogleCalendar"; // Ensure this path is correct and the file exists

const AdminCalendar = () => {
    const [date, setDate] = useState(new Date());

    // Function to handle date selection (example use case)
    const handleSelectDate = () => {
        const newDate = new Date(2024, 9, 20); // Note: Month is 0-indexed in JS
        setDate(newDate);
    };

    return (
        <div className="admin-calendar">
            {/* Navbar Section */}

            {/* Page Content */}
            <div className="page-content">
                {/* Google Calendar Section */}
                <div className="google-calendar-section">
                    <GoogleCalendar />
                </div>
            </div>
        </div>
    );
};

export default AdminCalendar;
