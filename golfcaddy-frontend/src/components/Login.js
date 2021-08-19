/* Login.js hoitaa käyttöliittymän kirjautumisen*/
import { useState } from 'react'

const Login = () => {
    // Kirjautumislomakkeen tiedot
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = () => {}
    return (
        <div>
            <h2>Login</h2>
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
            <button onClick={handleLogin}>login</button>
        </div>
    )
}

export default Login
