import React, { Component } from "react";
import axios from "axios";
import Register from "./Register";

export default class Login extends Component {
  state = {
    username: "",
    password: "",
    register: false,
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post("http://localhost:5000/api/login", this.state)
        .then((res) => console.log(res));
    } catch (error) {
      console.log(error);
    }
  };
  handleRegister = () => {
    this.setState({ register: true });
  };
  render() {
    return (
      <>
        <div className="wrapper-login">
          <div className="login-container">
            <form onSubmit={this.handleSubmit}>
              <div className="login-header">
                <h2>Login</h2>
              </div>
              <div className="username">
                <label htmlFor="username">Username: </label>
                <input
                  minLength="6"
                  required
                  maxLength="32"
                  type="text"
                  name="username"
                  onChange={this.handleChange}
                />
              </div>
              <div className="password">
                <label htmlFor="password">Password: </label>
                <input
                  required
                  minLength="6"
                  maxLength="32"
                  type="password"
                  name="password"
                  onChange={this.handleChange}
                />
              </div>
              <button type="submit">Login</button>
            </form>
            <button onClick={this.handleRegister} className="register-link">
              Click here to register
            </button>
          </div>
          <div>
            {this.state.register ? (
              <Register
                onClick={(value) => this.setState({ register: value })}
                onSubmit={(value) => this.setState({ register: value })}
              />
            ) : (
              ""
            )}
          </div>
        </div>
      </>
    );
  }
}
