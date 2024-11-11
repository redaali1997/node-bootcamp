const express = require('express')
const { body, validationResult } = require('express-validator')

const app = express()

app.use(express.json())

const courses = [
    {
        id: 1,
        name: 'Javascript course',
        price: 800
    },
    {
        id: 2,
        name: 'Vue Course',
        price: 1000
    }
]
// get all courses
app.get('/api/courses', (req, res) => {
    res.status(200).json(courses)
})

// get single course
app.get('/api/courses/:courseId', (req, res) => {
    const course = courses.find(course => course.id == req.params.courseId)

    if (!course) res.status(404).json({ msg: 'course not found' })

    res.json(course)
})

app.post('/api/courses',
    [
        body('name')
            .notEmpty().withMessage('Name is required')
            .isLength({ min: 2 }).withMessage('Length must be more than 2 chars'),
        body('price')
            .notEmpty()
            .isNumeric()
    ], (req, res) => {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array())
        }

        const course = {
            id: courses.length + 1,
            ...req.body
        }
        courses.push(course)

        res.status(201).json(course)
    })

app.listen(5000, () => {
    console.log('listening on port 5000');
})