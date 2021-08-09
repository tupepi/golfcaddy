/* Luo listauksen pelaajan pelaamista kierroksista */
/* import { useState, useEffect } from 'react' */
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
                            <td>{0}</td>
                            <td>{s}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    ) : null
}

export default Scorecard
