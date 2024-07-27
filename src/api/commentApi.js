import express from 'express'
import CommentController from '../controllers/commentControllers.js'
import authorize from '../middlewares/authMiddleware.js'

const router = express.Router()

router
    .get('/', CommentController.getAllComments)
    .get('/contents', CommentController.getContentsAndComments)
    .get('/:id', CommentController.getCommentById)
    .post('/', authorize ,CommentController.addComment)
    .patch('/:id', authorize, CommentController.updateComment)
    .delete('/:id', authorize,CommentController.deleteComment)
    
export default router