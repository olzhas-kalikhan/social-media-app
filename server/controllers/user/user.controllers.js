const UserService = require('./user.services');
const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.createUser = async (req, res, next) => {
    if (req.body) {
        let user = {
            name: req.body.name,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, saltRounds)
        }
        UserService.createUser(user).then((response) => {
            return res.status(200).json({ status: 200, data: req.body, message: response })
        }).catch((err) => {
            return res.status(400).json({ status: 400, message: err.message })
        })
    }
    else {
        return res.status(400).json({ status: 400, message: 'Failed to read data' })
    }
}