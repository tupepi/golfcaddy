/* Listaus radoista, ja mahdollisuus lisätä niitä käytetään pelkkään listaukseen ja myöhemmin muokkaamiseen
sekä kierroksien aloittamiseen */
import { useEffect, useState } from 'react'
import NewCourse from './NewCourse'
import coursesService from '../services/courses'
import styles from '../styles/CourseListing.module.css'
/* enterNewGame avulla siirryttään uuteen peliin, 
jos enterNewGame on null, näytetään vain listausradoista ilman mahdollisuutta pelaamiseen

enter avulla voidaan määrätä näytettäväksi radan lisäämislomake tai pelikierrostilanne
*/
const CourseListing = ({ enterNewGame, enter }) => {
    // Radat listattuna
    const [courses, setCourses] = useState([])
    useEffect(() => {
        coursesService.getAll().then(courses => setCourses(courses))
    }, [])

    // radan-lisäyksen klikkaamisen jälkeen näytetään lisäyslomake
    const handleClickAddNewCourse = () => {
        enter(
            <NewCourse
                addCourse={course => handleAddNewCourse(course)}
            ></NewCourse>
        )
    }

    // Klikatessa radan nimeä. Jos ollaan yleisessä ratalistauksessa, ei tehdä mitään.
    const handleCourseClick = c => {
        if (enterNewGame) {
            localStorage.setItem('startingTime', JSON.stringify(new Date()))
            localStorage.setItem('currentCourse', JSON.stringify(c))
            enterNewGame()
        }
    }

    // lisätään uusi rata, ja piilotetaan lisäyslomake
    const handleAddNewCourse = async course => {
        const newCourse = await coursesService.create(course)
        /* lisäys myös käyttliittymän listaan */
        setCourses(courses.concat(newCourse))
        // poistutaan toistaiseksi näin
        document.getElementsByClassName('backButton')[0].click()
    }

    return (
        <div className={styles.NewGame}>
            {
                /* Otsikon valinta tilanteen mukaan */ enterNewGame ? (
                    <h1>New Game</h1>
                ) : (
                    <h1>Courses</h1>
                )
            }
            <div className={styles.courseListingDiv}>
                {courses.map(c => (
                    <div
                        className={styles.course}
                        key={c.name}
                        onClick={() => handleCourseClick(c)}
                    >
                        <span>{c.name}</span>
                    </div>
                ))}
            </div>
            <button
                className={styles.addNewCourseButton}
                onClick={() => handleClickAddNewCourse()}
            >
                add new course
            </button>
        </div>
    )
}

export default CourseListing
