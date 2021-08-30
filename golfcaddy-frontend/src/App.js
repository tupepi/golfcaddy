/* App.js hoitaa käyttöliittymän kokonaisuudens*/
import { useState } from 'react'
import Mainmenu from './components/Mainmenu'
import Login from './components/Login'

import loginService from './services/login'
const App = () => {
    // Kirjautunut käyttäjä
    const [loggedUser, setLoggedUser] = useState(null)
    const login = async userInfo => {
        const user = await loginService.login(userInfo)
        setLoggedUser(user)
    }
    return loggedUser ? (
        <div className='App'>
            <Mainmenu loggedUser={loggedUser}></Mainmenu>
        </div>
    ) : (
        <div className='App'>
            <Login login={login}></Login>
            {/* 
            <Mainmenu loggedUser={loggedUser}></Mainmenu> */}
        </div>
    )
}

export default App
