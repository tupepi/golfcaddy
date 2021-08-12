/* Näyttää yhden pelatun kierroksen tiedot */

const Scorecard = ({ scorecard }) => {
    return scorecard ? (
        <div className='Scorecard'>
            <h2>Scorecard</h2>
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
                        <tr key={i}>
                            <td>{i + 1}</td>
                            <td>{scorecard.course.pars[i].par}</td>
                            <td>{s}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    ) : null
}

export default Scorecard
