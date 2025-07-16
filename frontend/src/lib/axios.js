import axios from 'axios'

export const axiosInstance = axios.create({
    baseURL : "http://localhost:5001/api",
    withCredentials : true // this will make sure request will be sent with cookies
})