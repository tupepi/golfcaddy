/* Listaus radoista, ja mahdollisuus lisätä niitä käytetään pelkkään listaukseen ja myöhemmin muokkaamiseen
sekä kierroksien aloittamiseen */
import { useState, useEffect } from 'react'
import NewCourse from './NewCourse'
import Gameplay from './Gameplay'
import coursesService from '../services/courses'

const CourseListing = ({ exit, enterNewGame, currentCourse }) => {
    const [showAddNewCourse, setShowAddNewCourse] = useState(false)
    const [courses, setCourses] = useState([])
    useEffect(() => {
        coursesService.getAll().then(courses => setCourses(courses))
    }, [])
    // Poistutaan radan lisäämisnäkymästä
    const exitAddNewCourse = () => {
        setShowAddNewCourse(false)
    }

    // Klikatessa radan nimeä. Jos ollaan yleisessä ratalistauksessa, ei tehdä mitään.
    const handleCourseClick = c => {
        if (enterNewGame !== null) enterNewGame(c)
    }

    // lisätään uusi rata
    const addNewCourse = async course => {
        const newCourse = await coursesService.create(course)
        setCourses(courses.concat(newCourse))
        exitAddNewCourse()
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
                {courses.map(c => (
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
