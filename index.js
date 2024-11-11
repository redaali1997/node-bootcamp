const express = require('express')

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

app.post('/api/courses', (req, res) => {
    courses.push({
        id: courses.length + 1,
        ...req.body
    })

    res.status(201).json(courses)
})

app.listen(5000, () => {
    console.log('listening on port 5000');
})