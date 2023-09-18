import { Link, useNavigate } from "react-router-dom";
import "./adminnav.css";
import { useRef } from "react";

export const AdminNav = ({ token, setToken, isAdmin }) => {
  const navigate = useNavigate();

  return (
    <nav
      className="navbar is-success mb-3"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <a className="navbar-item" href="/">
          <h1 className="title is-4">Makeup-Finder</h1>
        </a>
      </div>

      <div className="navbar-menu">
        <div className="navbar-end">
          {token ? (
            <>
              <Link to="/productManager" className="navbar-item">
                Product Manager
              </Link>
              <Link to="/userList" className="navbar-item">
                User List
              </Link>
              <Link to="/tipManager" className="navbar-item">
                Tip Manager
              </Link>
              <button
                className="button is-outlined"
                onClick={() => {
                  setToken("");
                  localStorage.removeItem("makeup_admin");
                  navigate("/login");
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/register" className="button is-link">
                Register
              </Link>
              <Link to="/login" className="button is-outlined">
                Login
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
