import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/courses/'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = course => {
    const request = axios.post(baseUrl, course)
    return request.then(response => response.data)
}

const courses = { getAll, create }
export default courses
