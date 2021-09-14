/* Gameplay-komponentti vastaa pelin aikaisesta pisteiden kirjanpidosta */
import { useState, useEffect } from 'react'

import styles from '../styles/Gameplay.module.css'
import functions from '../functions.js' // Muutama pisteiden laskuun liittyvä funktio on eristetty muualle
/* 
saveScore-funktion avulla tallennetaan käynnissä oleva kierros
*/
const Gameplay = ({ saveScore }) => {
    const [currentHole, setCurrentHole] = useState(1) // Pidetään tallessa millä väylällä ollaan
    const [playerScore, setPlayerScore] = useState([]) // Pelaajan pisteet
    const [course, setCourse] = useState(null) // rata, jolla ollaan

    // Vain ekalla Gameplayn renderöinnillä
    useEffect(() => {
        // otetaan selaimen muistista valitturata
        const currentCourse = JSON.parse(localStorage.getItem('currentCourse'))
        setCourse(currentCourse)
        // Selaimen muistista pisteet, jos esim ollaan poistuttu pelistä, ja palataan
        const currentScore = JSON.parse(localStorage.getItem('currentScore'))
        if (currentScore) {
            // Jos kierrokselta on jo pisteet olemassa käytetään niitä
            setPlayerScore(currentScore)
            // Jos ollaan jo jollain väylällä jatketaan siitä, muutoin väylältä 1
            const savedHole = parseInt(localStorage.getItem('currentHole'), 10)
            savedHole ? setCurrentHole(savedHole) : setCurrentHole(1)
            return
        }
        // Jos pisteitä ei ole asetetaan kaikille null
        setPlayerScore(currentCourse.pars.map(() => null))
    }, [])

    // Aina pelajaan pisteiden päivittyessä
    useEffect(() => {
        // Päivitetään selaimen muistiin pisteet, jotta voidaan jatkaa vaikka poistuttaisiin
        localStorage.setItem('currentScore', JSON.stringify(playerScore))
    }, [playerScore])

    /* Pelaajan väylän pisteiden muuttamiseen */
    const handleIncreaseScore = () => {
        changeScore(1)
    }
    const handleDecreaseScore = () => {
        changeScore(-1)
    }
    const changeScore = change => {
        // Jos uusi tulos on 0, poistutaan
        if (playerScore[currentHole - 1] === 1 && change < 0) return
        // Luodaan uusi pistetaulukko, map-funktiossa jos indeksi on sama kuin
        // tämän hetkinen väylä, muutetaan sitä.
        const newScore = playerScore.map((strokes, i) => {
            if (i !== currentHole - 1) return strokes
            // jos väylällä on olemassa tulos, muutetaan, muutoin asetetaan väylän tulokseksi par
            return strokes ? strokes + change : course.pars[currentHole - 1].par
        })
        setPlayerScore(newScore)
    }

    // Kierroksen lopetus
    const handleFinishRound = () => {
        saveScore(course, playerScore)
    }

    return course ? (
        <div className={styles.gamePlayDiv}>
            <button className={styles.finishRound} onClick={handleFinishRound}>
                finish round
            </button>
            <h2>{course.name}</h2>
            <div className={styles.holeScoreDiv}>
                <button onClick={handleDecreaseScore}>-</button>
                <div className={styles.currentHoleScore}>
                    {playerScore[currentHole - 1]
                        ? playerScore[currentHole - 1]
                        : '-'}
                </div>
                <button onClick={handleIncreaseScore}>+</button>
            </div>
            <div className={styles.holeInformationDiv}>
                <div className={styles.holeDiv}>
                    Hole: <span>{currentHole}</span>
                </div>
                <div>Par: {course.pars[currentHole - 1].par}</div>
                <div>
                    Score: {functions.countTotalScore(playerScore)} (
                    {functions.countFormalRelativeScore(
                        playerScore,
                        course.pars
                    )}
                    )
                </div>
            </div>
            <div className={styles.holeList}>
                {course.pars.map((p, i) => {
                    return (
                        <div
                            key={i}
                            className={
                                currentHole === i + 1 ? styles.selectedHole : ''
                            }
                            onClick={() => setCurrentHole(i + 1)}
                        >
                            <p>{i + 1}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    ) : null
}

export default Gameplay
