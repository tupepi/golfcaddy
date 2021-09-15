// Tämä tiedosto vastaa ratoihin liittyvistä http-pyynnöistä
const router = require('express').Router() // http-pyyntöjen käsittelyyn
const Course = require('../models/course.js') // rata-instanssien käsittelyyn

// eri http-pyyntöjen käsittelijät
// palauttaa kaikki radat
router.get('/', async (req, res) => {
    // courses sisältää kaikki tietokannassa olevat radat
    const courses = await Course.find({})
    res.json(courses)
})

// palauttaa id:tä vastaavan radan
router.get('/:id', async (req, res) => {
    // course sisältää id:tä vastaavan radan
    const course = await Course.findById(req.params.id.toString())
    res.json(course)
})

// lähettää annetun radan tietokantaan
router.post('/', async (req, res) => {
    // Radan nimen tulee olla uniikki
    const courses = await Course.find({ name: req.body.name })
    if (courses.length > 0) {
        return res.status(400).json({ error: 'Course with same name exists' })
    }
    // luodaan pyynnön mukana tulleesta oliosta rata
    const newCourse = new Course(req.body)
    // tallennetaan, varmistetaan että tallennus on ohi
    const savedCourse = await newCourse.save()
    // vastataan pyytäjälle
    res.status(201).json(savedCourse)
})

// muokkaa annettua id:tä vastaavaa rataa
router.put('/:id', async (req, res) => {
    const course = req.body
    const updatedCourse = await Course.findByIdAndUpdate(
        req.params.id,
        course,
        {
            new: true,
        }
    )
    // palautetaan päivitetty rata
    res.json(updatedCourse.toJSON())
})

// Poistaa annetun radan
router.delete('/:id', async (req, res) => {
    const course = await Course.findById(req.params.id)
    await course.remove()
    res.status(204).end()
})

module.exports = router
