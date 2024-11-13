const express = require('express')
const courseRouter = require('./routes/course.route')

const app = express()

app.use(express.json())

app.use('/api/courses', courseRouter)

app.listen(5000, () => {
    console.log('listening on port 5000');
})