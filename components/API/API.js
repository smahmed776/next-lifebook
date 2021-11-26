import axios from 'axios'

export default axios.create({
    baseURL: "https://lifebooksocial.herokuapp.com/api/auth/v1/",
    withCredentials: true,
    credentials: "include"
})