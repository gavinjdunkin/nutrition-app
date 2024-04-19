import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { findUserById } from './client';
axios.defaults.withCredentials = true;

const ViewProfile = () => {
  const { userId } = useParams(); // Get the userId parameter from the URL
  const [profile, setProfile] = useState(null); // State to hold the profile data

useEffect(() => {
    const fetchProfile = async () => {
        try {
            // Fetch profile data for the specified user
            const response = await findUserById(userId ?? '');
            setProfile(response.data);
        } catch (error) {
            console.error('Error fetching profile:', error);
        }
    };

    fetchProfile(); // Call fetchProfile when the component mounts
}, [userId]); // Run the effect whenever userId changes

if (!profile) {
    return <div>Loading...</div>; // Render a loading indicator while fetching profile data
}

return (
    <div className="container mt-4">
        <h1>View Profile</h1>
        {profile && (
            <>
                <p>Username: {(profile as any).username}</p>
                <p>Role: {(profile as any).role}</p>
            </>
        )}
    </div>
);
};

export default ViewProfile;
