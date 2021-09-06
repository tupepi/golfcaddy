/* Päävalikko, hoitaa eri alivalikoiden näyttämisen */
import Scorecards from './Scorecards'
import Scorecard from './Scorecard'
import CourseListing from './CourseListing'
import Gameplay from './Gameplay'
import { useState, useEffect } from 'react'
import roundsService from '../services/rounds'
import styles from '../styles/Mainmenu.module.css'

// loggedUser on kirjautunut käyttäjä, logout avulla kirjataan ulos
const Mainmenu = ({ loggedUser, logout }) => {
    // Kaikki kirjautuneen pelaajan pelatut kierrokset listassa
    const [rounds, setRounds] = useState([])
    useEffect(() => {
        roundsService.get(loggedUser._id).then(rounds => setRounds(rounds))
    }, [loggedUser])

    /* componentToRender:in viimeinen alkio on näytettävä komponentti
    Jos se on null, näytettään main menu */
    const [componentToRender, setComponentToRender] = useState(null)

    // Poistutaan tämän hetkisestä näkymästä ja palataan "edelliseen"
    const exit = () => {
        // Jos pituus on enemmän kuin 1 joku muu kuin Main Menu on edellinen
        if (componentToRender && componentToRender.length > 1) {
            /* componentToRender.slice(0, -1) palauttaa componentToRender-taulukon ilman viimeistö alkiota */
            const newComponentToRender = componentToRender.slice(0, -1)
            setComponentToRender(newComponentToRender)
            return
        }
        setComponentToRender(null)
    }

    // mennään "syvemmälle" valikoissa
    const pushToComponents = (index, newComponent) => {
        setComponentToRender([...components[index], newComponent])
    }

    // Tallenetaan annettujen tietojen perusteella scorecard
    const saveScore = async (course, score) => {
        const scorecard = {
            date: JSON.parse(localStorage.getItem('startingTime')),
            player: loggedUser._id,
            course: course,
            score: score,
        }
        const newRound = await roundsService.create(scorecard)
        setRounds(rounds.concat(newRound))
        /* scorecardin tallentamisen jälkeen poistutaan pelikierrosnäkymästä
        eli palataan Main Menu näkymään */
        exit()
        /* Mutta asetetaan päälle pelikierroksen tietojen näyttäminen */
        setComponentToRender([<Scorecard scorecard={newRound}></Scorecard>])
        /* Poistetaan käynnissä olleen kierroksen tiedot selaimen muistista */
        localStorage.removeItem('currentCourse')
        localStorage.removeItem('currentScore')
        localStorage.removeItem('startingTime')
        localStorage.removeItem('currentHole')
    }

    const handleResumeGame = () => {
        /* Jos selaimen muistissa ei ole kierrosta, kysytään aloitetaanko uusi */
        if (JSON.parse(localStorage.getItem('currentScore'))) {
            setComponentToRender(components[3])
            return
        }

        if (window.confirm('no current round, start new?')) {
            handleNewGame()
        }
    }

    const enterNewGame = () => {
        setComponentToRender(components[3])
    }

    const handleNewGame = () => {
        /* Jos selaimen muistissa on kierros, varmistetaan halutaanko uusi aloittaa */
        if (JSON.parse(localStorage.getItem('currentScore'))) {
            if (window.confirm('Start new round?')) {
                localStorage.removeItem('currentScore')
                localStorage.removeItem('currentCourse')
                localStorage.removeItem('startingTime')
                setComponentToRender(components[2])
            }
            return
        }
        setComponentToRender(components[2])
    }

    /* Lista listoista, jos yksikään listan komponenttilistoista
    ei ole valittuna, renderöidään päävalikko. Jos jokin on valittuna
    renderöidään kyseisen listan viimeinen alkio.    
    */
    const components = [
        [
            <div className={styles.subMenuDiv}>
                <Scorecards
                    rounds={rounds}
                    enter={c => pushToComponents(0, c)}
                ></Scorecards>
            </div>,
        ],
        [
            <div className={styles.subMenuDiv}>
                <CourseListing
                    enterNewGame={null}
                    enter={c => pushToComponents(1, c)}
                ></CourseListing>
            </div>,
        ],
        [
            <div className={styles.subMenuDiv}>
                <CourseListing
                    enterNewGame={enterNewGame}
                    enter={c => pushToComponents(2, c)}
                ></CourseListing>
            </div>,
        ],
        [<Gameplay saveScore={saveScore}></Gameplay>],
    ]

    return componentToRender ? (
        <div style={{ height: '100%' }}>
            <button className='backButton' onClick={exit}>
                back
            </button>
            {componentToRender[componentToRender.length - 1]}
        </div>
    ) : (
        <div className={styles.Mainmenu}>
            <h1>GolfCaddy</h1>
            <div className={styles.mainMenuButtons}>
                <button onClick={handleNewGame}>New game</button>
                <button onClick={handleResumeGame}>Resume game</button>
                <button onClick={() => setComponentToRender(components[1])}>
                    Courses
                </button>
                <button onClick={() => setComponentToRender(components[0])}>
                    Scorecards
                </button>
                <button onClick={() => logout()}>Logout</button>
            </div>
        </div>
    )
}

export default Mainmenu
