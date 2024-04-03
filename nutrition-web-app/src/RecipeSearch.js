import React, { useState } from 'react';
import axios from 'axios';

const RecipeSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get('http://localhost:4000/nutritionix', {
        params: { q: query }
      });
      console.log('Response:', response.data);
      setResults(response.data);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for recipes..."
      />
      <button onClick={handleSearch}>Search</button>

      <div>
        {results.map((result, index) => (
          <div key={index}>
            <h3>{result.food_name}</h3>
            <p>Calories: {result.nf_calories}</p>
            {/* Add more recipe details as needed */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeSearch;
