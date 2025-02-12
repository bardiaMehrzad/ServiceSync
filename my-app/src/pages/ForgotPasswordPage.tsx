import React, { useState } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { Link } from "react-router-dom";
import "./CSS/LoginPage.css";

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const auth = getAuth();

    const handleResetPassword = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!email) {
            setMessage("Please enter a valid email.");
            return;
        }

        try {
            await sendPasswordResetEmail(auth, email);
            setMessage("A password reset link has been sent to your email.");
        } catch (error: any) {
            setMessage("Error sending reset email: " + error.message);
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>Forgot Password?</h2>
                <p>Enter your email below, and we'll send you a password reset link.</p>

                {message && <p className="message-box">{message}</p>} {/* Display success or error message */}

                <form onSubmit={handleResetPassword}>
                    <div className="input-group">
                        <label>Email*</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="sign-in-button">Send Reset Link</button>
                </form>

                <p>
                    Remembered your password? <Link to="/SignIn">Go back to login</Link>
                </p>
            </div>
        </div>
    );
};

export default ForgotPasswordPage;


// import React, { useState } from "react";
// import './CSS/LoginPage.css';

// const ForgotPasswordPage = () => {
//     const [email, setEmail] = useState("");

//     const handleSubmit = (event: React.FormEvent) => {
//         event.preventDefault();
//         alert(`Password reset link sent to: ${email}`);
//         // Here you can integrate Firebase or backend logic for password recovery
//     };

//     return (
//         <div className="login-container">
//             <div className="login-box">
//                 <h2>Forgot Password?</h2>
//                 <p>Enter your email to receive a password reset link.</p>

//                 <form onSubmit={handleSubmit}>
//                     <div className="input-group">
//                         <label>Email*</label>
//                         <input
//                             type="email"
//                             placeholder="Your Email"
//                             value={email}
//                             onChange={(e) => setEmail(e.target.value)}
//                             required
//                         />
//                     </div>
//                     <button type="submit" className="sign-in-button">Send Reset Link</button>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default ForgotPasswordPage;
