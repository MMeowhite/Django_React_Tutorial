import axios from "axios";

// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Use environment variables to set the base URL
const baseURL = import.meta.env.VITE_API_BASE_URL || 'https://djangoreacttutorial-production.up.railway.app/'

const AxiosInstance = axios.create({
    baseURL: baseURL, // Base URL for the API (Django server)
    timeout: 5000, // Set a timeout of 5 seconds for requests
    headers: {
        'Content-Type': 'application/json', // Set the content type to JSON
        'Accept': 'application/json',   // Accept JSON responses
    }
});

export default AxiosInstance;