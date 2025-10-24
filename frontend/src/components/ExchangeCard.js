import React from 'react';

const ExchangeCard = ({ exchange, currentUserId, onUpdateStatus }) => {
  const isProvider = exchange.provider._id === currentUserId;
  const otherUser = isProvider ? exchange.requester : exchange.provider;

  const getStatusColor = (status) => {
    switch(status) {
      case 'Accepted': return 'green';
      case 'Rejected': return 'red';
      case 'Completed': return 'blue';
      default: return 'orange';
    }
  };

  return (
    <div className="exchange-card">
      <div className="exchange-header">
        <div>
          <h3>{exchange.skill.title}</h3>
          <span className={`status status-${getStatusColor(exchange.status)}`}>
            {exchange.status}
          </span>
        </div>
        <span className="exchange-date">
          {new Date(exchange.createdAt).toLocaleDateString()}
        </span>
      </div>

      <div className="exchange-details">
        <p><strong>{isProvider ? 'From' : 'To'}:</strong> {otherUser.name}</p>
        <p><strong>Offering:</strong> {exchange.offerSkill}</p>
        <p><strong>Message:</strong> {exchange.message}</p>
      </div>

      {isProvider && exchange.status === 'Pending' && (
        <div className="exchange-actions">
          <button 
            className="btn btn-success btn-sm"
            onClick={() => onUpdateStatus(exchange._id, 'Accepted')}
          >
            Accept
          </button>
          <button 
            className="btn btn-danger btn-sm"
            onClick={() => onUpdateStatus(exchange._id, 'Rejected')}
          >
            Reject
          </button>
        </div>
      )}

      {exchange.status === 'Accepted' && (
        <div className="exchange-actions">
          <button 
            className="btn btn-primary btn-sm"
            onClick={() => onUpdateStatus(exchange._id, 'Completed')}
          >
            Mark as Completed
          </button>
        </div>
      )}
    </div>
  );
};

export default ExchangeCard;
