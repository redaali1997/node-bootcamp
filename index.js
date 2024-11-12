const express = require('express')
const { body } = require('express-validator')
const courseController = require('./controllers/course.controller')

const app = express()

app.use(express.json())

// get all courses
app.get('/api/courses', courseController.all)

// get single course
app.get('/api/courses/:courseId', courseController.show)

// create new course
app.post('/api/courses', [
    body('name')
        .notEmpty().withMessage('Name is required')
        .isLength({ min: 2 }).withMessage('Length must be more than 2 chars'),
    body('price')
        .notEmpty()
        .isNumeric()
], courseController.store)

// update course
app.patch('/api/courses/:courseId', courseController.update)

// delete course
app.delete('/api/courses/:courseId', courseController.destroy)

app.listen(5000, () => {
    console.log('listening on port 5000');
})