const { validationResult } = require('express-validator')
let courses = require('../data/courses')

const all = (req, res) => {
    res.status(200).json(courses)
}

const show = (req, res) => {
    const course = courses.find(course => course.id == req.params.courseId)

    if (!course) res.status(404).json({ msg: 'course not found' })

    res.json(course)
}

const store = (req, res) => {
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
}

const update = (req, res) => {
    let course = courses.find(course => course.id == req.params.courseId)

    if (!course) return res.status(404).json({ msg: 'course not found' })

    course = {
        ...course,
        ...req.body
    }

    return res.status(200).json(course)
}

const destroy = (req, res) => {
    courses = courses.filter(course => course.id != req.params.courseId)

    return res.status(200).json(courses)
}

module.exports = {
    all,
    show,
    store,
    update,
    destroy
}