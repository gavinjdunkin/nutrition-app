import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

//intialize state to likes and comments, then add to state after submit, so updates locally without pulling from server
const RecipeDetails = () => {
  const location = useLocation();
  const recipe = location.state.recipe;
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState('');

  // Function to handle like button click
  const handleLike = async () => {
    try {
      // Send a request to increase likes count for the recipe
      await axios.post(`http://localhost:4000/recipe/${encodeURIComponent(recipe.uri)}/like`);
      // Update the local state to reflect the new like count
      setLikes(likes + 1);
    } catch (error) {
      console.error('Error liking recipe:', error);
    }
  };

  // Function to handle comment submission
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send a request to add the comment for the recipe
      await axios.post(`http://localhost:4000/recipe/${encodeURIComponent(recipe.uri)}/comment`, {
        comment: commentInput
      });
      // Clear the comment input field
      setCommentInput('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-6">
          <h1>{recipe.label}</h1>
          <p>Calories: {recipe.calories}</p>
          <img src={recipe.image} alt={recipe.label} className="img-fluid rounded" />
          <Button variant="primary" onClick={handleLike}>Like ({recipe.likes})</Button>
        </div>
        <div className="col-md-6">
          <h2>Comments</h2>
          <ListGroup>
            {recipe.comments.map((comment, index) => (
              <ListGroup.Item key={index}>{comment.text}</ListGroup.Item>
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
