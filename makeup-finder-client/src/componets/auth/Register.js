import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../managers/AuthManager";

export const Register = ({ setToken, setAdmin }) => {
  const firstName = useRef();
  const lastName = useRef();
  const email = useRef();
  const username = useRef();
  const password = useRef();
  const account_type = useRef();
  const verifyPassword = useRef();
  const [showPasswordDialog, setShowDialog] = useState(false);
  const navigate = useNavigate();
  // handle register function isnt logging in the user
  // after registering
  const handleRegister = (e) => {
    e.preventDefault();

    if (password.current.value === verifyPassword.current.value) {
      const newUser = {
        username: username.current.value,
        first_name: firstName.current.value,
        last_name: lastName.current.value,
        email: email.current.value,
        password: password.current.value,
        account_type: account_type.current.value,
      };

      registerUser(newUser).then((res) => {
        if ("valid" in res && res.valid) {
          setToken(res.token);
          setAdmin(res.staff);
          navigate("/");
        }
      });
    } else {
      setShowDialog(true);
    }
  };
  // add an account type field to the registration form

  return (
    <section className="columns is-centered">
      <form className="column is-two-thirds">
        <h1 className="title">Makeup-Finder</h1>
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
              <select ref={account_type}>
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
            <button onClick={handleRegister}>Submit</button>
          </div>
          <div className="control">
            <Link to="/login" className="button is-link is-light">
              Cancel
            </Link>
          </div>
        </div>
      </form>
    </section>
  );
};
