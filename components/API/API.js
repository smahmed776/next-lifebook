import axios from 'axios'

export default axios.create({
    baseURL: "http://localhost:5000/api/auth/v1/",
    withCredentials: true,
    credentials: "include"
})