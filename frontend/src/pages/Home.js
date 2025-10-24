import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home-page">
      <div className="hero-section">
        <h1 className="hero-title">🔄 Welcome to SkillSwap Hub</h1>
        <p className="hero-subtitle">
          Exchange skills, Learn for free, Teach what you love
        </p>
        <p className="hero-description">
          Connect with people who want to learn what you know and teach you what they know. 
          No money involved—just pure skill exchange!
        </p>
        <div className="hero-buttons">
          <Link to="/register" className="btn btn-primary">Get Started</Link>
          <Link to="/login" className="btn btn-secondary">Login</Link>
        </div>
      </div>

      <div className="features-section">
        <h2>Why SkillSwap Hub?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <span className="feature-icon">🎓</span>
            <h3>Learn Anything</h3>
            <p>From guitar to coding, find experts willing to teach</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">🤝</span>
            <h3>Fair Exchange</h3>
            <p>Trade skills without spending money</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">🌍</span>
            <h3>Global Community</h3>
            <p>Connect with learners worldwide</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">⭐</span>
            <h3>Build Reputation</h3>
            <p>Get rated and build your teaching profile</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
