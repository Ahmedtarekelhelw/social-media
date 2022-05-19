import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./style.scss";

export default function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const confirmPassword = useRef();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.current.value !== confirmPassword.current.value) {
      confirmPassword.current.setCustomValidity("Passwords don`t match");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
        confirmPassword: confirmPassword.current.value,
      };
      try {
        await axios.post("http://localhost:5000/api/auth/register", user);
        navigate("/login");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="register">
      <div className="left">
        <h2>Facebook</h2>
        <p> Connect with friends and the world around you on Lamasocial.</p>
      </div>
      <div className="right">
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Username" ref={username} required />
          <input type="email" placeholder="Email" ref={email} required />
          <input
            type="password"
            placeholder="Password"
            ref={password}
            required
            minLength="6"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            ref={confirmPassword}
            required
            minLength="6"
          />
          <button>Sign Up</button>
        </form>
        <Link to="/login">Login Into Account</Link>
      </div>
    </div>
  );
}
