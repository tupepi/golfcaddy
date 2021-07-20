const Mainmenu = ({ enterScorecards, enterNewGame, enterCourses }) => {
    return (
        <div className='Mainmenu'>
            <h1>GolfCaddy</h1>
            <div className='mainMenuButtons'>
                <button onClick={enterNewGame}>New game</button>
                <button>Resume game</button>
                <button onClick={enterCourses}>Courses</button>
                <button onClick={enterScorecards}>Scorecards</button>
            </div>
        </div>
    )
}

export default Mainmenu
