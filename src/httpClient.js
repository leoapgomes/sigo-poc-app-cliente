import axios from 'axios';


const httpClient = axios.create({
  //baseURL: 'http://200.98.72.245:5555',
  baseURL: 'http://127.0.0.1:5555',
  timeout: 8000,
  headers: {
      "Access-Control-Allow-Origin": "*",
      "Authorization": `Bearer ${localStorage.getItem('token_authorization')}`
    }
});

export default httpClient;