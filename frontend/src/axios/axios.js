import axios from 'axios'

const axiosInstance = axios.create(
    {
        baseURL: 'http://localhost:8000',
        headers: {
            'Content-Type' : 'application/json',
            Authorization: localStorage.getItem('authToken')? "Bearer " + JSON.parse(localStorage.getItem('authToken')) : null,
            Accept : 'application/json'
        }
    }
)

export default axiosInstance