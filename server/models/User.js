const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        unique: true,
        default: ''
    },
    email: {
        type: String,
        required: true,
        unique: true,
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
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    profileImage: {
        type: String,
        required: true,
        default: 'https://cdn.pixabay.com/photo/2016/08/31/11/54/user-1633249_1280.png'
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
UserSchema.index({ email: 1, username: 1 }, { unique: true, sparse: true })
const User = mongoose.model('User', UserSchema);
module.exports = User;