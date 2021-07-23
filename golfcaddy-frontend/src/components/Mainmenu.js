/* Päävalikko, tämän avulla kerrotaan App.js:lle mitä komponentteja näytetään/piilotetaan */
const Mainmenu = ({
    enterScorecards,
    enterNewGame,
    enterCourses,
    enterCurrentGame,
}) => {
    return (
        <div className='Mainmenu'>
            <h1>GolfCaddy</h1>
            <div className='mainMenuButtons'>
                <button onClick={enterNewGame}>New game</button>
                <button onClick={enterCurrentGame}>Resume game</button>
                <button onClick={enterCourses}>Courses</button>
                <button onClick={enterScorecards}>Scorecards</button>
            </div>
        </div>
    )
}

export default Mainmenu
