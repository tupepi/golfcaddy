const router = require('express').Router()
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const bcrypt = require('bcrypt') //
router.post('/', async (request, response) => {
    const body = request.body
    // body.username ja body.password ovat käyttäjän antamat kirjautumistiedot
    const user = await User.findOne({ username: body.username })
    var correctPassword = false
    // Jos tietokannasta löytyi käyttäjä annetulla nimellä
    if (user) {
        // verrataan annettua salasanaa hashattuun salasanaan
        correctPassword = await bcrypt.compare(
            body.password,
            user.passwordHashed
        )
    }

    // Jos salasana edelleen väärin, tai käyttäjä ei ollut oikein
    if (!correctPassword) {
        return response.status(401).json({
            error: 'invalid username or password',
        })
    }

    /* käyttäjänimen, id:n ja "SECRET"-muutujan avulla luodaan token */
    const userForToken = {
        username: user.username,
        _id: user._id,
    }
    const token = jwt.sign(userForToken, process.env.SECRET)

    response.status(200).send({ token, username: user.username, _id: user._id })
})

module.exports = router
