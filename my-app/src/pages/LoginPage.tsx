import React from "react"; // Import React for creating components.
import './CSS/LoginPage.css'; // Import custom CSS for styling.

const LoginPage = () => {
    return (
        <div className="login-container">
            <div className="login-box">
                <div className="logo">
                    {/* Logo placeholder - you can replace this with an actual image */}
                    <img src="https://via.placeholder.com/50" alt="Logo" />
                </div>
                <h2>Sign In</h2>
                <p>Don't have an account? <a href="#signup">Sign Up</a></p>

                <div className="alert-box">
                    {/* Alert notification box */}
                    <p>Please log in with your email, password, and company key.</p>
                </div>

                <form>
                    <div className="input-group">
                        <label>Email*</label>
                        <input type="email" placeholder="Your Email" required />
                    </div>
                    <div className="input-group">
                        <label>Password*</label>
                        <input type="password" placeholder="******" required />
                    </div>
                    <div className="input-group">
                        <label>Company Code*</label>
                        <input type="text" placeholder="******" required />
                    </div>
                    <div className="options">
                        <label>
                            <input type="checkbox" /> Remember me
                        </label>
                        <a href="#forgot-password">Forgot Password?</a>
                    </div>
                    <button type="submit" className="sign-in-button">Sign In</button>
                    <button type="button" className="sign-up-button">Sign Up</button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage; // Export the LoginPage component.
