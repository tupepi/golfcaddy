/* Tämä tiedosto on backend ohjelman aloituspiste
 */
// http-pyyntöjen käsittelijät
const courseRouter = require('./routers/courses.js')
const userRouter = require('./routers/users.js')
const roundRouter = require('./routers/rounds.js')
const loginRouter = require('./routers/login.js')

const express = require('express') // Tämän avulla http pyyntöjen mukana tuleva data muunnetaan jsonista js-olioksi
const app = express() // itse sovellus
const mongoose = require('mongoose') // tietokanta yhteyden luomiseen
require('dotenv').config() // dotenv:in avulla ei tarvitse komentoriviltä välittää tietokannan kirjautumistietoja vaan ".env"-tiedostosta
const cors = require('cors') // sallii käyttöliittymän ja palvelimen kommunikoinnin

// Tietokanta
// yhdistetään tietokantaan
const mongoURL = process.env.mongoURL
mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

const port = process.env.PORT || 3001 // portin numero
/* app.use(express.static('build')) // kun halutaan käyttää käyttöliittymän buildia */
app.use(cors()) // corsin käyttöön otto
app.use(express.json()) // pyyntöjen mukana tuleva Json-data muunnetaan js-olioksi

// Otetaan käyttöön eri polkujen http-pyyntöjen käsittelijät
app.use('/api/courses', courseRouter)
app.use('/api/users', userRouter)
app.use('/api/rounds', roundRouter)
app.use('/api/login', loginRouter)

// Käynnistetään sovellus
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
