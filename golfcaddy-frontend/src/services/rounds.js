import axios from 'axios'

const baseUrl = '/api/rounds/'
const getToken = () => {
    return {
        headers: {
            Authorization: `bearer ${
                JSON.parse(localStorage.getItem('loggedUser')).token
            }`,
        },
    }
}
// Palauttaa id:tä vastaavaan käyttäjän kierrokset
const get = id => {
    const request = axios.get(`${baseUrl}/user/${id}`, getToken())
    return request.then(response => {
        return response.data
    })
}

/* const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => {
        return response.data
    })
} */

const create = round => {
    const request = axios.post(baseUrl, round, getToken())
    return request.then(response => response.data)
}
const remove = id => {
    const request = axios.delete(`${baseUrl}/${id}`, getToken())
    return request.then(response => response.data)
}
const rounds = { create, get, remove }
export default rounds
