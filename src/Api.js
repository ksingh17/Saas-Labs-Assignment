import axios from 'axios';

const Api = axios.create({
  baseURL: 'https://raw.githubusercontent.com/', // Replace with your API base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default Api;