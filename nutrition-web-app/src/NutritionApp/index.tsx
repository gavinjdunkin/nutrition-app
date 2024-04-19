import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import RecipeSearch from '../Recipes/RecipeSearch.tsx';
import RecipeDetails from '../Recipes/RecipeDetails.tsx';
import Account from './Account/index.tsx';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Added FontAwesomeIcon
import { faUser } from '@fortawesome/free-solid-svg-icons'; // Added account icon
import { isLoggedIn } from '../Users/client.ts';

function Navbar() {
  const navigate = useNavigate();

  const handleAccountClick = async () => {
    const isAuthenticated = await isLoggedIn(); // Set to true if user is signed in
    console.log(isAuthenticated);
    if (isAuthenticated) {
      navigate('/Account/Profile');
    } else {
      navigate('/Account');
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">Nutrition App</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/">Home</Link>
          </li>
        </ul>
        <div className="d-flex flex-grow-1">
        </div>
        <div>
          <button className="nav-link" onClick={handleAccountClick}>
            <FontAwesomeIcon icon={faUser} size="lg" />
          </button>
        </div>
      </div>
    </nav>
  );
}

function NutritionApp() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<RecipeSearch />} />
          <Route path="/Account/*" element={<Account />} />
          <Route path="/recipe/:id" element={<RecipeDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default NutritionApp;