/* Gameplay-komponentti vastaa pelin aikaisesta pisteiden kirjanpidosta */
import { useState, useEffect } from 'react'
import Hole from './Hole.js'
/* 
saveScore-funktion avulla tallennetaan käynnissä oleva kierros
*/
const Gameplay = ({ saveScore }) => {
    const [currentHole, setCurrentHole] = useState(1)
    const [playerScore, setPlayerScore] = useState([])
    const [course, setCourse] = useState(null)

    // Vain ekalla Gameplayn renderöinnillä
    useEffect(() => {
        // otetaan selaimen muistista valitturata
        const currentCourse = JSON.parse(localStorage.getItem('currentCourse'))
        setCourse(currentCourse)
        const currentScore = JSON.parse(localStorage.getItem('currentScore'))
        if (currentScore) {
            // Jos kierrokselta on jo pisteet olemassa käytetään niitä
            setPlayerScore(currentScore)
            // Jos ollaan jo jollain väylällä jatketaan siitä, muutoin väylältä 1
            const savedHole = parseInt(localStorage.getItem('currentHole'), 10)
            savedHole ? setCurrentHole(savedHole) : setCurrentHole(1)
            return
        }
        // Jos pisteitä ei ole asetetaan ensimmäiselle väylälle tulokseksi oletuksena Par, muille null
        setPlayerScore(
            currentCourse.pars.map((p, index) =>
                index === 0 ? currentCourse.pars[0].par : null
            )
        )
    }, [])

    useEffect(() => {
        // Päivitetään selaimen muistiin pisteet, jotta voidaan jatkaa vaikka poistuttaisiin
        localStorage.setItem('currentScore', JSON.stringify(playerScore))
    }, [playerScore])

    /* Käyttäjälle näytetään yksi väylä kerrallaan
    ja näillä vaihdetaan yksi eteen tai taaksepäin */
    const handleIncreaseCurrentHole = () => {
        changeCurrentHole(1)
    }
    const handleDecreaseCurrentHole = () => {
        changeCurrentHole(-1)
    }
    const changeCurrentHole = change => {
        // jos ollaan ensimmäisellä väylällä, ei voida mennä 0:nteen
        if (currentHole === 1 && change < 0) return
        // jos ollaan viimeisellä väylällä, ei voida mennä seuraavaan
        if (currentHole === course.pars.length && change > 0) return
        const newHole = currentHole + change
        // tilan lisäksi tallennetaan tämänhetkinen väylä selaimeen, jotta poistuttaessa voidaan palata mihin jäätiin
        setCurrentHole(newHole)
        localStorage.setItem('currentHole', newHole)
        // Uudelle väylälle siirtyessä muutetaan oletuspisteeksi väylän par jos siinä on null, muille sama kuin ennen
        if (change >= 1) {
            const newScore = playerScore.map((s, i) =>
                i === newHole - 1 && s === null
                    ? course.pars[newHole - 1].par
                    : s
            )
            setPlayerScore(newScore)
        }
    }

    /* Pelaajan väylän pisteiden muuttamiseen */
    const handleIncreaseScore = () => {
        changeScore(1)
    }
    const handleDecreaseScore = () => {
        changeScore(-1)
    }
    const changeScore = change => {
        if (playerScore[currentHole - 1] === 1 && change < 0) return
        // Luodaan uusi pistetaulukko, map-funktiossa jos indeksi on sama kuin
        // tämän hetkinen väylä, muutetaan sitä.
        const newScore = playerScore.map((strokes, i) => {
            if (i !== currentHole - 1) return strokes
            return strokes + change
        })
        setPlayerScore(newScore)
    }

    // Kierroksen lopetus
    const handleFinishRound = () => {
        saveScore(course, playerScore)
    }

    // Lasketaan pelattujen väylien lyönnit yhteen
    const countTotalScore = () => {
        return playerScore.reduce((a, b) => {
            if (!b) return a
            return a + b
        }, 0)
    }
    // Lasketaan suhteellinen tulos pelatuille väylille
    const countRelativeScore = () => {
        return playerScore.reduce((a, b, index) => {
            if (!b) return a
            return a + b - course.pars[index].par
        }, 0)
    }
    // Muuta nätimpään muotoon suhteellinen tulos
    const formalizeRelativeScore = score => {
        /* Jos tulos on tasan par:issa näytetään E, muutoin etumerkin kanssa luku itse */
        if (score === 0) return 'E'
        if (score > 0) return '+' + score
        return score
    }

    return course ? (
        <div className='gamePlayDiv'>
            <button className='finishRound' onClick={handleFinishRound}>
                finish round
            </button>
            <h2>{course.name}</h2>
            <div className='holeScoreDiv'>
                <button onClick={handleDecreaseScore}>-</button>
                <div className='currentHoleScore'>
                    {playerScore[currentHole - 1]}
                </div>
                <button onClick={handleIncreaseScore}>+</button>
            </div>
            <div className='holeInformationDiv'>
                <div className='holeNumberAndPar'>
                    <div className='holeDiv'>Hole: {currentHole}</div>
                    <div>Par: {course.pars[currentHole - 1].par}</div>
                    <div>
                        Score: {countTotalScore()} (
                        {formalizeRelativeScore(countRelativeScore())})
                    </div>
                </div>
                <button onClick={handleDecreaseCurrentHole}>&lt;</button>
                {currentHole === course.pars.length ? (
                    <button onClick={handleFinishRound}>finish round</button>
                ) : (
                    <button onClick={handleIncreaseCurrentHole}>&gt;</button>
                )}
            </div>
        </div>
    ) : null
}

export default Gameplay
