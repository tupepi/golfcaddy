/* App.js hoitaa käyttöliittymän kokonaisuudens*/
import { useState, useEffect } from 'react'
import Mainmenu from './components/Mainmenu'
import Login from './components/Login'

import loginService from './services/login'
const App = () => {
    // tallennetaan käyttöliittymän tietoon käyttäjä
    useEffect(() => {
        setLoggedUser(JSON.parse(localStorage.getItem('loggedUser')))
    }, [])
    // Kirjautunut käyttäjä
    const [loggedUser, setLoggedUser] = useState(null)
    const login = async userInfo => {
        const user = await loginService.login(userInfo)
        setLoggedUser(user)
        localStorage.setItem('loggedUser', JSON.stringify(user))
    }
    // Uloskirjautuessa nollataan käyttäjätiedot, sekä selaimen muisti
    const logout = async () => {
        setLoggedUser(null)
        localStorage.clear()
    }

    const appContent = loggedUser ? (
        <Mainmenu loggedUser={loggedUser} logout={logout}></Mainmenu>
    ) : (
        <Login login={login}></Login>
    )

    return <div className='App'>{appContent}</div>
}

export default App
