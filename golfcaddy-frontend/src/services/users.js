import axios from 'axios'

const baseUrl = '/api/users/'

const create = course => {
    const request = axios.post(baseUrl, course)
    return request.then(response => response.data)
}

const users = { create }
export default users
