/* Tämä tiedosto on backend ohjelman aloituspiste

*/
const courseRouter = require('./routers/courses.js')
const userRouter = require('./routers/users.js')
const roundRouter = require('./routers/rounds.js')
const loginRouter = require('./routers/login.js')
const express = require('express')
const app = express()
const mongoose = require('mongoose')
require('dotenv').config() // dotenv:in avulla ei tarvitse komentoriviltä välittää tietokannan kirjautumistietoja vaan ".env"-tiedostosta
const cors = require('cors')

// Tietokanta
// yhdistetään tietokantaan
const mongoURL = process.env.mongoURL
mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

const port = process.env.PORT || 3001 // portin numero

app.use(cors())
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
