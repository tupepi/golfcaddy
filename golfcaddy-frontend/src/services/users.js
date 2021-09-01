import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/users/'

const create = course => {
    const request = axios.post(baseUrl, course)
    return request.then(response => response.data)
}

const users = { create }
export default users
