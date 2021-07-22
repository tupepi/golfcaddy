/* Luo listauksen pelaajan pelaamista kierroksista */
const Scorecards = ({ exitScorecards }) => {
    return (
        <div className='Scorecards'>
            <h2>Scorecards</h2>
            <button onClick={exitScorecards}>back</button>
        </div>
    )
}

export default Scorecards
