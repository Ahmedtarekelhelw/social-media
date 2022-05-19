import "./style.scss";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef, useContext } from "react";
import axios from "axios";
import { loginCall } from "../../apiCall";
import { AuthContext } from "../../context/AuthContext";

export default function Login() {
  const email = useRef();
  const password = useRef();
  const { user, isFetching, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch,
      navigate
    );
  };

  return (
    <div className="login">
      <div className="left">
        <h2>Facebook</h2>
        <p> Connect with friends and the world around you on Lamasocial.</p>
      </div>
      <div className="right">
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="Email" required ref={email} />
          <input
            type="password"
            placeholder="Password"
            ref={password}
            required
            minLength="6"
          />
          <button className="button" disabled={isFetching}>
            {isFetching ? "Loading" : "Login"}
          </button>
        </form>
        <a href="#" className="text">
          Forgot Password?
        </a>
        <Link to="/register" className="new-account">
          Create a New Account
        </Link>
      </div>
    </div>
  );
}
