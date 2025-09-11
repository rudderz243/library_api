// call in axios to handle our api requests we want to make
import axios from 'axios';

const axiosInstance = axios.create({
    // this is the BASE URL, meaning that it must go before any API call we make with axios
    baseURL: 'http://localhost:12345/v1',
    // we also tell it that we want to ask the server to respond with JSON, rather than cleartext
    headers: {
        'Content-Type': 'application/json'
    },
});

export default axiosInstance;