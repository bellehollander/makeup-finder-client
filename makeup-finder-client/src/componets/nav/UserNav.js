import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

export const UserNav = ({ token, setToken, isAdmin }) => {
  const navigate = useNavigate();
  const navbar = useRef();

  return (
    <nav
      className="navbar is-success mb-3"
      role="navigation"
      aria-label="main navigation"
    >
      <a className="navbar-item" href="/">
        <h1 className="title is-4"> Makeup-Finder</h1>
      </a>

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
                  <Link to="/register" className="button is-link" id="login">
                    Register
                  </Link>
                  <Link
                    to="/login"
                    className="button is-outlined"
                    id="register"
                  >
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
