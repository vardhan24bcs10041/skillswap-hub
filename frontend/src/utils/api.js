const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Auth APIs
export const login = async (email, password) => {
  try {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || 'Login failed');
    }
    return res.json();
  } catch (error) {
    if (error.name === 'TypeError') {
      throw new Error('Network error - please check your connection');
    }
    throw error;
  }
};

export const register = async (name, email, password) => {
  try {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    });
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || 'Registration failed');
    }
    return res.json();
  } catch (error) {
    if (error.name === 'TypeError') {
      throw new Error('Network error - please check your connection');
    }
    throw error;
  }
};

export const getCurrentUser = async () => {
  try {
    const res = await fetch(`${API_URL}/auth/me`, {
      headers: getAuthHeader()
    });
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || 'Failed to get user');
    }
    return res.json();
  } catch (error) {
    if (error.name === 'TypeError') {
      throw new Error('Network error - please check your connection');
    }
    throw error;
  }
};

// Skills APIs
export const getAllSkills = async (filters = {}) => {
  try {
    const queryParams = new URLSearchParams(filters).toString();
    const res = await fetch(`${API_URL}/skills?${queryParams}`);
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || 'Failed to fetch skills');
    }
    return res.json();
  } catch (error) {
    if (error.name === 'TypeError') {
      throw new Error('Network error - please check your connection');
    }
    throw error;
  }
};

export const getMySkills = async () => {
  try {
    const res = await fetch(`${API_URL}/skills/my-skills`, {
      headers: getAuthHeader()
    });
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || 'Failed to fetch my skills');
    }
    return res.json();
  } catch (error) {
    if (error.name === 'TypeError') {
      throw new Error('Network error - please check your connection');
    }
    throw error;
  }
};

export const createSkill = async (skillData) => {
  try {
    const res = await fetch(`${API_URL}/skills`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader()
      },
      body: JSON.stringify(skillData)
    });
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || 'Failed to create skill');
    }
    return res.json();
  } catch (error) {
    if (error.name === 'TypeError') {
      throw new Error('Network error - please check your connection');
    }
    throw error;
  }
};

export const deleteSkill = async (skillId) => {
  try {
    const res = await fetch(`${API_URL}/skills/${skillId}`, {
      method: 'DELETE',
      headers: getAuthHeader()
    });
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || 'Failed to delete skill');
    }
    return res.json();
  } catch (error) {
    if (error.name === 'TypeError') {
      throw new Error('Network error - please check your connection');
    }
    throw error;
  }
};

// Exchanges APIs
export const createExchange = async (exchangeData) => {
  try {
    const res = await fetch(`${API_URL}/exchanges`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader()
      },
      body: JSON.stringify(exchangeData)
    });
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || 'Failed to create exchange');
    }
    return res.json();
  } catch (error) {
    if (error.name === 'TypeError') {
      throw new Error('Network error - please check your connection');
    }
    throw error;
  }
};

export const getMyExchanges = async () => {
  try {
    const res = await fetch(`${API_URL}/exchanges`, {
      headers: getAuthHeader()
    });
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || 'Failed to fetch exchanges');
    }
    return res.json();
  } catch (error) {
    if (error.name === 'TypeError') {
      throw new Error('Network error - please check your connection');
    }
    throw error;
  }
};

export const updateExchange = async (exchangeId, updateData) => {
  try {
    const res = await fetch(`${API_URL}/exchanges/${exchangeId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader()
      },
      body: JSON.stringify(updateData)
    });
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || 'Failed to update exchange');
    }
    return res.json();
  } catch (error) {
    if (error.name === 'TypeError') {
      throw new Error('Network error - please check your connection');
    }
    throw error;
  }
};

// User APIs
export const updateProfile = async (profileData) => {
  try {
    const res = await fetch(`${API_URL}/users/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader()
      },
      body: JSON.stringify(profileData)
    });
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || 'Failed to update profile');
    }
    return res.json();
  } catch (error) {
    if (error.name === 'TypeError') {
      throw new Error('Network error - please check your connection');
    }
    throw error;
  }
};
