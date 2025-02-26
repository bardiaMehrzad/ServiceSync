import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../pages/APIs/firebase";
import './CSS/LoginPage.css';
import { Link } from 'react-router-dom';

const SignInPage = () => {
    const [email, setEmail] = useState(""); // Stores user email
    const [password, setPassword] = useState(""); // Stores user password
    const [error, setError] = useState<string | null>(null); // Stores error messages
    const navigate = useNavigate(); // Hook for navigation

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault(); // Prevent page reload

        try {
            await signInWithEmailAndPassword(auth, email, password); // Firebase login
            navigate("/AdminHome"); // Redirect on success
        } catch (err) {
            setError("Invalid email or password. Please try again."); // ✅ Ensures the error message is set
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <div className="logo">
                    <img src="https://via.placeholder.com/50" alt="Logo" />
                </div>
                <h2>Sign In</h2>
                <p>Don't have an account? <Link to="/SignUp">Sign Up</Link></p>

                {/* ✅ Ensures the error message is always rendered */}
                {error && <p data-testid="error-message" className="error-message">{error}</p>}

                <form onSubmit={handleLogin}>
                    <div className="input-group">
                        <label>Email*</label>
                        <input
                            type="email"
                            placeholder="Your Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label>Password*</label>
                        <input
                            type="password"
                            placeholder="******"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="options">
                        <label>
                            <input type="checkbox" /> Remember me
                        </label>
                        <Link to="/ForgotPassword">Forgot Password?</Link>
                    </div>
                    <button type="submit" className="sign-in-button">Sign In</button>
                </form>
            </div>
        </div>
    );
};

export default SignInPage;
