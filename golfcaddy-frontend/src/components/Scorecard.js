/* Näyttää yhden pelatun kierroksen tiedot */
import styles from '../styles/Scorecard.module.css'
import functions /* { countTotalScore, countFormalRelativeScore } */ from '../functions.js'
const Scorecard = ({ scorecard, deleteScorecard }) => {
    return scorecard ? (
        <div className={styles.scorecard}>
            <h2>
                {scorecard.course.name}
                <br></br>
                {functions.formaliziteDate(scorecard.date)}
            </h2>
            <button onClick={deleteScorecard} className={styles.deleteButton}>
                Delete scorecard
            </button>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Hole</th>
                            <th>Par</th>
                            <th>Strokes</th>
                        </tr>
                    </thead>
                    <tbody>
                        {scorecard.score.map((s, i) => (
                            <tr className={styles.scorecardRow} key={i}>
                                <td>{i + 1}</td>
                                <td>{scorecard.course.pars[i].par}</td>
                                <td>{s ? s : '-'}</td>
                            </tr>
                        ))}
                        <tr className={styles.scorecardRow} key='total'>
                            <td>
                                <b>total</b>
                            </td>
                            <td>{functions.countPar(scorecard)}</td>
                            <td>
                                {functions.countTotalScore(scorecard.score)} (
                                {functions.countFormalRelativeScore(
                                    scorecard.score,
                                    scorecard.course.pars
                                )}
                                )
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    ) : null
}

export default Scorecard
