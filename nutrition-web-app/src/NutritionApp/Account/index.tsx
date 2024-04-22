import Profile from "../../Users/Profile.tsx";
import Signin from "../../Users/Signin.tsx";
import { Routes, Route, Navigate } from "react-router-dom";
import UserTable from "../../Users/Table.tsx";
import ViewProfile from "../../Users/ViewProfile.tsx";
import Signup from "../../Users/Signup.tsx";
import React from "react";
export default function Account() {
  return (
    <div className="container-fluid">
      <Routes>
        <Route path="/" element={<Navigate to="/Account/Signin" />} />
        <Route path="/Signin" element={<Signin />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Profile/:id" element={<ViewProfile />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/Admin/Users" element={<UserTable />} />
      </Routes>
    </div>
  );
}
