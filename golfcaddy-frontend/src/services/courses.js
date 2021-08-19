import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/courses/'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const get = id => {
    const request = axios.get(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}

const create = course => {
    const request = axios.post(baseUrl, course)
    return request.then(response => response.data)
}

const courses = { getAll, create, get }
export default courses