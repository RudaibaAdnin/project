import React, { useState } from "react";
//import axios, { AxiosError } from 'axios';
import { useNavigate } from "react-router-dom";
import * as client from "./client";
export default function Signup() {
  const [error, setError] = useState("");
  const [user, setUser] = useState({
    username: "", password: "" });
  const navigate = useNavigate();
  const signup = async () => {
    try {
      const newuser=await client.signup(user);
      navigate(`/Kanbas/Account/Profile/${newuser._id}`);
    } catch (err: unknown) {
      let message = "Username already exists. Please try again.";
      setError(message);
    }
    
  };
  return (
    <div>
     <div className="col-md-5 m-4">
      <h1>Signup</h1>
      {error && <div>{error}</div>}
      <input
        className="form-control m-2"
        value={user.username}
        onChange={(e) => setUser({
          ...user, username: e.target.value })} />
      <input
        className="form-control m-2"
        value={user.password}
        onChange={(e) => setUser({
          ...user, password: e.target.value })} />
      <button className="btn btn-primary m-2" onClick={signup}> Signup </button>
    </div>
    </div>
  );
}

