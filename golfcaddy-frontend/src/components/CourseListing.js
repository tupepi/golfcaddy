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
    const [selectedCourse, setSelectedCourse] = useState(null)
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

    // radan-muokkauksen klikkaamisen jälkeen näytetään lisäyslomake
    const handleClickEditCourse = () => {
        enter(
            <NewCourse
                editCourse={course => handleEditCourse(course)}
                name={selectedCourse.name}
                pars={selectedCourse.pars}
            ></NewCourse>
        )
    }
    // Klikatessa radan nimeä. Jos ollaan yleisessä ratalistauksessa, ei tehdä mitään.
    const handleCourseClick = c => {
        setSelectedCourse(c)
    }

    const startGame = () => {
        if (enterNewGame) {
            localStorage.setItem('startingTime', JSON.stringify(new Date()))
            localStorage.setItem(
                'currentCourse',
                JSON.stringify(selectedCourse)
            )
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
    // muokataan rataa, ja piilotetaan muokkauss
    const handleEditCourse = async course => {
        const editedCourse = Object.assign({ _id: selectedCourse._id }, course)
        const newCourse = await coursesService.update(editedCourse)
        /* poistetaan käyttliittymästä vanha ja lisätään uusi */
        setCourses(courses.map(c => (c._id === newCourse._id ? newCourse : c)))
        // poistutaan toistaiseksi näin
        document.getElementsByClassName('backButton')[0].click()
    }
    const courseButtons = () => {
        return enterNewGame ? (
            <button
                className={styles.startNewGameButton}
                onClick={() => startGame()}
            >
                Start Game
            </button>
        ) : (
            <button
                className={styles.startNewGameButton}
                onClick={() => handleClickEditCourse()}
            >
                Edit Course
            </button>
        )
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
                        style={
                            selectedCourse
                                ? c.name === selectedCourse.name
                                    ? { backgroundColor: '#B6B6B6' }
                                    : null
                                : null
                        }
                        className={styles.course}
                        key={c.name}
                        onClick={() => {
                            handleCourseClick(c)
                        }}
                    >
                        <span>{c.name}</span>
                    </div>
                ))}
            </div>

            {selectedCourse ? courseButtons() : null}

            <button
                className={styles.addNewCourseButton}
                onClick={() => handleClickAddNewCourse()}
            >
                Add New Course
            </button>
        </div>
    )
}

export default CourseListing
