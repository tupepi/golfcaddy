/* Tämä tiedosto on backend ohjelman aloituspiste

Tällä hetkellä expressin dokumentaation 
aloitusesimerkki https://expressjs.com/en/starter/hello-world.html

*/
const express = require('express')
const mongoose = require('mongoose')
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

// eri http-pyyntöjen käsittelijät
app.get('/', (req, res) => {
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
    courseSippulanniemi.save().then(() => res.send(courseSippulanniemi))
})

app.post('/', (req, res) => {
    res.send('Got a POST request')
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
