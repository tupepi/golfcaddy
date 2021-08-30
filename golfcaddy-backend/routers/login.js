const router = require('express').Router()
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const bcrypt = require('bcrypt') //
router.post('/', async (request, response) => {
    const body = request.body
    const user = await User.findOne({ username: body.username })
    var correctPassword = false
    if (user) {
        correctPassword = await bcrypt.compare(
            body.password,
            user.passwordHashed
        )
    }

    if (!correctPassword) {
        return response.status(401).json({
            error: 'invalid username or password',
        })
    }

    const userForToken = {
        username: user.username,
        _id: user._id,
    }

    const token = jwt.sign(userForToken, process.env.SECRET)

    response.status(200).send({ token, username: user.username, _id: user._id })
})

module.exports = router
