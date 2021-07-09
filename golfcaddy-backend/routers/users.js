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
    res.json(user)
})

router.post('/', async (req, res) => {
    // luodaan pyynnön mukana tulleesta oliosta käyttäjä
    const newUser = new User(req.body)
    // tallennetaan, varmistetaan että tallennus on ohi
    const savedUser = await newUser.save()
    // vastataan pyytäjälle
    res.status(201).json(savedUser)
})

router.put('/:id', async (req, res) => {
    const user = req.body
    const updatedUser = await User.findByIdAndUpdate(req.params.id, user, {
        new: true,
    })
    res.json(updatedUser.toJSON())
})
module.exports = router
