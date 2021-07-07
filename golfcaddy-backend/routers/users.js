// Tämä tiedosto vastaa käyttäjiin liittyvistä http-pyynnöistä
const router = require('express').Router()
const User = require('../models/user.js')

// eri http-pyyntöjen käsittelijät
router.get('/', async (req, res) => {
    // users sisältää kaikki tietokannassa olevat käyttäjät
    const users = await User.find({})
    res.json(users)
})

router.get('/:id', async (req, res) => {
    // user sisältää id:tä vastaavan käyttäjän
    const user = await User.findById(req.params.id.toString())
    res.json(URLSearchParams)
})

router.post('/', async (req, res) => {
    // luodaan pyynnön mukana tulleesta oliosta käyttäjä
    const newUser = new User(req.body)
    // tallennetaan, varmistetaan että tallennus on ohi
    const savedUser = await newUser.save()
    // vastataan pyytäjälle
    res.status(201).json(savedUser)
})

module.exports = router
