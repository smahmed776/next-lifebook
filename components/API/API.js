import axios from 'axios'

export default axios.create({
    baseURL: "/api/auth/v1/",
    withCredentials: true,
    credentials: "include"
})