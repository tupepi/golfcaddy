/* Luo listauksen pelaajan pelaamista kierroksista */
import Scorecard from './Scorecard'

import styles from '../styles/Scorecards.module.css'
const Scorecards = ({ enter, rounds }) => {
    const handleClickRound = async r => {
        enter(<Scorecard scorecard={r}></Scorecard>)
    }
    const formaliziteDate = dateToFormalizite => {
        const dateAndTime = dateToFormalizite.split('T')
        const date = dateAndTime[0].split('-')
        const time = dateAndTime[1].split('.')[0].split(':')
        const h = parseInt(time[0], 0) + 3
        const m = time[1]
        const s = time[2]
        return (
            date[2] +
            '/' +
            date[1] +
            '/' +
            date[0] +
            ' ' +
            h +
            ':' +
            m +
            ':' +
            s
        )
    }
    return (
        <div className={styles.Scorecards}>
            <h1>Scorecards</h1>
            <div className={styles.scorecardListingDiv}>
                {rounds.map(r => (
                    <div
                        key={r.date + r.player._id}
                        onClick={() => handleClickRound(r)}
                    >
                        {r.course.name}
                        <br></br>
                        {formaliziteDate(r.date)}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Scorecards
