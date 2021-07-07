const mongoose = require('mongoose') // tietokanta yhteyden kontrollointiin
// Luodaan skeema radalle, toistaiseksi vain nimi ja väylien par:it
const courseSchema = new mongoose.Schema({
    name: String,
    pars: [{ par: Number }],
})
const Course = mongoose.model('Course', courseSchema)
module.exports = Course
