/* Login.js hoitaa käyttöliittymän kirjautumisen*/
import { useState } from 'react'
import userServices from '../services/users.js'
/* login:in avulla voidaan kirjautua */
const Login = ({ login }) => {
    // Kirjautumislomakkeen tiedot
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    // jos createNewAccountForm on true, näytetään käyttäjän luomislomakes
    const [createNewAccountForm, setCreateNewAccountForm] = useState(false)

    const handleLogin = async event => {
        event.preventDefault()
        login({
            username,
            password,
        })
    }

    const handleShowCreateAccount = () => {
        setUsername('')
        setPassword('')
        setCreateNewAccountForm(true)
    }
    const handleCancel = () => {
        setUsername('')
        setPassword('')
        setCreateNewAccountForm(false)
    }

    /* Luodaan käyttäjä (jos nimi ei ole käytössä). Nollataan lomake */
    const handleCreateAccount = async () => {
        try {
            await userServices.create({
                username: username,
                password: password,
            })
            setUsername('')
            setPassword('')
            setCreateNewAccountForm(false)
        } catch (e) {
            console.log('Username already used')
        }
    }

    return (
        <div>
            {createNewAccountForm ? (
                <h2>Create new account</h2>
            ) : (
                <h2>Login</h2>
            )}
            <div>
                username
                <input
                    id='username'
                    value={username}
                    onChange={({ target }) => setUsername(target.value)}
                />
            </div>
            <div>
                password
                <input
                    id='password'
                    value={password}
                    onChange={({ target }) => setPassword(target.value)}
                />
            </div>
            {createNewAccountForm ? (
                <div>
                    <button onClick={handleCreateAccount}>create</button>
                    <button onClick={handleCancel}>cancel</button>{' '}
                </div>
            ) : (
                <div>
                    <button onClick={handleLogin}>login</button>
                    <button onClick={handleShowCreateAccount}>
                        create new account
                    </button>
                </div>
            )}
        </div>
    )
}

export default Login
