/* Päävalikko, hoitaa eri alivalikoiden näyttämisen */
import Scorecards from './Scorecards'
import CourseListing from './CourseListing'
import { useState, useEffect } from 'react'
import roundsService from '../services/rounds'
import coursesService from '../services/courses'

const Mainmenu = ({ loggedUser }) => {
    // Sovelluksen tiedossa täytyy olla, onko kierros käynnissä vai ei
    // Tämä voisi olla ennemmin (tai myös) selaimen muistissa tallessa
    const [currentCourse, setCurrentCourse] = useState(null)
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

    /* componentToRender:in viimeinen alkio on näytettävä komponentti
    Jos se on null, näytettään main menu */
    const [componentToRender, setComponentToRender] = useState(null)

    // Poistutaan tämän hetkisestä näkymästä ja palataan "edelliseen"
    const exit = () => {
        // Jos pituus on enemmän kuin 1 joku muu kuin Main Menu on edellinen
        if (componentToRender && componentToRender.length > 1) {
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

    // lisätään uusi rata
    const addNewCourse = async course => {
        const newCourse = await coursesService.create(course)
        setCourses(courses.concat(newCourse))
    }

    // Tallenetaan annettujen tietojen perusteella scorecard
    const saveScore = async (course, score, date) => {
        const scorecard = {
            date: date,
            player: loggedUser,
            course: course,
            score: score,
        }
        const newRound = await roundsService.create(scorecard)
        setRounds(rounds.concat(newRound))
        exit()
    }

    /* Lista listoista, jos yksikään listan komponenttilistoista
    ei ole valittuna, renderöidään päävalikko. Jos jokin on valittuna
    renderöidään kyseisen listan viimeinen alkio.    
    */
    const components = [
        [
            <div className='subMenuDiv'>
                <Scorecards
                    rounds={rounds}
                    enter={c => pushToComponents(0, c)}
                ></Scorecards>
            </div>,
        ],
        [
            <div className='subMenuDiv'>
                <CourseListing
                    enterNewGame={null}
                    addNewCourse={addNewCourse}
                    courses={courses}
                    enter={c => pushToComponents(1, c)}
                    exit={exit}
                ></CourseListing>
            </div>,
        ],
        [
            <div className='subMenuDiv'>
                <CourseListing
                    player={loggedUser}
                    enterNewGame={course => setCurrentCourse(course)}
                    addNewCourse={addNewCourse}
                    courses={courses}
                    saveScore={saveScore}
                    enter={c => pushToComponents(2, c)}
                    exit={exit}
                ></CourseListing>
            </div>,
        ],
    ]

    return componentToRender ? (
        <div>
            <button className='backButton' onClick={exit}>
                back
            </button>
            {componentToRender[componentToRender.length - 1]}
        </div>
    ) : (
        <div className='Mainmenu'>
            <h1>GolfCaddy</h1>
            <div className='mainMenuButtons'>
                <button onClick={() => setComponentToRender(components[2])}>
                    New game
                </button>
                <button onClick={() => null}>Resume game</button>
                <button onClick={() => setComponentToRender(components[1])}>
                    Courses
                </button>
                <button onClick={() => setComponentToRender(components[0])}>
                    Scorecards
                </button>
            </div>
        </div>
    )
}

export default Mainmenu
