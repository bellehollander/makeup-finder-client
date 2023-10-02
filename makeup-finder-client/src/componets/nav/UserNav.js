import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "./makeup-logo.png";
export const UserNav = ({ token, setToken, isAdmin }) => {
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
              <Link to="/products" className="navbar-item">
                Products for you
              </Link>
              <Link to="/tips" className="navbar-item">
                Tips for you
              </Link>
              <Link to="/wishlist" className="navbar-item">
                Wish List
              </Link>
            </>
          ) : (
            ""
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
                    localStorage.removeItem("rare_admin");
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
