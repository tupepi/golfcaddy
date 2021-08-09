import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/rounds/'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => {
        return response.data
    })
}

const create = round => {
    const request = axios.post(baseUrl, round)
    return request.then(response => response.data)
}

const rounds = { getAll, create }
export default rounds
