// src/App.js
import React from 'react';
import './CSS/CompanyCreation.css'; // You can also import global styles if needed
const  CompanyCreation = () => {
  return (
    <div className="company-creation">
      <div className="sitemap-background"></div>
      <div className="welcome-text">Welcome!</div>
      <div className="subtext">Get started today—schedule, manage, and stay organized</div>
      <div className="sign-in">Already have an account? Sign in</div>

      <div className="form">
        <div className="form-group">
          <label>First Name*</label>
          <input type="text" className="text-field" />
        </div>
        <div className="form-group">
          <label>Last Name*</label>
          <input type="text" className="text-field" />
        </div>
        <div className="form-group">
          <label>Company Name*</label>
          <input type="text" className="text-field" />
        </div>
        <div className="form-group">
          <label>Email*</label>
          <input type="email" className="text-field" />
        </div>
        <div className="form-group">
          <label>Password*</label>
          <input type="password" className="text-field" />
        </div>
        <div className="form-group">
          <label>Company Key*</label>
          <input type="text" className="text-field" />
        </div>
        <div className="form-group">
          <button className="button">Sign up</button>
        </div>

      </div>
    </div>
  );
}

export default CompanyCreation;
