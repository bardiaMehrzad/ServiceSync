import React, { useState } from "react";
import 'react-calendar/dist/Calendar.css';
import { gapi } from "gapi-script";
import GoogleCalendar from ".//APIs/GoogleCalendar"; // Ensure this path is correct and the file exists

const EmployeeCalendar = () => {
    return (
        <div className="employee-calendar">
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

export default EmployeeCalendar;
