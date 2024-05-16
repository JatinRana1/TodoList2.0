const express = require('express')
const {getAllNotes, getSingleNote, postNote, deleteNote, updateNote, successNote} = require('../controller/noteController')
const { verifyToken } = require('../middleware/tokenVerification')
const noteRouter = express.Router()

noteRouter.use(verifyToken)

// get all notes route
noteRouter.get('/:id', getAllNotes)

//get single note route
noteRouter.get('/:id', getSingleNote)

// post note route
noteRouter.post('/', postNote)

// delete note route
noteRouter.delete('/:id', deleteNote)

// update note route
noteRouter.put('/:id', updateNote)

// success note route
noteRouter.put('/complete/:id', successNote)

module.exports = noteRouter