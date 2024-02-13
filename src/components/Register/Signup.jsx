import React, { useState } from "react";
import { Navigate, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { doCreateUserWithEmailAndPassword } from "../../firebase/auth";
import "./Register.css"; // Import the CSS file

const Register = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { userLoggedIn } = useAuth();

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!isRegistering) {
      setIsRegistering(true);
      await doCreateUserWithEmailAndPassword(email, password);
    }
  };

  return (
    <>
      {userLoggedIn && <Navigate to={"/home"} replace={true} />}

      <main className="register-container">
        <div className="register-form">
          <div className="register-heading">
            <h3>Create a New Account</h3>
          </div>
          <form onSubmit={onSubmit}>
            <div>
              <label className="register-label">Email</label>
              <input
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="register-input"
              />
            </div>

            <div>
              <label className="register-label">Password</label>
              <input
                disabled={isRegistering}
                type="password"
                autoComplete="new-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="register-input"
              />
            </div>

            <div>
              <label className="register-label">Confirm Password</label>
              <input
                disabled={isRegistering}
                type="password"
                autoComplete="off"
                required
                value={confirmPassword}
                onChange={(e) => setconfirmPassword(e.target.value)}
                className="register-input"
              />
            </div>

            {errorMessage && (
              <span className="register-error">{errorMessage}</span>
            )}

            <button
              type="submit"
              disabled={isRegistering}
              className="register-button"
            >
              {isRegistering ? "Signing Up..." : "Sign Up"}
            </button>
            <div>
              Already have an account?{" "}
              <Link to={"/login"} className="register-link">
                Continue
              </Link>
            </div>
          </form>
        </div>
      </main>
    </>
  );
};

export default Register;
