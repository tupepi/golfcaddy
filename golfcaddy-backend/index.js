/* Tämä tiedosto on backend ohjelman aloituspiste

Tällä hetkellä expressin dokumentaation 
aloitusesimerkki https://expressjs.com/en/starter/hello-world.html

*/
const express = require('express') // http-sovelluksen toteuttamiseen
const mongoose = require('mongoose') // tietokanta yhteyden kontrollointiin
require('dotenv').config() // dotenv:in avulla ei tarvitse komentoriviltä välittää tietokannan kirjautumistietoja vaan ".env"-tiedostosta

// Tietokanta
// ---------------------------------------------------------------------------------------------
// yhdistetään tietokantaan
const mongoURL = process.env.mongoURL
mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
// Luodaan skeema radalle, toistaiseksi vain nimi ja väylien par:it
const courseSchema = new mongoose.Schema({
    name: String,
    pars: [{ par: Number }],
})
const Course = mongoose.model('Course', courseSchema)
// ---------------------------------------------------------------------------------------------

// http
//------------------------------------------------------------------------------------------------
const app = express() // express-instanssi
const port = 3000 // portin numero

//luodaan testirata
const courseSippulanniemi = new Course({
    name: 'Jyväs-Golf',
    pars: [
        { par: 3 },
        { par: 4 },
        { par: 4 },
        { par: 4 },
        { par: 4 },
        { par: 3 },
        { par: 4 },
        { par: 4 },
        { par: 5 },
    ],
})

//tallennetaan rata tietokantaan ja palautetaan
courseSippulanniemi.save()

// eri http-pyyntöjen käsittelijät
app.get('/', async (req, res) => {
    // courses sisältää kaikki tietokannassa olevat radat
    const courses = await Course.find({})
    res.json(courses)
})

app.get('/:id', async (req, res) => {
    // course sisältää id:tä vastaavan radan
    const course = await Course.findOne({ _id: req.params.id })
    res.json(course)
})

app.post('/', async (req, res) => {
    // luodaan pyynnön mukana tulleesta oliosta rata
    const newCourse = new Course(req.body)
    // tallennetaan, varmistetaan että tallennus on ohi
    const savedCourse = await newCourse.save()
    // vastataan pyytäjälle
    res.status(201).json(savedCourse)
})

app.put('/user', (req, res) => {
    res.send('Got a PUT request at /user')
})

app.delete('/user', (req, res) => {
    res.send('Got a DELETE request at /user')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

//------------------------------------------------------------------------------------------------
