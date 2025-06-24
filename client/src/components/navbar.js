import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="logo">CodeAtlas</Link>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/create">Create Article</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;