// Tämä tiedosto vastaa käyttäjiin liittyvistä http-pyynnöistä
const router = require('express').Router() // http-pyyntöjen käsittelyyn
const User = require('../models/user.js') //  Käyttäjä-instanssien hallintaan
const bcrypt = require('bcrypt') // salasanan hashaamiseen

// eri http-pyyntöjen käsittelijät
// Lisää käyttäjän
router.post('/', async (req, res) => {
    // body sisältää käyttäjän luomiseen tarvittavat tiedot
    const { password, rounds, username } = req.body

    // Jos käyttäjä nimi on alle 3 merkkiä pitkä
    if (username.length < 3) {
        return res.status(400).json({ error: 'Username is too short' })
    }
    // Jos salasana on alle 3 merkkiä pitkä
    if (password.length < 3) {
        return res.status(400).json({ error: 'Password is too short' })
    }
    // Jos löytyy jo käyttäjä annetulla nimellä, tehdään poikkeus
    const usernameExists = await User.find({ username: username })
    if (usernameExists.length > 0) {
        return res.status(409).json({ error: 'Username is already used' })
    }

    // hashataan salasana
    const passwordHash = await bcrypt.hash(password, 10)
    // Jos rounds on olemassa käytetään sitä, muutoin tyhjää listaa
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
/* // Palauttaa kaikki käyttäjät
router.get('/', async (req, res) => {
    // users sisältää kaikki tietokannassa olevat käyttäjät
    const users = await User.find({})
    res.json(users)
}) */
/* 
// Palauttaa id:tä vastaavan käyttäjän
router.get('/:id', async (req, res) => {
    // user sisältää id:tä vastaavan käyttäjän
    const user = await User.findById(req.params.id.toString())
    res.json(user)
}) */
/* // Muokkaa id:tä vastaavaa käyttäjää
router.put('/:id', async (req, res) => {
    const user = req.body
    const updatedUser = await User.findByIdAndUpdate(req.params.id, user, {
        new: true,
    })
    res.json(updatedUser.toJSON())
}) */
module.exports = router
