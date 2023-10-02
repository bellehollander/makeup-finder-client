import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./adminnav.css"; // Use the same CSS file as UserNav
import logo from "./makeup-logo.png";

export const AdminNav = ({ token, setToken, isAdmin }) => {
  const navigate = useNavigate();
  const navbar = useRef();

  return (
    <nav
      className="navbar is-success mb-3"
      role="navigation"
      aria-label="main navigation"
    >
      {token && (
        <a className="navbar-item" href="/">
          <img className="logo-navigation" src={logo} />
        </a>
      )}

      <div className="navbar-menu" ref={navbar}>
        <div className="navbar-start">
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
              <Link to="/makeupPreferences" className="navbar-item">
                Makeup Preferences Manager
              </Link>
            </>
          ) : (
            <></>
          )}
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              {token ? (
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
              ) : (
                <>
                  <Link
                    to="/register"
                    className="button is-outlined"
                    id="register"
                  >
                    Register
                  </Link>
                  <Link to="/login" className="button is-outlined" id="login">
                    Login
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
