import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { doSignOut } from "../../firebase/auth";
import "./Header.css"; // Import the CSS file

const Header = () => {
  const navigate = useNavigate();
  const { userLoggedIn, currentUser } = useAuth();

  return (
    <nav className="header">
      {userLoggedIn ? (
        <div className="flex items-center">
          <h1 className="header__welcome">Welcome, {currentUser.email}</h1>
          <button
            onClick={() => {
              doSignOut().then(() => {
                navigate("/login");
              });
            }}
            className="header__link"
          >
            Logout
          </button>
        </div>
      ) : (
        <>
          <Link className="header__link" to={"/login"}>
            Login
          </Link>
          <Link className="header__link" to={"/register"}>
            Register New Account
          </Link>
        </>
      )}
    </nav>
  );
};

export default Header;
