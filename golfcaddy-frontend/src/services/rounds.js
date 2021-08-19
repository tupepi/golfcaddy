import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/rounds/'

// Palauttaa id:tä vastaavaan käyttäjän kierrokset
const get = id => {
    const request = axios.get(baseUrl + '/user/' + id)
    return request.then(response => {
        return response.data
    })
}

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

const rounds = { getAll, create, get }
export default rounds
