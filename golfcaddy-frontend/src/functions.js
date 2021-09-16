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

// par radalle
const countCoursePar = scorecard => {
    var totalPar = 0
    scorecard.course.pars.map(par => {
        return (totalPar += par.par)
    })
    return totalPar
}

const formaliziteDate = dateToFormalizite => {
    const dateAndTime = dateToFormalizite.split('T')
    const date = dateAndTime[0].split('-')
    const time = dateAndTime[1].split('.')[0].split(':')
    const h = parseInt(time[0], 0) + 3
    const m = time[1]
    const s = time[2]
    return date[2] + '/' + date[1] + '/' + date[0] + ' ' + h + ':' + m + ':' + s
}
const functions = {
    countRelativeScore,
    formalizeRelativeScore,
    countTotalScore,
    countFormalRelativeScore,
    countPar,
    formaliziteDate,
    countCoursePar,
}
export default functions
