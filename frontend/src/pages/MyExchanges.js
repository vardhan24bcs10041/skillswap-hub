import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { getMyExchanges, updateExchange } from '../utils/api';
import ExchangeCard from '../components/ExchangeCard';

const MyExchanges = () => {
  const { user } = useContext(AuthContext);
  const [exchanges, setExchanges] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    loadExchanges();
  }, []);

  const loadExchanges = async () => {
    try {
      const data = await getMyExchanges();
      setExchanges(data);
    } catch (error) {
      console.error('Failed to load exchanges:', error);
    }
  };

  const handleUpdateStatus = async (exchangeId, status) => {
    try {
      await updateExchange(exchangeId, { status });
      loadExchanges();
    } catch (error) {
      console.error('Failed to update exchange:', error);
    }
  };

  const filteredExchanges = exchanges.filter(ex => {
    if (filter === 'sent') return ex.requester._id === user._id;
    if (filter === 'received') return ex.provider._id === user._id;
    return true;
  });

  return (
    <div className="exchanges-page">
      <h1>My Exchanges</h1>
      
      <div className="tabs">
        <button 
          className={filter === 'all' ? 'tab active' : 'tab'}
          onClick={() => setFilter('all')}
        >
          All ({exchanges.length})
        </button>
        <button 
          className={filter === 'sent' ? 'tab active' : 'tab'}
          onClick={() => setFilter('sent')}
        >
          Sent ({exchanges.filter(ex => ex.requester._id === user._id).length})
        </button>
        <button 
          className={filter === 'received' ? 'tab active' : 'tab'}
          onClick={() => setFilter('received')}
        >
          Received ({exchanges.filter(ex => ex.provider._id === user._id).length})
        </button>
      </div>

      <div className="exchanges-list">
        {filteredExchanges.length === 0 ? (
          <p className="empty-state">No exchanges yet</p>
        ) : (
          filteredExchanges.map((exchange) => (
            <ExchangeCard 
              key={exchange._id} 
              exchange={exchange}
              currentUserId={user._id}
              onUpdateStatus={handleUpdateStatus}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default MyExchanges;
