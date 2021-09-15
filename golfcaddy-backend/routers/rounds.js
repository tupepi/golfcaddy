// Tämä tiedosto vastaa pelattuihin kierroksiin liittyvistä http-pyynnöistä
const router = require('express').Router() // http-pyyntöjen käsittelyyn
const User = require('../models/user.js') // Käyttäjän tietoihin tallennetaan myös tieto pelatuista radoista
const jwt = require('jsonwebtoken') // käyttäjän oikeuksien tarkistamiseen
//const Course = require('../models/course.js')
const Round = require('../models/round.js') // Kierros-instanssin hallintaan

// Aliohjelma joka palauttaa käyttöliittymälle virheen, jos token ei ole kunnossa,
// Muutoin palauttaa aliohjelmalle käyttäjän id:n
const checkAuthorization = (req, res) => {
    const authorization = req.get('authorization')
    var token = null
    // authorization tulisi olla muotoa "bearer xxxxxxxxxxxxx", missä "xxxxxxxxxxxxx" on token
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        var token = authorization.substring(7)
    }
    // tarkistetaan oliko token oikein
    const decodedToken = jwt.verify(token, process.env.SECRET)
    // virhe, jos tokenia ei ollut tai se oli väärin
    if (!token || !decodedToken._id) {
        return res.status(401).json({ error: 'token missing or invalid' })
    }
    return decodedToken._id
}

// Palauttaa kaikki kierrokset, joissa käyttäjän id vastaa id:tä
router.get('/user/:id', async (req, res) => {
    // käyttäjän kierrokset saavat olla vain itsensä saatavilla joten tarkastetaan tokenilla oikeus
    const userId = checkAuthorization(req, res)

    // rounds sisältää kaikki tietokannassa olevat kierrokset
    const rounds = await Round.find({ player: { _id: userId } })
        .populate('player', {
            // Näytetään kierroksen tiedoissa käyttäjän id:n sijasta käyttäjän käyttäjänimi
            username: 1,
        })
        .populate('course', { name: 1, pars: 1 }) // Näytetään kierroksen tiedoissa radan id:n sijasta nimi ja lista pareista
    res.json(rounds)
})

// Lisää annetun kierroksen tietokantaan sekä pelaajan tietoihin
router.post('/', async (req, res) => {
    // käyttäjän kierrokset saavat olla vain itsensä saatavilla joten tarkastetaan tokenilla oikeus
    const userId = checkAuthorization(req, res)
    if (userId !== req.body.player) {
        return res.status(401)
    }

    // Ajankohdan tulee olla uniikki
    const rounds = await Round.find({ date: new Date(req.body.date) })
    if (rounds.length > 0) {
        return res
            .status(400)
            .json({ error: 'Scorecard with same date exists' })
    }

    const newRound = new Round(req.body)
    // tallennetaan, varmistetaan että tallennus on ohi
    const savedRound = await newRound.save()
    // haetaan pelaaja ja lisätään hänen kierroksiin juuri tallennettu
    const player = await User.findById(savedRound.player)
    player.rounds = player.rounds.concat(savedRound._id)
    await player.save()
    // vastataan pyytäjälle
    res.status(201).json(
        await savedRound
            .populate('player', {
                // Näytetään kierroksen tiedoissa käyttäjän id:n sijasta käyttäjän käyttäjänimi
                username: 1,
            })
            .populate('course', { name: 1, pars: 1 }) // Näytetään kierroksen tiedoissa radan id:n sijasta nimi ja lista pareista
            .execPopulate()
    )
})

// Poistaa id:tä vastaavan kierroksen
router.delete('/:id', async (req, res) => {
    const round = await Round.findById(req.params.id)
    // käyttäjän kierrokset saavat olla vain itsensä saatavilla joten tarkastetaan tokenilla oikeus
    const userId = checkAuthorization(req, res)
    if (userId.toString() !== round.player.toString()) {
        return res.status(401)
    }
    // Etsitään pelaaja, poistetaan kierros myös häneltä
    const player = await User.findById(round.player)
    // filteröidään pelaajan kierroksista pois poistettava
    player.rounds = player.rounds.filter(r => {
        return r._id.toString() !== round._id.toString()
    })
    await round.remove()
    await player.save()
    res.status(204).end()
})

// Muokkaa id:tä vastaavaa kierrosta, ei välttämättä tarpeellinen
/* router.put('/:id', async (req, res) => {
    const round = req.body
    const updatedRound = await Round.findByIdAndUpdate(req.params.id, round, {
        new: true,
    })
    res.json(updatedRound.toJSON())
}) */

// eri http-pyyntöjen käsittelijät
// Palauttaa kaikki kierrokset, ei välttämättä tarpeellinen
/* router.get('/', async (req, res) => {
    // rounds sisältää kaikki tietokannassa olevat kierrokset
    const rounds = await Round.find({})
        .populate('player', {
            username: 1,
        })
        .populate('course', { name: 1, pars: 1 })
        res.json(rounds)
}) */

// Palauttaa id:tä vastaavan kierroksen, ei välttämättä tarpeellinen
/* router.get('/:id', async (req, res) => {
    // round sisältää id:tä vastaavan kierroksen
    const round = await Round.findById(req.params.id.toString())
        res.json(round)
}) */
module.exports = router
