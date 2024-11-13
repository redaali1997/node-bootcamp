const express = require('express')
const { validationSchema } = require('../middlewares/validationSchema')

const courseController = require('../controllers/course.controller')

const router = express.Router()

router.route('/')
    .get(courseController.all)
    .post(validationSchema(), courseController.store)

router.route('/:courseId')
    .get(courseController.show)
    .patch(courseController.update)
    .delete(courseController.destroy)

module.exports = router