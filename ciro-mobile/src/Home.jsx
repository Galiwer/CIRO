import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // Make sure this is created and imported

function Home() {
  return (
    <div className="home-container">
      <header>
        <h1>Firmware Manager</h1>
      </header>
      <main>
        <div className="portal-options">
          <Link to="/customer" className="portal-button">
            Customer Portal
          </Link>
          <Link to="/admin" className="portal-button">
            Admin Portal
          </Link>
        </div>
      </main>
      <footer>
        <p>&copy; {new Date().getFullYear()} Firmware Manager. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;