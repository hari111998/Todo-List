const { Router } = require('express')
const { Todos , Notes} = require('../database')

const route = Router()

route.get('/', async (req, res) => {
  const todos = await Todos.findAll()
  res.send(todos)
})










route.get('/:id', async (req, res) => {
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








route.post('/', async (req, res) => {
  if (typeof req.body.title !== 'string') {
    return res.status(400).send({ error: 'Task name not provided' })
  }
  if (req.body.status === 'true') {
    req.body.status = true
  } else {
    req.body.status = false
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








route.patch('/:id', async(req, res) =>{
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
    todo.title= req.body.title
    todo.description= req.body.description
    todo.dueDate= req.body.dueDate
    todo.status= req.body.status
    todo.priority= req.body.priority
    await todo.save()
    res.status(201).send({ success: 'Task Updated', data: newTodo })
})




route.get('/:id/notes',async (req, res)=>{
    if (isNaN(Number(req.params.id))) {
        return res.status(400).send({
          error: 'todo id must be an integer',
        })
      }
    const notes = await Notes.findAll({
        where : { todoId: req.params.id }
    })
    if (!notes) {
        return res.status(404).send({
          error: 'No Notes found'
        })
      }
      res.send(notes)
})



route.post('/:id/notes', async(req,res)=>{
    if (isNaN(Number(req.params.id))) {
        return res.status(400).send({
          error: 'todo id must be an integer',
        })
      }
    const note = await Notes.create({
        todoId:req.body.todoId,
        value:req.body.value
    })

    res.status(201).send({ success: 'New note added', data: note })

})

module.exports = route
