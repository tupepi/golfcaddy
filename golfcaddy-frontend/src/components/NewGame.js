/* NewGame-komponentti luo listauksen pelattavista radoista, joista pelaaja voi aloittaa kierroksen */
import test_courses from '../ratoja'
import Gameplay from './Gameplay'
const NewGame = ({ exitNewGame, enterNewGame, currentCourse }) => {
    // Klikkaamalla rataa, alkaa pelaaminen
    const handleCourseClick = course => {
        enterNewGame(course)
    }

    // Jos kierros on käynnissä, renderöidään pelitilanne pelin aloitusvalikon sijaan
    return currentCourse ? (
        <div style={{ height: '100%' }}>
            <Gameplay course={currentCourse}></Gameplay>
            <button className='backButton' onClick={exitNewGame}>
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

            <button>add new course</button>

            <button className='backButton' onClick={exitNewGame}>
                back
            </button>
        </div>
    )
}

export default NewGame
