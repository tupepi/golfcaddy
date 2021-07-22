/* Gameplay-komponentti vastaa pelin aikaisesta pisteiden kirjanpidosta */
import { useState } from 'react'
const Gameplay = course => {
    const [currentHole, setCurrentHole] = useState(1)
    const [playerScore, setPlayerScore] = useState(
        course.course.pars.map(p => p.par)
    )
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
        if (currentHole === course.course.pars.length && change > 0) return
        setCurrentHole(currentHole + change)
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
        const newScore = playerScore.map((strokes, i) =>
            i === currentHole - 1 ? strokes + change : strokes
        )
        setPlayerScore(newScore)
    }

    return (
        <div>
            <div>
                <div>Par: {course.course.pars[currentHole - 1].par}</div>
                <div>Hole: {currentHole}</div>
                <button onClick={handleDecreaseCurrentHole}>&lt;</button>
                <button onClick={handleIncreaseCurrentHole}>&gt;</button>
            </div>
            <div>
                <div>Strokes: {playerScore[currentHole - 1]}</div>
                <button onClick={handleDecreaseScore}>&lt;</button>
                <button onClick={handleIncreaseScore}>&gt;</button>
            </div>
        </div>
    )
}

export default Gameplay
