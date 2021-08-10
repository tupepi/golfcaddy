/* App.js hoitaa käyttöliittymän kokonaisuudens*/
import { useState } from 'react'
import Mainmenu from './components/Mainmenu'

const App = () => {
    // Kirjautunut käyttäjä, toistaiseksi kiinteästi
    const [loggedUser /* , setLoggedUser */] = useState(
        '60e8102d7a684e06bcd1e899'
    )

    return (
        <div className='App'>
            <Mainmenu loggedUser={loggedUser}></Mainmenu>
        </div>
    )
}

export default App
