import React from "react";
import { getTokenFromUrl, loginUrl } from "../Services/spotify";
import { Navigate } from "react-router";
import "./Styling/Login.css";

const Login = () => {
  if (localStorage.getItem("token")) return <Navigate to="/" replace />;

  const token = getTokenFromUrl();
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
