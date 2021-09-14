/* Listaus radoista, ja mahdollisuus lisätä niitä käytetään pelkkään listaukseen ja myöhemmin muokkaamiseen
sekä kierroksien aloittamiseen */
import { useEffect, useState } from 'react'
import NewCourse from './NewCourse' // NewCourse-komponentin avulla lisätään uusia ratoja ja muokataan vanhoja
import coursesService from '../services/courses' // courseservice hakee kaikki radat
import styles from '../styles/CourseListing.module.css' // Otetaan käyttöön tyyli tästä tiedostosta
/* enterNewGame avulla siirryttään uuteen peliin, 
jos enterNewGame on null, näytetään vain listausradoista ilman mahdollisuutta pelaamiseen

enter avulla voidaan määrätä näytettäväksi radan lisäämislomake tai pelikierrostilanne
*/
const CourseListing = ({ enterNewGame, enter }) => {
    // Radat listattuna
    const [courses, setCourses] = useState([])
    // näytetään vain radat joiden nimi sisältää merkkijonon
    const [filter, setFilter] = useState('')
    // käyttäjän täytyy valita, jokin rata ja sitten hyväksyä valinta, oletuksena ei mikään valittuna
    const [selectedCourse, setSelectedCourse] = useState(null)
    // Aluksi haetaan kaikki radat
    useEffect(() => {
        coursesService.getAll().then(courses =>
            setCourses(
                courses.sort((a, b) => {
                    var nameA = a.name.toUpperCase()
                    var nameB = b.name.toUpperCase()
                    if (nameA < nameB) {
                        return -1
                    }
                    if (nameA > nameB) {
                        return 1
                    }
                    return 0
                })
            )
        )
    }, [])

    // radan-lisäyksen klikkaamisen jälkeen näytetään lisäyslomake
    const handleClickAddNewCourse = () => {
        enter(
            <NewCourse
                addCourse={course => handleAddNewCourse(course)}
            ></NewCourse>
        )
    }

    // radan-muokkauksen klikkaamisen jälkeen näytetään muokkaamislomake
    const handleClickEditCourse = () => {
        enter(
            <NewCourse
                editCourse={course => handleEditCourse(course)}
                name={selectedCourse.name}
                pars={selectedCourse.pars}
            ></NewCourse>
        )
    }

    // Klikatessa radan nimeä.
    const handleCourseClick = c => {
        setSelectedCourse(c)
    }

    // Pelin aloittaminen
    const startGame = () => {
        if (enterNewGame) {
            // Pelin alkaessa laitetaan talteen aloitusajankohta...
            localStorage.setItem('startingTime', JSON.stringify(new Date()))
            // sekä rata, jolla pelataan
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
        setCourses(
            courses.concat(newCourse).sort((a, b) => {
                var nameA = a.name.toUpperCase()
                var nameB = b.name.toUpperCase()
                if (nameA < nameB) {
                    return -1
                }
                if (nameA > nameB) {
                    return 1
                }
                return 0
            })
        )
        // poistutaan lisäyksen jälkeen lomakkeelta toistaiseksi näin
        document.getElementsByClassName('backButton')[0].click()
    }
    // muokataan rataa, ja piilotetaan muokkauss
    const handleEditCourse = async course => {
        const editedCourse = Object.assign({ _id: selectedCourse._id }, course)
        const newCourse = await coursesService.update(editedCourse)
        /* poistetaan käyttliittymästä vanha ja lisätään uusi */
        setCourses(courses.map(c => (c._id === newCourse._id ? newCourse : c)))
        // poistutaan muokkauksen jälkeen lomakkeelta toistaiseksi näin
        document.getElementsByClassName('backButton')[0].click()
    }

    // palautetaan eri button riippuen siitä, ollaanko "New Game"-osassa,
    // vai "Courses"-osassa. Toisessa voidaan aloittaa uusi peli ja toisessa muokata ratojas
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
            <input
                className={styles.filter}
                placeholder='filter'
                value={filter}
                onChange={({ target }) => setFilter(target.value)}
            />
            {
                /* Otsikon valinta tilanteen mukaan */ enterNewGame ? (
                    <h1>New Game</h1>
                ) : (
                    <h1>Courses</h1>
                )
            }
            <div className={styles.courseListingDiv}>
                {courses.map(c => {
                    if (
                        c.name
                            .toLocaleLowerCase()
                            .includes(filter.toLocaleLowerCase())
                    ) {
                        return (
                            <div
                                style={
                                    // Jos kyseinen rata on valittu rata, laitetaan taustaksi harmaampi
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
                        )
                    }
                    return null
                })}
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
