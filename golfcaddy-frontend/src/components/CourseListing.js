/* Listaus radoista, ja mahdollisuus lisätä niitä käytetään pelkkään listaukseen ja myöhemmin muokkaamiseen
sekä kierroksien aloittamiseen */
import test_courses from '../ratoja'
import { useState } from 'react'
import NewCourse from './NewCourse'
import Gameplay from './Gameplay'
const CourseListing = ({ exit, enterNewGame, currentCourse }) => {
    const [showAddNewCourse, setShowAddNewCourse] = useState(false)
    // VÄLIAIKAISESTI TILAKSI
    const [testCourses, setTestCourses] = useState(test_courses)
    // Poistutaan radan lisäämis näkymästä
    const exitAddNewCourse = () => {
        setShowAddNewCourse(false)
    }

    // Klikatessa radan nimeä. Jos ollaan yleisessä ratalistauksessa, ei tehdä mitään.
    const handleCourseClick = c => {
        if (enterNewGame !== null) enterNewGame(c)
    }

    // lisätään uusi rata TODO: TIETOKANTAYHTEYS JA LISÄYS
    const addNewCourse = course => {
        const newCourses = [...test_courses]
        newCourses.push(course)
        setTestCourses(newCourses)
    }
    // Jos näytetään radanlisäämisnäkymä
    return showAddNewCourse ? (
        <NewCourse
            exit={exitAddNewCourse}
            addCourse={course => addNewCourse(course)}
        ></NewCourse>
    ) : // Jos kierros on käynnissä, renderöidään pelitilanne pelin aloitusvalikon sijaan
    currentCourse && enterNewGame !== null ? (
        <div style={{ height: '100%' }}>
            <Gameplay course={currentCourse}></Gameplay>
            <button className='backButton' onClick={exit}>
                back
            </button>
        </div>
    ) : (
        <div className='NewGame'>
            {
                /* Otsikon valinta tilanteen mukaan */ enterNewGame ? (
                    <h1>New Game</h1>
                ) : (
                    <h1>Courses</h1>
                )
            }
            <div className='courseListingDiv'>
                {testCourses.map(c => (
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

export default CourseListing
