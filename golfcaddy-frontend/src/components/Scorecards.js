/* Luo listauksen pelaajan pelaamista kierroksista */
import { useState, useEffect } from 'react'
import roundsService from '../services/rounds'
import coursesService from '../services/courses'
const Scorecards = ({ exit }) => {
    // Kaikki pelatut kierrokset listassa
    const [rounds, setRounds] = useState([])
    useEffect(() => {
        roundsService.getAll().then(rounds => setRounds(rounds))
    }, [])
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
