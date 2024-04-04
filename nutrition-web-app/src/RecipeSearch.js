import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const RecipeSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const queryParam = params.get('q');
    if (queryParam) {
      setQuery(queryParam);
      handleSearch(queryParam);
    }
  }, [location.search]);

  const handleSearch = async (searchQuery) => {
    try {
      const response = await axios.get('http://localhost:4000/nutritionix', {
        params: { q: searchQuery }
      });
      console.log('Recipe search results:', response.data);
      setResults(response.data);
      navigate(`/?q=${encodeURIComponent(searchQuery)}`);
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
                onClick={() => handleSearch(query)}
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
                <Link to={`/recipe/${encodeURIComponent(result.recipe.label)}`} state={{ recipe: result.recipe }} className="btn btn-primary">View Recipe</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeSearch;
