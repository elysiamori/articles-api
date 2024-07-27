import express from 'express'
import userApi from '../api/usersApi.js'
import authApi from '../api/authApi.js'
import contentApi from '../api/contentApi.js'
import commentApi from '../api/commentApi.js'

const router = express.Router()

router
      .use('/auth', authApi)
      .use('/users', userApi)
      .use('/contents', contentApi)
      .use('/comments', commentApi)

export default router