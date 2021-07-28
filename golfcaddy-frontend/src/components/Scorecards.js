/* Luo listauksen pelaajan pelaamista kierroksista */
const Scorecards = ({ exit }) => {
    return (
        <div className='Scorecards'>
            <h2>Scorecards</h2>
            <button className='backButton' onClick={exit}>
                back
            </button>
        </div>
    )
}

export default Scorecards
