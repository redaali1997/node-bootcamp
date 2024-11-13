const { body } = require("express-validator")

const validationSchema = () => {
    return [
        body('name')
            .notEmpty().withMessage('Name is required')
            .isLength({ min: 2 }).withMessage('Length must be more than 2 chars'),
        body('price')
            .notEmpty()
            .isNumeric()
    ]
}

module.exports = {
    validationSchema
}