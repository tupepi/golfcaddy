// Tämä tiedosto vastaa pelattuihin kierroksiin liittyvistä http-pyynnöistä
const router = require('express').Router()
const User = require('../models/user.js')
//const Course = require('../models/course.js')
const Round = require('../models/round.js')

// eri http-pyyntöjen käsittelijät
// Palauttaa kaikki kierrokset
router.get('/', async (req, res) => {
    // rounds sisältää kaikki tietokannassa olevat kierrokset
    const rounds = await Round.find({})
        .populate('player', {
            username: 1,
        })
        .populate('course', { name: 1 })
    res.json(rounds)
})

// Palauttaa id:tä vastaavan kierroksen
router.get('/:id', async (req, res) => {
    // round sisältää id:tä vastaavan kierroksen
    const round = await Round.findById(req.params.id.toString())
    res.json(round)
})

// Lisää annetun kierroksen tietokantaan sekä pelaajan tietoihin
router.post('/', async (req, res) => {
    const newRound = new Round(req.body)
    // tallennetaan, varmistetaan että tallennus on ohi
    const savedRound = await newRound.save()
    // haetaan pelaaja ja lisätään hänen kierroksiin juuri tallennettu
    const player = await User.findById(savedRound.player)
    player.rounds = player.rounds.concat(savedRound._id)
    await player.save()
    // vastataan pyytäjälle
    res.status(201).json(savedRound)
})

// Muokkaa id:tä vastaavaa kierrosta
router.put('/:id', async (req, res) => {
    const round = req.body
    const updatedRound = await Round.findByIdAndUpdate(req.params.id, round, {
        new: true,
    })
    res.json(updatedRound.toJSON())
})

// Poistaa id:tä vastaavan kierroksen
router.delete('/:id', async (req, res) => {
    const round = await Round.findById(req.params.id)
    const player = await User.findById(round.player)
    // filteröidään pelaajan kierroksista pois poistettava
    player.rounds = player.rounds.filter(r => {
        return r._id.toString() !== round._id.toString()
    })
    await round.remove()
    await player.save()
    res.status(204).end()
})

module.exports = router
