/* App.js hoitaa käyttöliittymän kokonaisuudens*/
import { useState } from 'react'
import Mainmenu from './components/Mainmenu'
import Login from './components/Login'

const App = () => {
    // Kirjautunut käyttäjä, toistaiseksi kiinteästi
    const [loggedUser /* , setLoggedUser */] = useState(
        '6113940d72599a2684ded7e5'
    )
    return (
        <div className='App'>
            <Login></Login>

            {/* <Mainmenu loggedUser={loggedUser}></Mainmenu> */}
        </div>
    )
}

export default App
