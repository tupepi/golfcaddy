// Tämä tiedosto vastaa ratoihin liittyvistä http-pyynnöistä
const router = require('express').Router()
const Course = require('../models/course.js')

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

router.put('/:id', async (req, res) => {
    const course = req.body
    const updatedCourse = await Course.findByIdAndUpdate(
        req.params.id,
        course,
        {
            new: true,
        }
    )
    res.json(updatedCourse.toJSON())
})

router.delete('/:id', async (req, res) => {
    const course = await Course.findById(req.params.id)
    await course.remove()
    res.status(204).end()
})

module.exports = router
