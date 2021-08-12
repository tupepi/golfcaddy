/* Luo listauksen pelaajan pelaamista kierroksista */
import Scorecard from './Scorecard'
const Scorecards = ({ enter, rounds }) => {
    const handleClickRound = async r => {
        enter(<Scorecard scorecard={r}></Scorecard>)
    }

    return (
        <div className='Scorecards'>
            <h2>Scorecards</h2>
            <div className='scorecardListingDiv'>
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
