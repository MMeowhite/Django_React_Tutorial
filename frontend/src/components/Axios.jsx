import axios from "axios";

const baseURL = 'http://127.0.0.1:8000/'
const AxiosInstance = axios.create({
    baseURL: baseURL, // Base URL for the API (Django server)
    timeout: 5000, // Set a timeout of 5 seconds for requests
    header: {
        'Content-Type': 'application/json', // Set the content type to JSON
        'Accept': 'application/json',   // Accept JSON responses
    }

})

export default AxiosInstance;