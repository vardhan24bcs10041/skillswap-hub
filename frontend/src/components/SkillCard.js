import React from 'react';

const SkillCard = ({ skill, showActions, onDelete, onRequest }) => {
  return (
    <div className="skill-card">
      <div className="skill-header">
        <h3>{skill.title}</h3>
        <span className={`badge badge-${skill.category.toLowerCase()}`}>
          {skill.category}
        </span>
      </div>
      <p className="skill-description">{skill.description}</p>
      
      <div className="skill-meta">
        <span>📊 {skill.level}</span>
        <span>📅 {skill.availability}</span>
        <span>💻 {skill.mode}</span>
      </div>

      {skill.user && (
        <div className="skill-user">
          <img src={skill.user.avatar} alt={skill.user.name} />
          <span>{skill.user.name}</span>
          {skill.user.rating > 0 && <span>⭐ {skill.user.rating}</span>}
        </div>
      )}

      {showActions && (
        <div className="skill-actions">
          <button 
            className="btn btn-danger btn-sm"
            onClick={() => onDelete(skill._id)}
          >
            Delete
          </button>
        </div>
      )}

      {onRequest && (
        <div className="skill-actions">
          <button 
            className="btn btn-primary btn-sm"
            onClick={() => onRequest(skill)}
          >
            Request Exchange
          </button>
        </div>
      )}
    </div>
  );
};

export default SkillCard;
