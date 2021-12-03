import axios from 'axios'

export default axios.create({
    baseURL: process.env.API_URI,
    withCredentials: true,
    credentials: "include"
})