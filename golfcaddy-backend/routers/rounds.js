// Tämä tiedosto vastaa pelattuihin kierroksiin liittyvistä http-pyynnöistä
const router = require('express').Router()
const User = require('../models/user.js')
//const Course = require('../models/course.js')
const Round = require('../models/round.js')

// eri http-pyyntöjen käsittelijät
router.get('/', async (req, res) => {
    // rounds sisältää kaikki tietokannassa olevat kierrokset
    const rounds = await Round.find({})
    res.json(rounds)
})

router.get('/:id', async (req, res) => {
    // round sisältää id:tä vastaavan kierroksen
    const round = await Round.findById(req.params.id.toString())
    res.json(round)
})

router.post('/', async (req, res) => {
    const newRound = new Round(req.body)
    // tallennetaan, varmistetaan että tallennus on ohi
    const savedCourse = await newCourse.save()
    // haetaan pelaaja ja lisätään hänen kierroksiin juuri tallennettu
    const player = await User.findById(savedCourse.player)
    player.rounds = player.rounds.concat(savedCourse._id)
    await player.save()
    // vastataan pyytäjälle
    res.status(201).json(savedRound)
})

module.exports = router
