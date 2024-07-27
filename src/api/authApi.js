import express from 'express'
import AuthControllers from '../controllers/authControllers.js'

const router = express.Router()

router
    .post('/login', AuthControllers.loginUser) // login user

export default router