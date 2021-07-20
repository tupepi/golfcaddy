import { useState } from 'react'
import test_courses from '../ratoja'
import Gameplay from './Gameplay'
const NewGame = ({ exitNewGame }) => {
    const [currentCourse, setCurrentCourse] = useState(null)

    const courseClicked = course => {
        setCurrentCourse(course)
    }

    return currentCourse ? (
        <div>
            <Gameplay course={currentCourse}></Gameplay>
            <button onClick={exitNewGame}>back</button>
        </div>
    ) : (
        <div className='NewGame'>
            <h2>New Game</h2>
            <div className='courseListingDiv'>
                {test_courses.map(c => (
                    <div key={c.name} onClick={() => courseClicked(c)}>
                        {c.name}
                    </div>
                ))}
            </div>
            <button>add new course</button>
            <button onClick={exitNewGame}>back</button>
        </div>
    )
}

export default NewGame
