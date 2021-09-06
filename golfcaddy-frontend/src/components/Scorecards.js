/* Luo listauksen pelaajan pelaamista kierroksista */
import Scorecard from './Scorecard'

import styles from '../styles/Scorecards.module.css'
const Scorecards = ({ enter, rounds }) => {
    const handleClickRound = async r => {
        enter(<Scorecard scorecard={r}></Scorecard>)
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
                        {r.date}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Scorecards
