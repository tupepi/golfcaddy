// Lasketaan suhteellinen tulos pelatuille väylille
const countRelativeScore = (playerScore, coursePars) => {
    return playerScore.reduce((a, b, index) => {
        if (!b) return a
        return a + b - coursePars[index].par
    }, 0)
}

// Lasketaan suhteellinen tulos pelatuille väylille nätissä muodossa
const countFormalRelativeScore = (playerScore, coursePars) => {
    return formalizeRelativeScore(
        playerScore.reduce((a, b, index) => {
            if (!b) return a
            return a + b - coursePars[index].par
        }, 0)
    )
}

// Muuta nätimpään muotoon suhteellinen tulos
const formalizeRelativeScore = score => {
    /* Jos tulos on tasan par:issa näytetään E, muutoin etumerkin kanssa luku itse */
    if (score === 0) return 'E'
    if (score > 0) return '+' + score
    return score
}

// Lasketaan pelattujen väylien lyönnit yhteen
const countTotalScore = playerScore => {
    return playerScore.reduce((a, b) => {
        if (!b) return a
        return a + b
    }, 0)
}

// par "keskeneräiselle" kierrokselle
const countPar = scorecard => {
    var totalPar = 0
    scorecard.score.map((score, index) => {
        if (score === null) return totalPar
        return (totalPar += scorecard.course.pars[index].par)
    })
    return totalPar
}

const functions = {
    countRelativeScore,
    formalizeRelativeScore,
    countTotalScore,
    countFormalRelativeScore,
    countPar,
}
export default functions
