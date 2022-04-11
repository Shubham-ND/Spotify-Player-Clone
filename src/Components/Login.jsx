import React from "react";
import "./Styling/Login.css";
import { getTokenFromUrl, loginUrl } from "../Services/spotify";
import { Navigate, useNavigate } from "react-router";

const Login = () => {
  console.log(process.env.REACT_APP_CLIENT_ID);
  console.log("login called");
  const navigate = useNavigate();
  if (localStorage.getItem("token")) return <Navigate to="/" replace />;

  const token = getTokenFromUrl();
  console.log(token);
  if (token) {
    localStorage.setItem("token", token);
    return <Navigate to="/" replace />;
  }
  return (
    <div className="login">
      <img src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_White.png"></img>
      <a href={loginUrl}>Login With Spotify</a>
    </div>
  );
};

export default Login;
