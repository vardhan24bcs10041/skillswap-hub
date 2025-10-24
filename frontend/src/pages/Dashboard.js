import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { getMySkills, createSkill, deleteSkill } from '../utils/api';
import SkillCard from '../components/SkillCard';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [skills, setSkills] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Technology',
    level: 'Intermediate',
    availability: 'Flexible',
    mode: 'Both'
  });

  useEffect(() => {
    loadSkills();
  }, []);

  const loadSkills = async () => {
    try {
      const data = await getMySkills();
      setSkills(data);
    } catch (error) {
      console.error('Failed to load skills:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createSkill(formData);
      setFormData({
        title: '',
        description: '',
        category: 'Technology',
        level: 'Intermediate',
        availability: 'Flexible',
        mode: 'Both'
      });
      setShowForm(false);
      loadSkills();
    } catch (error) {
      console.error('Failed to create skill:', error);
    }
  };

  const handleDelete = async (skillId) => {
    if (window.confirm('Are you sure you want to delete this skill?')) {
      try {
        await deleteSkill(skillId);
        loadSkills();
      } catch (error) {
        console.error('Failed to delete skill:', error);
      }
    }
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <h1>Welcome, {user?.name}! 👋</h1>
        <button 
          className="btn btn-primary"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Cancel' : '+ Add New Skill'}
        </button>
      </div>

      {showForm && (
        <div className="skill-form-card">
          <h3>Share Your Skill</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Skill Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                placeholder="e.g., Guitar Lessons, Web Development"
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows="4"
                placeholder="Describe what you'll teach..."
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Category</label>
                <select name="category" value={formData.category} onChange={handleChange}>
                  <option>Technology</option>
                  <option>Arts</option>
                  <option>Music</option>
                  <option>Languages</option>
                  <option>Sports</option>
                  <option>Cooking</option>
                  <option>Business</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="form-group">
                <label>Your Level</label>
                <select name="level" value={formData.level} onChange={handleChange}>
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                  <option>Expert</option>
                </select>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Availability</label>
                <select name="availability" value={formData.availability} onChange={handleChange}>
                  <option>Weekdays</option>
                  <option>Weekends</option>
                  <option>Flexible</option>
                </select>
              </div>
              <div className="form-group">
                <label>Mode</label>
                <select name="mode" value={formData.mode} onChange={handleChange}>
                  <option>Online</option>
                  <option>Offline</option>
                  <option>Both</option>
                </select>
              </div>
            </div>
            <button type="submit" className="btn btn-primary">
              Add Skill
            </button>
          </form>
        </div>
      )}

      <div className="my-skills-section">
        <h2>My Skills ({skills.length})</h2>
        {skills.length === 0 ? (
          <p className="empty-state">You haven't added any skills yet. Click "Add New Skill" to get started!</p>
        ) : (
          <div className="skills-grid">
            {skills.map((skill) => (
              <SkillCard 
                key={skill._id} 
                skill={skill} 
                showActions 
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
