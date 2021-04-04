const { GeneralError } = require('../utils/erros');

const handleErrors = (err, req, res, next) => {
  
    if (err instanceof GeneralError) {
        return res.status(err.getCode()).json({
            status: 'error',
            name: err.name,
            message: err.message
        });
    }
  
    return res.status(500).json({
        status: 'error',
        name: err.name,
        message: err.message
    });
}


module.exports = handleErrors;