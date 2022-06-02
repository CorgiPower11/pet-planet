import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg fixed-top bg-light navbar-light">
        <div className="container">
        <Link to='/' className="navbar-brand navItem">Pet Planet</Link>
        <div>
            <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item ms-3">
                <Link to='/pet'className='navItem'>My Pet</Link>
            </li>
            <li className="nav-item ms-3">
                <Link to='/trivia' className='navItem'>Trivia</Link>
            </li>
            <li className="nav-item ms-3">
                <Link to='/signout' className='navItem'>Sign out</Link>
            </li>
            </ul>
        </div>
        </div>
    </nav>
  );
};

export default Header;
