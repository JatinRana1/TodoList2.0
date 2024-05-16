const Todo = require('../model/noteModel')

// get all notes Controller
const getAllNotes = async (req, res) => {
    try {
        const id = req.params.id
        const todos = await Todo.findAll({
            where: {
                userId: id
            }
        });
        res.json(todos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' })
    }
}

//get single note Controller
const getSingleNote = async(req, res) => {
    try {
        const { id } = req.params
        const todo = await Todo.findOne({
            where: { id },
            attributes: ['title', 'completed'] 
        })
        res.json(todo)
    } catch (error) {
        console.error(err)
        res.status(500).json({ error: 'Internal server error' })
    }
}

// post note Controller
const postNote = async (req, res) => {
    try {
        const todo = await Todo.create({
            title: req.body.title,
            completed: req.body.completed,
            userId: req.body.userId,
        })
        res.json(todo)
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' })
    }
}

// delete note Controller
const deleteNote = async (req, res) => {
    try {
        const todo = await Todo.findByPk(req.params.id);
        if (!todo) {
            return res.status(404).json({ error: 'Todo not found' })
        }
        await todo.destroy();
        res.json({ success: true })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Internal server error' })
    }
}

// update note Controller
const updateNote = async (req, res) => {
    try {
        const todo = await Todo.findByPk(req.params.id);
        if (!todo) {
            return res.status(404).json({ error: 'Todo not found' })
        }
        await todo.update({
            title: req.body.title,
            completed: req.body.completed
        });
        res.json(todo);
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Internal server error' })
    }
}

//success note controller
const successNote = async (req, res) => {
    try {
        const todo = await Todo.findByPk(req.params.id);
        if (!todo) {
            return res.status(404).json({ error: 'Todo not found' })
        }
        if (todo.completed) {
            todo.completed = false
        } else {
            todo.completed = true
        }
        await todo.update({
            completed: todo.completed
        })
        res.json(todo)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Internal server error' })
    }
}

module.exports = {
    getAllNotes,
    getSingleNote,
    postNote,
    deleteNote,
    updateNote,
    successNote,
}