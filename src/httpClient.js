import axios from 'axios';


const httpClient = axios.create({
  baseURL: 'http://localhost:5555',
  timeout: 1000,
  headers: {
      "Access-Control-Allow-Origin": "*",
      "Authorization": `Bearer ${localStorage.getItem('token_authorization')}`
    }
});




export default httpClient;