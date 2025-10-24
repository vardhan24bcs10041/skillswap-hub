const axios = require('axios');

const API_URL = process.env.API_URL || 'http://localhost:5000/api';

async function run() {
  try {
    const timestamp = Date.now();
    const email = `test${timestamp}@example.com`;
    const password = 'test1234';
    const name = 'Test User';

    console.log('Registering user:', email);
    const reg = await axios.post(`${API_URL}/auth/register`, { name, email, password });
    console.log('Register status:', reg.status);

    console.log('Logging in...');
    const login = await axios.post(`${API_URL}/auth/login`, { email, password });
    const token = login.data.token;
    if (!token) throw new Error('No token returned from login');
    console.log('Login succeeded, token received');

    console.log('Calling /auth/me with token...');
    const me = await axios.get(`${API_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('Me endpoint returned:', me.data._id ? `userId=${me.data._id}` : me.data);

    console.log('AUTH FLOW OK');
    process.exit(0);
  } catch (err) {
    console.error('AUTH FLOW FAILED');
    if (err.response) {
      console.error('Status:', err.response.status);
      console.error('Body:', err.response.data);
    } else {
      console.error('Error message:', err.message);
    }
    console.error('Full error:');
    console.error(err.stack || err);
    try {
      console.error('axios error code:', err.code);
      console.error('request url:', err.config && err.config.url);
      console.error('request method:', err.config && err.config.method);
      console.error('request headers:', err.config && err.config.headers);
    } catch (e) {
      // ignore
    }
    process.exit(1);
  }
}

run();
