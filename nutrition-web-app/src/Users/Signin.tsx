import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "./client.ts";
import * as client from "./client.ts";
import React from "react";
export default function Signin() {
  const [credentials, setCredentials] = useState<User>({ _id: "",
    username: "", password: "", firstName: "", lastName: "", role: "USER", following: []
  });
  const navigate = useNavigate();
  const signin = async () => {
    await client.signin(credentials);
    navigate("/Account/Profile");
  };
  return (
    <div>
      <h1>Signin</h1>
      <input value={credentials.username} onChange={(e) =>
        setCredentials({ ...credentials, username: e.target.value })}/>
      <input value={credentials.password} onChange={(e) =>
        setCredentials({ ...credentials, password: e.target.value })}/>
      <button onClick={signin}> Signin </button>
      <button onClick={() => navigate("/Account/Signup")}> Signup </button>
    </div>
  );
}
