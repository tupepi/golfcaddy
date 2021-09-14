// Kirjautumispyynnöistä vastaava tiedosto
const router = require('express').Router() // http-pyyntöjen käsittelyyn
const jwt = require('jsonwebtoken') // tokenin luomiseen
const User = require('../models/user') // käyttäjä-instanssien hallintaan
const bcrypt = require('bcrypt') // salasanan ja hashatun vertaamiseen
router.post('/', async (request, response) => {
    const body = request.body
    // body.username ja body.password ovat käyttäjän antamat kirjautumistiedot
    const user = await User.findOne({ username: body.username })
    // Muutetaan correctPassword -> true, jos löytyy käyttäjä JA annettu salasana on oikein
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

    /* käyttäjänimen, id:n ja "SECRET"-muuttujan avulla luodaan token */
    const userForToken = {
        username: user.username,
        _id: user._id,
    }
    const token = jwt.sign(userForToken, process.env.SECRET)

    response.status(200).send({ token, username: user.username, _id: user._id })
})

module.exports = router
