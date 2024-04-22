// ViewProfile.js

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { findUserById, followUser } from './client.ts'; // Assuming a function to follow a user is provided in the client.ts
import RecipeCard from '../Recipes/RecipeCard.tsx';
import './ViewProfile.css'; // Import CSS for styling

axios.defaults.withCredentials = true;

const ViewProfile = () => {
  const { id } = useParams(); // Get the userId parameter from the URL
  const [profile, setProfile] = useState(null); // State to hold the profile data

  useEffect(() => {
    const fetchProfile = async () => {
      console.log("ID from useParams:", id);
      try {
        // Fetch profile data for the specified user
        const profileResponse = await findUserById(id ?? '');
        console.log('profileResponse:', profileResponse);
        setProfile(profileResponse);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile(); // Call fetchProfile when the component mounts
  }, [id]); // Run the effect whenever userId changes

  const handleFollow = async () => {
    try {
      // Call the followUser function from the client to follow the user
      await followUser(id); // Assuming followUser function accepts the userId
      // Refetch profile data after following the user
    } catch (error) {
      console.error('Error following user:', error);
    }
  };

  if (!profile) {
    return <div className="loading">Loading...</div>; // Render a loading indicator while fetching profile data
  }

  return (
    <div className="container mt-4">
      <h1 className="profile-heading">View Profile</h1>
      <div className="profile-info">
        <p><strong>Username:</strong> {profile.username}</p>
        <p><strong>Role:</strong> {profile.role}</p>
        <button className="btn btn-primary" onClick={handleFollow}>Follow</button> {/* Follow button */}
      </div>
      <div className="liked-recipes">
        <h2>Liked Recipes</h2>
        <div className="recipe-list">
          {profile.likedRecipes && profile.likedRecipes.map((recipe, index) => (
            <RecipeCard key={index} recipe={recipe} />
          ))}
        </div>
      </div>
      <div className="followed-users">
        <h2>Followed Users</h2>
        <div className="user-list">
          {profile.following.map((user: any) => (
            <Link
              key={user}
              to={`/profile/${user}`}
              className="user-link"
            >
              {user.username}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewProfile;
