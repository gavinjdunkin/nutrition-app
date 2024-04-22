import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
export const BASE_API = process.env.REACT_APP_BASE_API_URL;


const RecipeCard = ({ recipe }) => {
  const [recipeDetails, setRecipeDetails] = useState(null);

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        // Make an API call to fetch the recipe details
        const response = await axios.get(`${BASE_API}/recipe/${recipe}`);
        setRecipeDetails(response.data);
      } catch (error) {
        console.error('Error fetching recipe details:', error);
      }
    };

    fetchRecipeDetails();
  }, [recipe]); // Fetch recipe details when the recipe ID changes

  if (!recipeDetails) {
    return <div>Loading...</div>; // Display loading indicator while fetching recipe details
  }

  return (
    <div className="card mb-3">
      <div className="row no-gutters">
        <div className="col-md-4">
          <img src={recipeDetails.image} className="card-img" alt={recipeDetails.label} />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">{recipeDetails.label}</h5>
            <p className="card-text">Calories: {Math.round(recipeDetails.calories)}</p>
            <p className="card-text">Servings: {recipeDetails.yield}</p>
              <Link to={`/details/${recipeDetails.id}`}>View Recipe</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
