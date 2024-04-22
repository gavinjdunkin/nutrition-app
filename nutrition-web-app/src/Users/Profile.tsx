import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as client from "./client.ts";

export default function Profile() {
  const [profile, setProfile] = useState({
    username: "",
    password: "",
    role: "USER",
    following: [],
  });
  const [followedUsernames, setFollowedUsernames] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const account = await client.profile();
      setProfile(account);
      const usernames = await Promise.all(
        account.following.map(async (userId) => {
          const user = await client.findUserById(userId);
          return user.username;
        })
      );
      setFollowedUsernames(usernames);
    };

    fetchData();
  }, []);

  const signout = async () => {
    await client.signout();
    navigate("/Login");
  };

  const save = async () => {
    await client.updateUser(profile);
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Profile</h1>
      <div className="row mb-4">
        <div className="col">
          <button className="btn btn-primary mr-2" onClick={save}>
            Save
          </button>
          <button className="btn btn-danger" onClick={signout}>
            Signout
          </button>
        </div>
      </div>
      <div className="row mb-4">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Personal Information</h5>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  Username: {profile.username}
                </li>
                <li className="list-group-item">Role: {profile.role}</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Followed Users</h5>
              <div className="list-group">
                {followedUsernames.map((username, index) => (
                  <Link
                    key={index}
                    to={`/profile/${profile.following[index]}`}
                    className="list-group-item list-group-item-action"
                  >
                    {username}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
