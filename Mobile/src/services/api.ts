import axios from 'axios';

const api = axios.create({
	baseURL: 'http://1.sajermann.com/api'
});

export default api;