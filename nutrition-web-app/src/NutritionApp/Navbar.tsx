import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { isLoggedIn } from '../Users/client.ts';

function Navbar() {
  const navigate = useNavigate();

  const handleAccountClick = async () => {
    const isAuthenticated = await isLoggedIn();
    if (isAuthenticated) {
      navigate('/Profile');
    } else {
      navigate('/Login');
    }
  };

  return (
    <nav className="navbar navbar-expand-lg" style={{ backgroundColor: '#add8e6 ' }}>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <NavLink className="nav-link" to="/">Home</NavLink>
          </li>
        </ul>
        <div className="d-flex flex-grow-1"></div>
        <div className="navbar-icons">
          <button className="nav-link account-icon" onClick={handleAccountClick}>
            <FontAwesomeIcon icon={faUser} size="lg" style={{ paddingRight: '8px' }} />
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
