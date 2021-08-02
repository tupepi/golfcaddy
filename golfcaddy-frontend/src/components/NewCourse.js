/* Radan lisäämislomake */
import { useState } from 'react'
const NewCourse = ({ exit, addCourse }) => {
    // Radan pituus
    const [courseLength, setCourseLength] = useState(18)
    // radan nimi
    const [courseName, setCourseName] = useState('')
    // Radan par:it
    const [holePars, setHolePars] = useState([
        3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,
    ])

    // Muuttaessa radan pituutta, muuttuvat par:it
    const handleLengthChange = newLength => {
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
            i + 1 === hole ? p + change : p
        )
        setHolePars(newPars)
    }

    // Tallennettaan annetut tiedot
    const saveCourse = () => {
        addCourse({
            pars: holePars.map(p => {
                return { par: p }
            }),
            name: courseName,
        })
    }

    return (
        <div className='NewCourse'>
            <div>
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

                <div>
                    <div>Number of holes: {courseLength}</div>
                    <div>
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

                <div>
                    {holePars.map((h, i) => {
                        return (
                            <div key={i}>
                                <div>
                                    Hole {1 + i} Par: {h}
                                </div>
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
                        )
                    })}
                </div>
            </div>
            <button onClick={saveCourse}>Save</button>
            <button className='backButton' onClick={exit}>
                back
            </button>
        </div>
    )
}

export default NewCourse