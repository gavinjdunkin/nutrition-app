import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate, NavLink } from 'react-router-dom';
import RecipeSearch from '../Recipes/RecipeSearch.tsx';
import RecipeDetails from '../Recipes/RecipeDetails.tsx';
import LikedRecipes from '../Recipes/LikedRecipes.tsx'; // Import the LikedRecipes component
import React from 'react';
import Profile from '../Users/Profile.tsx';
import Signin from '../Users/Signin.tsx';
import Signup from '../Users/Signup.tsx';
import UserTable from '../Users/Table.tsx';
import ViewProfile from '../Users/ViewProfile.tsx';
import Navbar from './Navbar.tsx';



function NutritionApp() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<><RecipeSearch /><LikedRecipes /></>} />
          <Route path="/details/:id" element={<RecipeDetails />} />
          <Route path="/Login" element={<Signin />} />
          <Route path="/Register" element={<Signup />} />
          <Route path="/Profile/:id" element={<ViewProfile />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/Admin/Users" element={<UserTable />} />
        </Routes>
      </div>
    </Router>
  );
}

export default NutritionApp;
