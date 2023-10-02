import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../managers/AuthManager";
import logo from "./makeup-logo.png";

export const Register = ({ setToken, setAdmin }) => {
  const firstName = useRef();
  // use refs to get the values from the form
  const lastName = useRef();
  const email = useRef();
  const username = useRef();
  const password = useRef();
  const account_type = useRef();
  const verifyPassword = useRef();
  // set up state to handle if the passwords do not match
  const [showPasswordDialog, setShowDialog] = useState(false);
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    // check if the passwords match
    if (password.current.value === verifyPassword.current.value) {
      // if they match create a new user object
      // using current.value to get the value from the form
      const newUser = {
        username: username.current.value,
        first_name: firstName.current.value,
        last_name: lastName.current.value,
        email: email.current.value,
        password: password.current.value,
        account_type: account_type.current.value,
      };
      // pass the new user to the registerUser function
      registerUser(newUser).then((res) => {
        // check if the response is valid
        if ("valid" in res && res.valid) {
          // set the token and admin state
          setToken(res.token);
          setAdmin(res.staff);
          // navigate to the home page
          navigate("/");
        }
      });
    } else {
      // if the passwords do not match set the showPasswordDialog state to true
      setShowDialog(true);
    }
  };
  // add an account type field to the registration form

  return (
    <section className="columns is-centered">
      <form className="column is-two-thirds" id="register-form">
        <img className="title" src={logo}></img>
        <p className="subtitle">Create an account</p>
        <div className="field">
          <label className="label">First Name</label>
          <div className="control">
            <input className="input" type="text" ref={firstName} />
          </div>
        </div>

        <div className="field">
          <label className="label">Last Name</label>
          <div className="control">
            <input className="input" type="text" ref={lastName} />
          </div>
        </div>

        <div className="field">
          <label className="label">Username</label>
          <div className="control">
            <input className="input" type="text" ref={username} />
          </div>
        </div>

        <div className="field">
          <label className="label">Email</label>
          <div className="control">
            <input className="input" type="email" ref={email} />
          </div>
        </div>
        <div className="field">
          <label className="label">Account Type</label>
          <div className="control">
            <div className="select">
              <select ref={account_type} id="account-type">
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>
        </div>
        <div className="field">
          <label className="label">Password</label>
          <div className="field-body">
            <div className="field">
              <p className="control is-expanded">
                <input
                  className="input"
                  type="password"
                  placeholder="Password"
                  ref={password}
                />
              </p>
            </div>

            <div className="field">
              <p className="control is-expanded">
                <input
                  className="input"
                  type="password"
                  placeholder="Verify Password"
                  ref={verifyPassword}
                />
              </p>
            </div>
          </div>
        </div>

        {showPasswordDialog && (
          <div className="has-text-danger">
            Password fields must be matching
          </div>
        )}

        <div className="field is-grouped">
          <div className="control">
            <button className="category-button" onClick={handleRegister}>
              Submit
            </button>
          </div>
          <div className="control">
            <Link to="/login" className="button is-link is-light" id="cancel">
              Cancel
            </Link>
          </div>
        </div>
      </form>
    </section>
  );
};
