/* NewGame-komponentti luo listauksen pelattavista radoista, joista pelaaja voi aloittaa kierroksen */
import test_courses from '../ratoja'
import Gameplay from './Gameplay'
import NewCourse from './NewCourse'

import { useState } from 'react'
const NewGame = ({ exit, enterNewGame, currentCourse }) => {
    const [showAddNewCourse, setShowAddNewCourse] = useState(false)
    // Klikkaamalla rataa, alkaa pelaaminen
    const handleCourseClick = course => {
        enterNewGame(course)
    }
    // Poistutaan radan lisäämis näkymästä
    const exitAddNewCourse = () => {
        setShowAddNewCourse(false)
    }

    // Jos näytetään radanlisäämisnäkymä
    return showAddNewCourse ? (
        <NewCourse exit={exitAddNewCourse}></NewCourse>
    ) : // Jos kierros on käynnissä, renderöidään pelitilanne pelin aloitusvalikon sijaan
    currentCourse ? (
        <div style={{ height: '100%' }}>
            <Gameplay course={currentCourse}></Gameplay>
            <button className='backButton' onClick={exit}>
                back
            </button>
        </div>
    ) : (
        <div className='NewGame'>
            <h1>New Game</h1>
            <div className='courseListingDiv'>
                {test_courses.map(c => (
                    <div key={c.name} onClick={() => handleCourseClick(c)}>
                        {c.name}
                    </div>
                ))}
            </div>

            <button onClick={() => setShowAddNewCourse(!showAddNewCourse)}>
                add new course
            </button>

            <button className='backButton' onClick={exit}>
                back
            </button>
        </div>
    )
}

export default NewGame
