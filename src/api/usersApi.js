import express from 'express'
import UserControllers from '../controllers/usersControllers.js'

const router = express.Router()

router
    .post('/register', UserControllers.registerUser) // register user
    .get('/:id', UserControllers.getUserById) // get user by id

export default router