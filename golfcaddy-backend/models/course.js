const mongoose = require('mongoose') // tietokanta yhteyden kontrollointiin
// Luodaan skeema radalle, toistaiseksi vain nimi ja väylien par:it
const courseSchema = new mongoose.Schema({
    // radan nimi
    name: String,
    // radan par-lukemat
    pars: [{ par: Number }],
})

mongoose.set('useFindAndModify', false)
const Course = mongoose.model('Course', courseSchema)
module.exports = Course
