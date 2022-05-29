import React from 'react';

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg fixed-top bg-light navbar-light">
        <div className="container">
        <p className="navbar-brand navItem">Pet Planet</p>
        <div>
            <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item ms-3">
                <p className='navItem'>My Pet</p>
            </li>
            <li className="nav-item ms-3">
                <p className='navItem'>Trivia</p>
            </li>
            <li className="nav-item ms-3">
                <p className='navItem'>Sign out</p>
            </li>
            </ul>
        </div>
        </div>
    </nav>
  );
};

export default Header;
