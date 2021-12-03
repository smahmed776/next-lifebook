import axios from 'axios'

export default axios.create({
    baseURL: process.env.NODE_ENV === "production" ? process.env.API_URI : "http://localhost:5000/api/auth/v1/",
    withCredentials: true,
    credentials: "include"
})