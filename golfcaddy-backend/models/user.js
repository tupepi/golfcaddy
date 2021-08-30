const mongoose = require('mongoose') // tietokanta yhteyden kontrollointiin
// Luodaan skeema käyttäjälle, toistaiseksi vain nimi ja pelatut kierrokset
const userSchema = new mongoose.Schema({
    username: String,
    // pelatut kierrokset
    rounds: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Round',
        },
    ],
    passwordHashed: String,
})

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        delete returnedObject.passwordHashed
    },
})

const User = mongoose.model('User', userSchema)
module.exports = User
