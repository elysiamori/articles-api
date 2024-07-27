import express from 'express'
import ContentControllers from '../controllers/contentControllers.js'
import authorize from '../middlewares/authMiddleware.js'

const router = express.Router()

router
    .get('/', ContentControllers.getAllContent) // contents only [testing authorized] pagination
    .get('/users', ContentControllers.getUserContent) // users and contents
    .get('/search', ContentControllers.searchContent) // search content title or user
    .get('/users/:id', ContentControllers.getUserContentById) // user and content by user id
    .get('/:id', ContentControllers.getContentById) // content only by id
    .post('/', authorize ,ContentControllers.addContent) // add content [authorized]
    .put('/:id', authorize ,ContentControllers.updateContent) // update content [authorized]
    .delete('/:id', authorize,ContentControllers.deleteContent) // delete content [authorizeds]

export default router