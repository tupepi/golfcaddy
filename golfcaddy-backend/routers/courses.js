// Tämä tiedosto vastaa ratoihin liittyvistä http-pyynnöistä
const router = require('express').Router()
const Course = require('../models/course.js')
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

//tallennetaan rata tietokantaan
courseSippulanniemi.save()

// eri http-pyyntöjen käsittelijät
router.get('/', async (req, res) => {
    // courses sisältää kaikki tietokannassa olevat radat
    const courses = await Course.find({})
    res.json(courses)
})

router.get('/:id', async (req, res) => {
    // course sisältää id:tä vastaavan radan
    const course = await Course.findById(req.params.id.toString())
    res.json(course)
})

router.post('/', async (req, res) => {
    // luodaan pyynnön mukana tulleesta oliosta rata
    const newCourse = new Course(req.body)
    // tallennetaan, varmistetaan että tallennus on ohi
    const savedCourse = await newCourse.save()
    // vastataan pyytäjälle
    res.status(201).json(savedCourse)
})

router.put('/user', (req, res) => {
    res.send('Got a PUT request at /user')
})

router.delete('/user', (req, res) => {
    res.send('Got a DELETE request at /user')
})

module.exports = router
