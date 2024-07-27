import commentRequest from "../entities/commentEntity.js";
import CommentModels from "../models/commentModels.js";

const CommentController = {
    getAllComments: async (req, res) => {
        try {
            const [comments] = await CommentModels.getAllComments()

            res.status(200).json({
                data: comments,
                message: 'Get all comments successfully'
            })
        } catch (error) {
            res.status(500).json({
                error: 'Failed get all comments'
            })
        }
    },

    getCommentById: async (req, res) => {
        const {id} = req.params

        try {
            const [comment] = await CommentModels.getCommentById(id)

            if(comment.length === 0){
                return res.status(404).json({
                    error: 'Comment not found'
                })
            }

            res.status(200).json({
                data: comment,
                message: 'Get comment by id successfully'
            })

        } catch (error) {
            res.status(500).json({
                error: 'Internal server error [get comment by id]'
            })
        }
    },

    getContentsAndComments: async (req, res) => {
        try {
            const contentsComments = await CommentModels.getContentComment()

            const formattedData = contentsComments.reduce((acc, content) => {
                const existingContent = acc.find(c => c.id === content.content_id)
                
                if(existingContent){
                    existingContent.comment.push({
                        id: content.comment_id,
                        author_id: content.comment_author_id,
                        username: content.comment_author_username, 
                        content_id: content.comment_content_id,
                        comment: content.comment,
                        created_at: content.created_at,
                        updated_at: content.updated_at
                    })
                }

                if(!existingContent){
                    acc.push({
                        id: content.content_id,
                        author_id: content.content_author_id,
                        username: content.content_author_username,
                        title: content.title,
                        content: content.content,
                        category: content.category,
                        comment: content.comment_id ? [{
                            id: content.comment_id,
                            author_id: content.comment_author_id,
                            username: content.comment_author_username, 
                            content_id: content.comment_content_id,
                            comment: content.comment,
                            created_at: content.created_at,
                            updated_at: content.updated_at
                        }] : []
                    })
                }
                return acc
            }, [])

            res.status(200).json({
                data: {
                    contents: formattedData
                },
                message: 'Get all contents and comments'
            })

        } catch (error) {
            res.status(500).json({
                error: 'Internal server error [contents comments]'
            })
        }
    },

    addComment: async (req, res) => {
        const {id} = req.userId
        const {body} = req
        body.author_id = id

        const {error} = commentRequest.validate(body)

        if(error){
            return res.status(400).json({
                error: error.details[0].message
            })
        }   

        try {
            await CommentModels.addComment(body)

            res.status(201).json({
                data: {
                    author_id: body.author_id,
                    content_id: body.content_id,
                    comment: body.comment
                },
                message: 'Add comment sucessfully'
            })

        } catch (error) {
            res.status(500).json({
                error: 'Intrnal server error [add comment]'
            })
        }
    },

    updateComment: async (req, res) => {
        const {id} = req.userId
        const comment_id = req.params.id
        const {body} = req
        body.author_id = id

        if(!body.comment){
            return res.status(400).json({
                error: 'Please input comment'
            })
        }

        try {
            const [existingComment] = await CommentModels.getCommentById(comment_id)

            // error handling for getting id
            if(existingComment.length === 0){
                return res.status(404).json({
                    erorr: 'Comment not found'
                })
            }

            if(existingComment[0].author_id != id){
                console.error('Cannot update comment user')
                return res.status(401).json({
                    error: 'Unauthorized',
                    message: 'Failed to update comment user'
                })
            }

            await CommentModels.updateComment(body, comment_id)

            res.status(200).json({
                data: body,
                message: 'Update comment successfully'
            })
        } catch (error) {
            res.status(500).json({
                error: 'Internal server error [update comment]'
            })
        }
    },

    deleteComment: async (req, res) => {
        const {id} = req.userId

        const deleted_id = req.params.id

        try {
            const [user] = await CommentModels.getCommentById(deleted_id)

            // error handling for getting id
            if(user.length === 0){
                return res.status(404).json({
                    erorr: 'Comment not found'
                })
            }

            if(user[0].author_id != id){
                console.error('Cannot delete comment user')
                return res.status(401).json({
                    error: 'Unauthorized',
                    message: 'Failed to delete comment user'
                })
            }

            await CommentModels.deleteComment(deleted_id)

            res.status(200).json({
                message: `Comment id: ${deleted_id} has been deleted sucessfully`
            })

        } catch (error) {
            res.status(500).json({
                error: 'Internal server error[delete comment]'
            })
        }
    }
}

export default CommentController