import React, { useState } from "react";
import axios from "axios";

const Register = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== cpassword) {
      alert("Password does not match");
    } else {
      try {
        const user = {
          username,
          password,
        };
        await axios
          .post("http://localhost:5000/api/register", user)
          .then((x) => alert("Register success!"))
          .then((x) => props.onSubmit(false));
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="reg-main">
      <div className="register-wrapper">
        <div className="register-container">
          <form onSubmit={handleRegister}>
            <h2>Register</h2>
            <span onClick={() => props.onClick(false)}>X</span>
            <div className="register-username">
              <label htmlFor="username">Create Username: </label>
              <input
                placeholder="Enter username"
                minLength="6"
                required
                maxLength="32"
                type="text"
                name="username"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="register-password">
              <label htmlFor="password">Create Password: </label>
              <input
                placeholder="Enter password"
                minLength="6"
                required
                maxLength="32"
                type="password"
                name="username"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="register-cpassword">
              <label htmlFor="username">Confirm Pasword: </label>
              <input
                placeholder="Confirm password"
                minLength="6"
                required
                maxLength="32"
                type="password"
                name="username"
                onChange={(e) => setCpassword(e.target.value)}
              />
            </div>
            <button type="submit">Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
