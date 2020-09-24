const User = require('./user.model');

exports.createUser =async (userData) => {
    try{
        await newUser.create(userData);
        return true;
    }
    catch(err){
        throw Error(`Failed to create user: ${err}`)
    }
}