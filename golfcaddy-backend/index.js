/* Tämä tiedosto on backend ohjelman aloituspiste

*/
const courseRouter = require('./routers/courses.js')
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
app.use('/courses', courseRouter)

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
