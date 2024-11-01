import React from "react";
import './CSS/AdminJobPage.css';

const AdminHome = () => {
    return (
        <div className="admin-home">
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
               
                <div className="job-list-section">
                    <h2>Job List</h2>
                    <div className="job-list">
                        <div className="job-item">
                            <span>Plumbing</span>
                            <span>1045 Random St</span>
                            <span>Assigned to: Jeff</span>
                            <span>9/28/24 9:00AM</span>
                        </div>
                        <div className="job-item">
                            <span>Repairs</span>
                            <span>1045 Random St</span>
                            <span>Assigned to: N/A</span>
                            <span>9/28/24 11:00AM</span>
                        </div>
                        <div className="job-item">
                            <span>Installation</span>
                            <span>1045 Random St</span>
                            <span>Assigned to: Nick</span>
                            <span>9/30/24 2:00PM</span>
                        </div>
                        <div className="job-item">
                            <span>Plumbing</span>
                            <span>1235 Random St</span>
                            <span>Assigned to: Tyler</span>
                            <span>10/30/24 12:00PM</span>
                        </div>
                        <div className="job-item">
                            <span>Plumbing</span>
                            <span>1235 Random St</span>
                            <span>Assigned to: Tyler</span>
                            <span>10/30/24 12:00PM</span>
                        </div>
                        <div className="job-item">
                            <span>Plumbing</span>
                            <span>1235 Random St</span>
                            <span>Assigned to: Tyler</span>
                            <span>10/30/24 12:00PM</span>
                        </div>
                        <div className="job-item">
                            <span>Plumbing</span>
                            <span>1235 Random St</span>
                            <span>Assigned to: Tyler</span>
                            <span>10/30/24 12:00PM</span>
                        </div>
                        <div className="job-item">
                            <span>Plumbing</span>
                            <span>1235 Random St</span>
                            <span>Assigned to: Tyler</span>
                            <span>10/30/24 12:00PM</span>
                        </div>
                        <div className="job-item">
                            <span>Plumbing</span>
                            <span>1235 Random St</span>
                            <span>Assigned to: Tyler</span>
                            <span>10/30/24 12:00PM</span>
                        </div>
                    </div>
                </div>
                <div className="job-button-container">
                    <button className="job-button">Add Job</button>
                    <button className="job-button">Remove Job</button>
                    <button className="job-button">Edit Job</button>
                </div>
            </div>
        </div>
    );
};

export default AdminHome;
