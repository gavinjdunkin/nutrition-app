import React, { useState } from 'react';
import axios from 'axios';
import RecipeModal from './RecipeModal';

const RecipeSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const handleSearch = async () => {
    try {
      const response = await axios.get('http://localhost:4000/nutritionix', {
        params: { q: query }
      });
      console.log('Recipe search results:', response.data);

      setResults(response.data.hits);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search for recipes..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <div className="input-group-append">
              <button
                className="btn btn-primary"
                type="button"
                onClick={handleSearch}
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        {results.map((result, index) => (
          <div className="col-md-4 mb-4" key={index}>
            <div className="card">
              <img
                src={result.recipe.image}
                className="card-img-top"
                alt={result.recipe.label}
              />
              <div className="card-body">
                <h5 className="card-title">{result.recipe.label}</h5>
                <p className="card-text">Calories: {result.recipe.calories}</p>
            <button
                  className="btn btn-primary"
                  target="_blank"
                  rel="noopener noreferrer" onClick={() => setSelectedRecipe(result.recipe)}>View Recipe</button>
              </div>
            </div>
          </div>
        ))}
      </div>

{selectedRecipe && (
  <RecipeModal recipe={selectedRecipe} onClose={() => setSelectedRecipe(null)} />
)}
    </div>
  );
};

export default RecipeSearch;
