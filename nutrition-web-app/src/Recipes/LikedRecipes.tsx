import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RecipeCard from './RecipeCard.tsx';
import { isLoggedIn } from '../Users/client.ts';
export const BASE_API = process.env.REACT_APP_BASE_API_URL;

const LikedRecipes = () => {
  const [likedRecipes, setLikedRecipes] = useState();

  useEffect(() => {
    const fetchData = async () => {
      if (await isLoggedIn()) {
        fetchLikedRecipes(); // Fetch liked recipes if user is logged in
      }
    };

    fetchData();
  }, []); // Empty dependency array to run only once on component mount

  const fetchLikedRecipes = async () => {
    try {
      // Fetch liked recipes of the current user
      const response = await axios.get(`${BASE_API}/api/liked-recipes`);
      console.log('response', response);
      setLikedRecipes(response.data);
    } catch (error) {
      console.error('Error fetching liked recipes:', error);
    }
  };
  

  if (!likedRecipes) {
    return null; // Return nothing if user is not logged in
  }

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-12">
          <h4>Your Liked Recipes</h4>
          <div className="mt-4">
            {likedRecipes && likedRecipes.map((recipe, index) => (
              <RecipeCard key={index} recipe={recipe} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LikedRecipes;
