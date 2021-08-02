/* App.js hoitaa käyttöliittymän kokonaisuuden 
hallitsemalla eri komponenttien näkyvyyttä */
import { useState } from 'react'
import Mainmenu from './components/Mainmenu'
import Scorecards from './components/Scorecards'
import CourseListing from './components/CourseListing'

const App = () => {
    // Eri alakohtien piilotteluun/näyttämiseen
    const [displayMainmenu, setDisplayMainmenu] = useState('')
    const [displayScorecards, setDisplayScorecards] = useState('none')
    const [displayCourses, setDisplayCourses] = useState('none')
    const [displayNewGame, setDisplayNewGame] = useState('none')
    // Sovelluksen tiedossa täytyy olla, onko kierros käynnissä vai ei
    // Tämä voisi olla ennemmin (tai myös) selaimen muistissa tallessa
    const [currentCourse, setCurrentCourse] = useState(null)

    // Asetetaan tämän hetkiseksi kierrokseksi annettu
    const handleStartNewGame = course => {
        setCurrentCourse(course)
    }

    // Jos yritetään aloittaa uutta kierrosta vanhan ollessa käynnissä.
    const confirmNewRound = () => {
        // jos kierros ei ole käynnissä, aloitetaan suoraa
        if (!currentCourse) {
            handleEnter(setDisplayNewGame)
            return
        }
        // annetaan käyttäjän päättää aloitetaanko uusi vai ei
        if (window.confirm('Start new round?')) {
            setCurrentCourse(null)
            handleEnter(setDisplayNewGame)
        }
    }

    // komponenttien näkyvyys --------------------------------------
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
    //-------------------------------------------------------------------------
    // Joku fiksumpi juttu pitää kehitellä, kun on niin paljon toistoa
    return (
        <div className='App'>
            <div className='subMenuDiv' style={{ display: displayMainmenu }}>
                <Mainmenu
                    enterScorecards={() => handleEnter(setDisplayScorecards)}
                    enterNewGame={() => confirmNewRound()}
                    enterCurrentGame={() => handleEnter(setDisplayNewGame)}
                    enterCourses={() => handleEnter(setDisplayCourses)}
                ></Mainmenu>
            </div>

            <div className='subMenuDiv' style={{ display: displayScorecards }}>
                <Scorecards
                    exit={() => handleExit(setDisplayScorecards)}
                ></Scorecards>
            </div>

            <div className='subMenuDiv' style={{ display: displayCourses }}>
                <CourseListing
                    exit={() => handleExit(setDisplayCourses)}
                    enterNewGame={null}
                    currentCourse={currentCourse}
                ></CourseListing>
            </div>

            <div className='subMenuDiv' style={{ display: displayNewGame }}>
                <CourseListing
                    exit={() => handleExit(setDisplayNewGame)}
                    enterNewGame={handleStartNewGame}
                    currentCourse={currentCourse}
                ></CourseListing>
            </div>
        </div>
    )
}

export default App
