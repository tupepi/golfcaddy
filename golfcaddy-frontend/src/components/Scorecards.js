/* Luo listauksen pelaajan pelaamista kierroksista */
/* import { useState, useEffect } from 'react' */
const Scorecards = ({ exit, rounds }) => {
    return (
        <div className='Scorecards'>
            <h2>Scorecards</h2>
            <div className='scorecardListingDiv'>
                {rounds.map(r => (
                    <div key={r.date + r.player._id} onClick={() => null}>
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
