import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../managers/AuthManager";
import "./login.css";
import logo from "./makeup-logo.png";

export const Login = ({ setToken, setAdmin }) => {
  const username = useRef();
  // use ref is a hook that allows you to reference a DOM element
  const password = useRef();
  const navigate = useNavigate();
  // set up state to handle if the login is unsuccessful
  const [isUnsuccessful, setisUnsuccessful] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    // you can then acess the value of the element by using current.value
    const user = {
      username: username.current.value,
      password: password.current.value,
    };
    // pass the user to the loginUser function
    loginUser(user).then((res) => {
      // check if the response is valid
      if ("valid" in res && res.valid) {
        // set the token and admin state
        setToken(res.token);
        setAdmin(res.staff);
        // navigate to the home page
        navigate("/");
      } else {
        // if the response is not valid set the isUnsuccessful state to true
        setisUnsuccessful(true);
      }
    });
  };
  /*--------------------------------------------------------------------*/
  // Autofill Username/Password by default streamline devolopment process
  useEffect(() => {
    username.current.value = "bellehollander@gmail.com";
    password.current.value = "belle";
  }, []);
  /*--------------------------------------------------------------------*/
  return (
    <section className="columns is-centered">
      <form className="column is-two-thirds" onSubmit={handleLogin}>
        <img className="title" src={logo}></img>
        <p className="subtitle">Please sign in</p>

        <div className="field">
          <label className="label">Username</label>
          <div className="control">
            <input className="input" type="text" ref={username} />
          </div>
        </div>

        <div className="field">
          <label className="label">Password</label>
          <div className="control">
            <input className="input" type="password" ref={password} />
          </div>
        </div>

        <div className="field is-grouped">
          <div className="control">
            <button className="button is-link" type="submit" id="submit">
              Submit
            </button>
          </div>
          <div className="control">
            <Link to="/register" className="button is-link is-light">
              Cancel
            </Link>
          </div>
        </div>
        {isUnsuccessful ? (
          <p className="help is-danger">Username or password not valid</p>
        ) : (
          ""
        )}
      </form>
    </section>
  );
};
