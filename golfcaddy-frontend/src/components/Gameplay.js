/* Gameplay-komponentti vastaa pelin aikaisesta pisteiden kirjanpidosta */
import { useState, useEffect } from 'react'

const Gameplay = ({ course, currentTime, saveScore }) => {
    const [currentHole, setCurrentHole] = useState(1)
    const [playerScore, setPlayerScore] = useState([])
    useEffect(() => {
        // Asetetaan ensimmäiselle väylälle tulokseksi oletuksena Par, muille NaN
        setPlayerScore(
            course.pars.map((p, index) =>
                index === 0 ? course.pars[0].par : NaN
            )
        )
    }, [course.pars])

    /* Käyttäjälle näytetään yksi väylä kerrallaan
    ja näillä vaihdetaan yksi eteen tai taaksepäin */
    const handleIncreaseCurrentHole = () => {
        changeCurrentHole(1)
    }
    const handleDecreaseCurrentHole = () => {
        changeCurrentHole(-1)
    }
    const changeCurrentHole = change => {
        if (currentHole === 1 && change < 0) return
        if (currentHole === course.pars.length && change > 0) return
        const newHole = currentHole + change
        setCurrentHole(newHole)
        // Uudelle väylälle siirtyessä muutetaan oletuspisteeksi väylän par
        if (change >= 1) {
            const newScore = playerScore.map((s, i) =>
                i === newHole - 1 ? course.pars[newHole - 1].par : s
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
            var realStrokes = strokes
            return realStrokes + change
        })
        setPlayerScore(newScore)
    }

    // Kierroksen lopetus
    const handleFinishRound = () => {
        saveScore(course, playerScore, currentTime)
    }

    // Lasketaan pelattujen väylien lyönnit yhteen
    const countTotalScore = () => {
        return playerScore.reduce((a, b) => {
            if (isNaN(b)) return a
            return a + b
        }, 0)
    }
    // Lasketaan suhteellinen tulos pelatuille väylille
    const countRelativeScore = () => {
        return playerScore.reduce((a, b, index) => {
            if (isNaN(b)) return a
            return a + b - course.pars[index].par
        }, 0)
    }
    // Muuta nätimpään muotoon suhteellinen tulos
    const formalizeRelativeScore = score => {
        if (score === 0) return 'E'
        if (score > 0) return '+' + score
        return score
    }

    return (
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
                    <div>Hole: {currentHole}</div>
                    <div>Par: {course.pars[currentHole - 1].par}</div>
                    <div>
                        Score: {countTotalScore()} (
                        {formalizeRelativeScore(countRelativeScore())})
                    </div>
                </div>
                <button onClick={handleDecreaseCurrentHole}>&lt;</button>
                <button onClick={handleIncreaseCurrentHole}>&gt;</button>
            </div>
        </div>
    )
}

export default Gameplay
