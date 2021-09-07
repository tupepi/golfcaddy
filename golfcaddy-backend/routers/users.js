// Tämä tiedosto vastaa käyttäjiin liittyvistä http-pyynnöistä
const router = require('express').Router()
const User = require('../models/user.js')
const bcrypt = require('bcrypt') //

// eri http-pyyntöjen käsittelijät
// Palauttaa kaikki käyttäjät
router.get('/', async (req, res) => {
    // users sisältää kaikki tietokannassa olevat käyttäjät
    const users = await User.find({})
    res.json(users)
})

// Palauttaa id:tä vastaavan käyttäjän
router.get('/:id', async (req, res) => {
    // user sisältää id:tä vastaavan käyttäjän
    const user = await User.findById(req.params.id.toString())
    res.json(user)
})

// Lisää käyttäjän
router.post('/', async (req, res) => {
    const { password, rounds, username } = req.body

    // Jos käyttäjä nimi on alle 3 merkkiä pitkä
    if (username.length < 3) {
        return res.status(400).json({ error: 'Username is too short' })
    }
    if (password.length < 3) {
        return res.status(400).json({ error: 'Password is too short' })
    }
    // Jos löytyy jo käyttäjä annetulla nimellä, tehdään poikkues
    const usernameExists = await User.find({ username: username })
    if (usernameExists.length > 0) {
        return res.status(409).json({ error: 'Username is already used' })
    }

    // hashataan salasana
    const passwordHash = await bcrypt.hash(password, 10)
    var userRounds = []
    if (rounds) {
        userRounds = rounds
    }

    // luodaan pyynnön mukana tulleesta oliosta käyttäjä
    const newUser = new User({
        username,
        userRounds,
        passwordHashed: passwordHash,
    })

    // tallennetaan, varmistetaan että tallennus on ohi
    const savedUser = await newUser.save()
    // vastataan pyytäjälle
    res.status(201).json(savedUser)
})

// Muokkaa id:tä vastaavaa käyttäjää
router.put('/:id', async (req, res) => {
    const user = req.body
    const updatedUser = await User.findByIdAndUpdate(req.params.id, user, {
        new: true,
    })
    res.json(updatedUser.toJSON())
})
module.exports = router
