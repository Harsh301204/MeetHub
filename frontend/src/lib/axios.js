import axios from 'axios'

const BASE_URL = import.meta.env.MODE === "deployment" ? "http://localhost:5001/api" : "/api"

export const axiosInstance = axios.create({
    baseURL : BASE_URL,
    withCredentials : true // this will make sure request will be sent with cookies
})