import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { isLoggedIn } from '../Users/client.ts';
export const BASE_API = process.env.REACT_APP_BASE_API_URL;
axios.defaults.withCredentials = true;

const RecipeDetails = () => {
  const { id } = useParams(); // Get the recipeId from URL parameters
  const [recipe, setRecipe] = useState(null); // State to hold the recipe data
  const [likes, setLikes] = useState(0); // State to hold likes count
  const [commentInput, setCommentInput] = useState(''); // State to hold comment input

  // Function to fetch recipe details by ID
  const fetchRecipeDetails = async () => {
    try {
      // Fetch recipe details from server using recipeId
      const response = await axios.get(`${BASE_API}/recipe/${id}`);
      setRecipe(response.data); // Set recipe data in state
      setLikes(response.data.likes.count); // Set initial likes count
    } catch (error) {
      console.error('Error fetching recipe details:', error);
    }
  };

  useEffect(() => {
    fetchRecipeDetails(); // Fetch recipe details when component mounts
  }, [id]); // Re-fetch recipe details if recipeId changes

  // Function to handle like button click
  const handleLike = async () => {
    if (!isLoggedIn()) {
      alert('Please sign in to like the recipe');
      return;
    }
    try {
      // Send a request to increase likes count for the recipe
      await axios.post(`${BASE_API}/recipe/${id}/like`);
      // Update the local state to reflect the new like count
      setLikes(likes + 1);
    } catch (error) {
      console.error('Error liking recipe:', error);
    }
  };

  // Function to handle comment submission
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!isLoggedIn()) {
      alert('Please sign in to like the recipe');
      return;
    }
    try {
      // Send a request to add the comment for the recipe
      await axios.post(`${BASE_API}/recipe/${encodeURIComponent(id)}/comment`, {
        comment: commentInput
      });
      // Clear the comment input field
      setCommentInput('');
      // Refetch recipe details to update comments
      fetchRecipeDetails();
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  // Render loading indicator while fetching recipe details
  if (!recipe) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-6">
          {recipe && (
            <>
              <h1>{recipe.label}</h1>
              <p>Calories: {Math.round(recipe.calories)}</p>
              <img src={recipe.image} alt={recipe.label} className="img-fluid rounded" />
              <Button variant="primary" onClick={handleLike}>Like {likes}</Button>
            </>
          )}
          <div>
            <h2>Ingredients</h2>
            <ul>
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient.text}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="col-md-6">
          <h2>Nutritional Information</h2>
          <p>Servings: {recipe.yield}</p>
          <p>Total Weight: {Math.round(recipe.totalWeight)}</p>
          <p>Total Nutrients:</p>
          <ul>
            {Object.keys(recipe.totalNutrients).map((key, index) => (
              <li key={index}>{recipe.totalNutrients[key].label}: {Math.round(recipe.totalNutrients[key].quantity)} {recipe.totalNutrients[key].unit}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-md-12">
          <h2>Comments</h2>
          <ListGroup>
            {recipe.comments.map((comment, index) => (
              <ListGroup.Item key={index}>
                <span>{comment.text}</span>
                <Link to={`/Profile/${comment.user}`} className="ml-2">View Profile</Link>
              </ListGroup.Item>
            ))}
          </ListGroup>
          <Form onSubmit={handleCommentSubmit}>
            <InputGroup className="mt-3">
              <Form.Control
                placeholder="Add a comment..."
                value={commentInput}
                onChange={(e) => setCommentInput(e.target.value)}
              />
              <Button type="submit" variant="primary">Submit</Button>
            </InputGroup>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;
