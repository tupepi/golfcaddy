/* Radan lisäämislomake */
import { useEffect, useState } from 'react'
import styles from '../styles/NewCourse.module.css'

/* addCourse aliohjleman avulla lisätään rata */
const NewCourse = ({ addCourse, name, pars, editCourse }) => {
    // Radan pituus
    const [courseLength, setCourseLength] = useState(18)
    // radan nimi
    const [courseName, setCourseName] = useState('')
    // Radan par:it, oletuksena 3
    const [holePars, setHolePars] = useState([
        3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,
    ])
    useEffect(() => {
        if (name) {
            setCourseName(name)
            if (pars) {
                setHolePars(pars.map(p => p.par))
            }
            setCourseLength(pars.length)
        }
    }, [pars, name])
    // Muuttaessa radan pituutta, muuttuvat par:it
    const handleLengthChange = newLength => {
        if (newLength <= 0) return
        if (newLength > courseLength) {
            // Jos väyliä lisätään lisätään yhtä monta par:ia
            const newPars = [...holePars]
            for (var i = 0; i < newLength - courseLength; i++) {
                newPars.push(3)
            }
            setHolePars(newPars)
        } else {
            // muutoin vähennettään par:eja yhtä moneen kuin väyliä on jäljellä
            setHolePars(holePars.splice(0, newLength))
        }
        setCourseLength(newLength)
    }

    // Annetun väylän paria muutetaan
    const handleParChange = (hole, change) => {
        const newPars = holePars.map((p, i) =>
            i + 1 === hole && p + change > 0 ? p + change : p
        )
        setHolePars(newPars)
    }

    // Tallennettaan annetut tiedot
    const saveCourse = () => {
        // Jos on on annettu nimi, ollaan muokkaamassa olemassa olevaa
        if (!name) {
            addCourse({
                pars: holePars.map(p => {
                    return { par: p }
                }),
                name: courseName,
            })
        } else {
            editCourse({
                pars: holePars.map(p => {
                    return { par: p }
                }),
                name: courseName,
            })
        }
    }

    return (
        <div className={styles.NewCourse}>
            <div className={styles.NewCourseInfo}>
                <form>
                    <label htmlFor='coursename'>Name</label>
                    <input
                        type='text'
                        id='coursename'
                        name='coursename'
                        value={courseName}
                        onChange={({ target }) => setCourseName(target.value)}
                    ></input>
                </form>

                <div className={styles.courseLengthInfo}>
                    <div>Number of holes: {courseLength}</div>
                    <div className={styles.changeLengthButtons}>
                        <button
                            onClick={() => {
                                handleLengthChange(18)
                            }}
                        >
                            18
                        </button>
                        <button
                            onClick={() => {
                                handleLengthChange(9)
                            }}
                        >
                            9
                        </button>
                        <button
                            onClick={() => {
                                handleLengthChange(courseLength - 1)
                            }}
                        >
                            -
                        </button>

                        <button
                            onClick={() => {
                                handleLengthChange(courseLength + 1)
                            }}
                        >
                            +
                        </button>
                    </div>
                </div>

                <div className={styles.holeList}>
                    {holePars.map((h, i) => {
                        return (
                            <div key={i} className={styles.holeInfo}>
                                <div>Hole {1 + i} Par:</div>
                                <div className={styles.holePar}>{h}</div>
                                <div className={styles.changeParButtons}>
                                    <button
                                        onClick={() => {
                                            handleParChange(1 + i, -1)
                                        }}
                                    >
                                        -
                                    </button>
                                    <button
                                        onClick={() => {
                                            handleParChange(1 + i, 1)
                                        }}
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <button className={styles.saveNewCourse} onClick={saveCourse}>
                    Save
                </button>
            </div>
        </div>
    )
}

export default NewCourse
