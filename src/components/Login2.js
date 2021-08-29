import React, { useState } from "react";
import axios from "axios";
import Register from "./Register";
import { useHistory, withRouter } from "react-router";
import { useForm } from "./useForm";
import { Redirect } from "react-router-dom";

export function Login2() {
  const [values, handleChange] = useForm({ username: "", password: "" });
  const [register, setRegister] = useState(false);
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = { username: values.username, password: values.password };
      await axios.post("http://localhost:5000/api/login", userData);
      localStorage.setItem("loginContext", JSON.stringify(true));
      alert("Login Sucess");
      history.push("/home");
    } catch (error) {
      if (error.response.status === 400) {
        alert("Incorrect Password");
      } else {
        alert("Incorrect Username");
      }
    }
  };

  const handleRegister = () => {
    setRegister(true);
  };

  React.useEffect(() => {
    let mounted = true;
    if (mounted) {
      const data = JSON.parse(localStorage.getItem("loginContext"));
      if (data === true) {
        history.push("/home");
      }
    }
    return () => {
      mounted = false;
    };
  }, [history]);

  React.useEffect(() => {
    let mounted = true;
    if (mounted) {
      document.title = "Login Page";
    }
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <>
      <div className="wrapper-login">
        <div className="login-container">
          <form onSubmit={handleSubmit}>
            <div className="login-header">
              <h2>Login</h2>
            </div>
            <div className="username">
              <label htmlFor="username">Username: </label>
              <input
                placeholder="Enter username"
                minLength="6"
                required
                maxLength="32"
                type="text"
                name="username"
                id="username"
                onChange={handleChange}
              />
            </div>
            <div className="password">
              <label htmlFor="password">Password: </label>
              <input
                placeholder="Enter password"
                required
                minLength="6"
                maxLength="32"
                type="password"
                name="password"
                id="password"
                onChange={handleChange}
              />
            </div>
            <button type="submit">Login</button>
          </form>
          <button onClick={handleRegister} className="register-link">
            Click here to register
          </button>
        </div>
        <div>
          {register ? (
            <Register
              onClick={(value) => setRegister(value)}
              onSubmit={(value) => setRegister(value)}
            />
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
}

export default withRouter(Login2);
