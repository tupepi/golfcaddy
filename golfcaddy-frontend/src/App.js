import { useState } from 'react'
import Mainmenu from './components/Mainmenu'
import Scorecards from './components/Scorecards'
import Courses from './components/Courses'
import NewGame from './components/NewGame'

const App = () => {
    // Eri alakohtien piilotteluun/näyttämiseen
    const [displayMainmenu, setDisplayMainmenu] = useState('')
    const [displayScorecards, setDisplayScorecards] = useState('none')
    const [displayCourses, setDisplayCourses] = useState('none')
    const [displayNewGame, setDisplayNewGame] = useState('none')

    // Muuttaa annetun kohdan näkyväksi
    const handleEnter = setDisplay => {
        setDisplayMainmenu('none')
        setDisplay('')
    }

    // Muuttaa annetun kohdan piilotetuksi
    const handleExit = setDisplay => {
        setDisplayMainmenu('')
        setDisplay('none')
    }

    // Joku fiksumpi juttu pitää kehitellä, kun on niin paljon toistoa
    return (
        <div className='App'>
            <div style={{ display: displayMainmenu }}>
                <Mainmenu
                    enterScorecards={() => handleEnter(setDisplayScorecards)}
                    enterNewGame={() => handleEnter(setDisplayNewGame)}
                    enterCourses={() => handleEnter(setDisplayCourses)}
                ></Mainmenu>
            </div>

            <div style={{ display: displayScorecards }}>
                <Scorecards
                    exitScorecards={() => handleExit(setDisplayScorecards)}
                ></Scorecards>
            </div>

            <div style={{ display: displayCourses }}>
                <Courses
                    exitCourses={() => handleExit(setDisplayCourses)}
                ></Courses>
            </div>

            <div style={{ display: displayNewGame }}>
                <NewGame
                    exitNewGame={() => handleExit(setDisplayNewGame)}
                ></NewGame>
            </div>
        </div>
    )
}

export default App
