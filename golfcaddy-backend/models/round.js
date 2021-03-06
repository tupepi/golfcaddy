// rounds.js luo modelin, jonka avulla voidaan luoda kierrosinstansseja
const mongoose = require('mongoose') // tietokanta yhteyden kontrollointiin
// Luodaan skeema pelatulle kierrokselle
const roundSchema = new mongoose.Schema({
    // aloitusaika
    date: Date,
    // kierroksen pelaaja
    player: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    // kierretty rata
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
    },
    // saatu tulos
    score: [{ type: Number }],
})
const Round = mongoose.model('Round', roundSchema)
module.exports = Round
