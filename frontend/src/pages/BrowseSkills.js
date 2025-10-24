import React, { useState, useEffect, useCallback } from 'react';
import { getAllSkills, createExchange } from '../utils/api';
import SkillCard from '../components/SkillCard';

const BrowseSkills = () => {
  const [skills, setSkills] = useState([]);
  const [filters, setFilters] = useState({
    category: '',
    level: '',
    search: ''
  });
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [exchangeData, setExchangeData] = useState({
    offerSkill: '',
    message: ''
  });

  const loadSkills = useCallback(async () => {
    try {
      const data = await getAllSkills(filters);
      setSkills(data);
    } catch (error) {
      console.error('Failed to load skills:', error);
    }
  }, [filters]);

  useEffect(() => {
    loadSkills();
  }, [loadSkills]);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleExchangeRequest = async (skill) => {
    setSelectedSkill(skill);
  };

  const handleSubmitExchange = async (e) => {
    e.preventDefault();
    try {
      await createExchange({
        provider: selectedSkill.user._id,
        skill: selectedSkill._id,
        ...exchangeData
      });
      alert('Exchange request sent successfully!');
      setSelectedSkill(null);
      setExchangeData({ offerSkill: '', message: '' });
    } catch (error) {
      console.error('Failed to create exchange:', error);
      alert('Failed to send request');
    }
  };

  return (
    <div className="browse-page">
      <h1>Browse Skills</h1>
      
      <div className="filters-section">
        <input
          type="text"
          name="search"
          placeholder="Search skills..."
          value={filters.search}
          onChange={handleFilterChange}
          className="search-input"
        />
        <select name="category" value={filters.category} onChange={handleFilterChange}>
          <option value="">All Categories</option>
          <option>Technology</option>
          <option>Arts</option>
          <option>Music</option>
          <option>Languages</option>
          <option>Sports</option>
          <option>Cooking</option>
          <option>Business</option>
          <option>Other</option>
        </select>
        <select name="level" value={filters.level} onChange={handleFilterChange}>
          <option value="">All Levels</option>
          <option>Beginner</option>
          <option>Intermediate</option>
          <option>Advanced</option>
          <option>Expert</option>
        </select>
      </div>

      <div className="skills-grid">
        {skills.map((skill) => (
          <SkillCard 
            key={skill._id} 
            skill={skill} 
            onRequest={handleExchangeRequest}
          />
        ))}
      </div>

      {selectedSkill && (
        <div className="modal-overlay" onClick={() => setSelectedSkill(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Request Skill Exchange</h2>
            <p>You're requesting: <strong>{selectedSkill.title}</strong></p>
            <p>From: <strong>{selectedSkill.user.name}</strong></p>
            <form onSubmit={handleSubmitExchange}>
              <div className="form-group">
                <label>What can you offer in return?</label>
                <input
                  type="text"
                  value={exchangeData.offerSkill}
                  onChange={(e) => setExchangeData({...exchangeData, offerSkill: e.target.value})}
                  required
                  placeholder="e.g., I can teach photography"
                />
              </div>
              <div className="form-group">
                <label>Message</label>
                <textarea
                  value={exchangeData.message}
                  onChange={(e) => setExchangeData({...exchangeData, message: e.target.value})}
                  required
                  rows="4"
                  placeholder="Introduce yourself and explain why you're interested..."
                />
              </div>
              <div className="modal-actions">
                <button type="button" onClick={() => setSelectedSkill(null)} className="btn btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Send Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BrowseSkills;
