/* Luo listauksen pelaajan pelaamista kierroksista */
import Scorecard from './Scorecard'
import { useEffect, useState } from 'react'
import styles from '../styles/Scorecards.module.css'
import functions from '../functions.js'
const Scorecards = ({ enter, rounds, deleteRound }) => {
    const [sortedRounds, setSortedRounds] = useState([])
    const [isSortedByDate, setIsSortedByDate] = useState(true)
    const handleClickRound = async r => {
        enter(
            <Scorecard
                scorecard={r}
                deleteScorecard={() => deleteScorecard(r)}
            ></Scorecard>
        )
    }

    // Oletuksena kierrokset lajitellaan radan mukaan
    useEffect(() => {
        setSortedRounds(sortByDate(rounds))
    }, [rounds])

    // palauttaa kierrokset lajiteltuna radan mukaan
    const sortByCourse = rounds => {
        const roundsToSort = [...rounds]
        return roundsToSort.sort((a, b) => {
            var nameA = a.course.name.toUpperCase()
            var nameB = b.course.name.toUpperCase()
            if (nameA < nameB) {
                return -1
            }
            if (nameA > nameB) {
                return 1
            }
            return 0
        })
    }

    // palauttaa kierrokset lajiteltuna päivämäärän mukaan
    const sortByDate = rounds => {
        const roundsToSort = [...rounds]
        return roundsToSort.sort((a, b) => {
            var dateA = a.date
            var dateB = b.date
            if (dateA < dateB) {
                return 1
            }
            if (dateA > dateB) {
                return -1
            }
            return 0
        })
    }

    const deleteScorecard = scorecard => {
        deleteRound(scorecard._id)
    }

    return (
        <div className={styles.Scorecards}>
            {isSortedByDate ? (
                <button
                    className='rightTopCorner'
                    onClick={() => {
                        setSortedRounds(sortByDate(rounds))
                        setIsSortedByDate(!isSortedByDate)
                    }}
                >
                    Sort by date
                </button>
            ) : (
                <button
                    className='rightTopCorner'
                    onClick={() => {
                        setSortedRounds(sortByCourse(rounds))
                        setIsSortedByDate(!isSortedByDate)
                    }}
                >
                    Sort by course
                </button>
            )}
            <h1>Scorecards</h1>
            <div className={styles.scorecardListingDiv}>
                {sortedRounds.map(r => (
                    <div
                        key={r.date + r.player._id}
                        onClick={() => handleClickRound(r)}
                        className={styles.roundInfo}
                    >
                        {r.course.name}
                        <br></br>
                        {functions.formaliziteDate(r.date)}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Scorecards
