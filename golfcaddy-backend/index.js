/* Tämä tiedosto on backend ohjelman aloituspiste

*/
const courseRouter = require('./routers/courses.js')
const userRouter = require('./routers/users.js')
const roundRouter = require('./routers/rounds.js')
const express = require('express')
const app = express()
const mongoose = require('mongoose')
require('dotenv').config() // dotenv:in avulla ei tarvitse komentoriviltä välittää tietokannan kirjautumistietoja vaan ".env"-tiedostosta

// Tietokanta
// yhdistetään tietokantaan
const mongoURL = process.env.mongoURL
mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

const port = 3000 // portin numero

//
app.use(express.json()) // pyyntöjen mukana tuleva Json-data muunnetaan js-olioksi
// Otetaan käyttöön eri polkujen http-pyyntöjen käsittelijät
app.use('/courses', courseRouter)
app.use('/users', userRouter)
app.use('/rounds', roundRouter)

// Käynnistetään sovellus
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
