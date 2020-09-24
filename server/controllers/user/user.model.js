const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        index: { unique: true }
    },
    password: String,
    name: String
});
const UserModel = mongoose.model('User', UserSchema, 'users');
module.exports = UserModel;