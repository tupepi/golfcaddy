/* App.js hoitaa käyttöliittymän kokonaisuuden 
hallitsemalla eri komponenttien näkyvyyttä */
import { useState, useEffect } from 'react'
import Mainmenu from './components/Mainmenu'
import Scorecards from './components/Scorecards'
import CourseListing from './components/CourseListing'

import roundsService from './services/rounds'
import coursesService from './services/courses'

const App = () => {
    // Eri alakohtien piilotteluun/näyttämiseen
    const [displayMainmenu, setDisplayMainmenu] = useState('')
    const [displayScorecards, setDisplayScorecards] = useState('none')
    const [displayCourses, setDisplayCourses] = useState('none')
    const [displayNewGame, setDisplayNewGame] = useState('none')

    // Kaikki radat listassa
    const [courses, setCourses] = useState([])
    // Kaikki pelatut kierrokset listassa
    const [rounds, setRounds] = useState([])
    useEffect(() => {
        roundsService.getAll().then(rounds => setRounds(rounds))
    }, [])
    useEffect(() => {
        coursesService.getAll().then(courses => setCourses(courses))
    }, [])
    // Kirjautunut käyttäjä, toistaiseksi kiinteästi
    const [loggedUser /* , setLoggedUser */] = useState(
        '60e8102d7a684e06bcd1e899'
    )
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

    // lisätään uusi rata
    const addNewCourse = async course => {
        const newCourse = await coursesService.create(course)
        setCourses(courses.concat(newCourse))
    }
    // Tallennetaan pisteet tämänhetkiselle pelaajalle
    const saveScore = async (score, date) => {
        const scorecard = {
            date: date,
            player: loggedUser,
            course: currentCourse,
            score: score,
        }
        const newRound = await roundsService.create(scorecard)
        setRounds(rounds.concat(newRound))
        handleExit(setDisplayNewGame)
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
                    rounds={rounds}
                ></Scorecards>
            </div>

            <div className='subMenuDiv' style={{ display: displayCourses }}>
                <CourseListing
                    exit={() => handleExit(setDisplayCourses)}
                    enterNewGame={null}
                    currentCourse={currentCourse}
                    addNewCourse={addNewCourse}
                    courses={courses}
                ></CourseListing>
            </div>

            <div className='subMenuDiv' style={{ display: displayNewGame }}>
                <CourseListing
                    player={loggedUser}
                    exit={() => handleExit(setDisplayNewGame)}
                    enterNewGame={handleStartNewGame}
                    currentCourse={currentCourse}
                    addNewCourse={addNewCourse}
                    courses={courses}
                    saveScore={saveScore}
                ></CourseListing>
            </div>
        </div>
    )
}

export default App
