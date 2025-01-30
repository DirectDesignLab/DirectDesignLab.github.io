import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer/Footer';
import './Home.css';

function Home() {
  return (
    <div className="home">
      <nav className="home-nav">
        <Link to="/about">ABOUT</Link>
        <Link to="/type-thon">TYPE-THON</Link>
        <Link to="/projects">PROJECTS</Link>
        <Link to="/archive">ARCHIVE</Link>
      </nav>
    </div>
  );
}

export default Home;