const {
    validationResult
} = require('express-validator');
const categoryValidator = require('../utils/validators/categoryValidator');

const validatorMiddleware = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }
    next();
}

module.exports = validatorMiddleware;