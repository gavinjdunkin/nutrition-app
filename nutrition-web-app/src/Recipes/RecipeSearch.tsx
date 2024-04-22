import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import * as client from "./client.ts";

const RecipeSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  const handleSearch = async (searchQuery) => {
    const results = await client.handleSearch(searchQuery);
    console.log('Recipe search results:', results);
    setResults(results);
    navigate(`/?q=${encodeURIComponent(searchQuery)}`);
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
          {results.map((result: { recipe: any }, index: number) => (
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
                  <Link to={`/details/${encodeURIComponent(result.recipe.id)}`} className="btn btn-primary">View Recipe</Link>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default RecipeSearch;
