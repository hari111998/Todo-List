const { Router } = require('express')
const { Todos, Notes } = require('../database')

const route = Router()

route.get('/', async(req, res) => {
    const todos = await Todos.findAll()
    res.send(todos)
})










route.get('/:id', async(req, res) => {
    if (isNaN(Number(req.params.id))) {
        return res.status(400).send({
            error: 'todo id must be an integer',
        })
    }

    const todo = await Todos.findByPk(req.params.id)

    if (!todo) {
        return res.status(404).send({
            error: 'No todo found with id = ' + req.params.id,
        })
    }
    res.send(todo)
})








route.post('/', async(req, res) => {
    if (typeof req.body.title !== 'string' && req.body.title.length > 0) {
        return res.status(400).send({ error: 'Title not provided' })
    }
    if (typeof req.body.description !== 'string' && req.body.description.length > 0) {
        return res.status(400).send({ error: 'Description not provided' })
    }
    if (typeof req.body.priority !== 'string' && req.body.priority.length > 0) {
        return res.status(400).send({ error: 'Priority not provided' })
    }
    if (typeof req.body.status !== 'string' && req.body.status.length > 0) {
        return res.status(400).send({ error: 'Status not provided' })
    }

    const newTodo = await Todos.create({
        title: req.body.title,
        description: req.body.description,
        dueDate: req.body.dueDate,
        status: req.body.status,
        priority: req.body.priority,
    })

    res.status(201).send({ success: 'New task added', data: newTodo })
})








route.patch('/:id', async(req, res) => {
    console.log("\n\n\nReached "+77)
    if (isNaN(Number(req.params.id))) {
        return res.status(400).send({
            error: 'todo id must be an integer',
        })
    }
    if (typeof req.body.description !== 'string' && req.body.description.length > 0) {
        return res.status(400).send({ error: 'Description not provided' })
    }
    if (typeof req.body.priority !== 'string' && req.body.priority.length > 0) {
        return res.status(400).send({ error: 'Priority not provided' })
    }
    if (typeof req.body.status !== 'string' && req.body.status.length > 0) {
        return res.status(400).send({ error: 'status not provided' })
    }
    const todo = await Todos.findByPk(req.params.id)
    if (!todo) {
        return res.status(404).send({
            error: 'No todo found with id = ' + req.params.id,
        })
    }
    console.log("\n\n\nReached "+101)
    todo.description = req.body.description
    todo.dueDate = req.body.dueDate
    todo.status = req.body.status
    todo.priority = req.body.priority
    await todo.save()
    console.log("\n\n\nReached "+107)

    res.status(201).send({ success: 'Task Updated', data: todo })
})




route.get('/:id/notes', async(req, res) => {
    if (isNaN(Number(req.params.id))) {
        return res.status(400).send({
            error: 'todo id must be an integer',
        })
    }
    const notes = await Notes.findAll({
        where: { todoId: req.params.id }
    })
    if (!notes) {
        return res.status(404).send({
            error: 'No Notes found'
        })
    }
    res.send(notes)
})



route.post('/:id/notes', async(req, res) => {
    if (isNaN(Number(req.params.id))) {
        return res.status(400).send({
            error: 'todo id must be an integer',
        })
    }
    console.log("Reached 137")
    if (typeof req.body.note !== 'string' && req.body.note.length > 0) {
        return res.status(400).send({ error: 'note not provided' })
    }
    const note = await Notes.create({
        todoId: req.params.id,
        value: req.body.note
    })
    console.log("Reached 137")

    res.status(201).send({ success: 'New note added'})

})

module.exports = route