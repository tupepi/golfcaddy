const NewGame = ({ exitNewGame }) => {
    return (
        <div className='NewGame'>
            <h2>New Game</h2>
            <button onClick={exitNewGame}>back</button>
        </div>
    )
}

export default NewGame
