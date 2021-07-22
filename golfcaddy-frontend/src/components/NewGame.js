/* NewGame-komponentti luo listauksen pelattavista radoista, joista pelaaja voi aloittaa kierroksen */
import { useState } from 'react'
import test_courses from '../ratoja'
import Gameplay from './Gameplay'
const NewGame = ({ exitNewGame }) => {
    const [currentCourse, setCurrentCourse] = useState(null)

    // Klikkaamalla rataa, alkaa pelaaminen
    const courseClicked = course => {
        setCurrentCourse(course)
    }

    // Jos kierros on käynnissä, renderöidään pelitilanne pelin aloitusvalikon sijaan
    return currentCourse ? (
        <div>
            <Gameplay course={currentCourse}></Gameplay>
            <button onClick={exitNewGame}>back</button>
        </div>
    ) : (
        <div className='NewGame'>
            <h1>New Game</h1>
            <div className='courseListingDiv'>
                {test_courses.map(c => (
                    <div key={c.name} onClick={() => courseClicked(c)}>
                        {c.name}
                    </div>
                ))}
            </div>
            <div>
                <button>add new course</button>
                <button onClick={exitNewGame}>back</button>
            </div>
        </div>
    )
}

export default NewGame
