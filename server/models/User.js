const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['User', 'Admin'],
        required: true,
        default: 'User'
    },
    date: {
        type: Date,
        default: Date.now()
    }
})
UserSchema.pre('save', function (next) {
    if (!this.isModified('password'))
        return next()
    bcrypt.hash(this.password, 10, (err, passwordHash) => {
        this.password = passwordHash
        next()
    })

})
UserSchema.methods.comparePassword = function (password, cb) {
    bcrypt.compare(password, this.password, (err, isMatch) => {
        if (err)
            return cb(err)
        else {
            if (!isMatch)
                return cb(null, isMatch)
            return cb(null, this)
        }

    })
}
const User = mongoose.model('User', UserSchema);
module.exports = User;