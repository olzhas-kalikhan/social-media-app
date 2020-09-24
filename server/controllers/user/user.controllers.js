const UserService = require('./user.services');

exports.createUser = async (req, res, next) => {
    try {
        let userCreated = false;
        if (req.body) {
            userCreated = await UserService.createUser(req.body);
            return res.status(200).json({ status: 200, data: req.body, message: userCreated })
        }
    } catch (err) {
        return res.status(400).json({ status: 400, message: err.message })
    }
}