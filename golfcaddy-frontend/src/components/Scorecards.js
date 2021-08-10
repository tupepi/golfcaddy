/* Luo listauksen pelaajan pelaamista kierroksista */
import { useState } from 'react'
import Scorecard from './Scorecard'
/* import { useState, useEffect } from 'react' */
const Scorecards = ({ exit, rounds }) => {
    const [scorecardToShow, setScorecardToShow] = useState(null)

    return scorecardToShow ? (
        <Scorecard scorecard={scorecardToShow}></Scorecard>
    ) : (
        <div className='Scorecards'>
            <h2>Scorecards</h2>
            <div className='scorecardListingDiv'>
                {rounds.map(r => (
                    <div
                        key={r.date + r.player._id}
                        onClick={() => setScorecardToShow(r)}
                    >
                        {r.course.name}
                        <br></br>
                        {r.date}
                    </div>
                ))}
            </div>
            <button className='backButton' onClick={exit}>
                back
            </button>
        </div>
    )
}

export default Scorecards
