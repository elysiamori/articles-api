import db from '../config/config.js'
import dotenv from 'dotenv'
import querysql from '../helpers/query.js'
dotenv.config()

const CommentModels = {

    getAllComments: async () => {
        try {
            const sql = `SELECT cm.id, cm.author_id, u.username, cm.content_id, cm.comment, cm.created_at, cm.updated_at
            FROM comments cm
            LEFT JOIN users u ON cm.author_id = u.id
            ORDER BY cm.id`

            return await db.execute(sql)

        } catch (error) {
            throw new Error('Failed to get all comments', 500)
        }
    },

    getCommentById: async (id) => {
        try {
            const sql = `SELECT cm.id, cm.author_id, u.username, cm.content_id, cm.comment, cm.created_at, cm.updated_at
            FROM comments cm
            LEFT JOIN users u ON cm.author_id = u.id
            WHERE cm.id = ?`

            return await db.execute(sql, [id])

        } catch (error) {
            throw new Error('Failed to get by id', 500)
        }
    },

    getContentComment: async () => {
        try {
            const sql = querysql.contentsComments

            const [results] = await db.execute(sql)

            return results

        } catch (error) {
            throw new Error('Failed get contents and comments', 500)
        }
    },

    addComment: async (body) => {
        try {
            const sql = 'INSERT INTO comments (author_id, content_id, comment) VALUES (?, ?, ?)'

            const [results] = await db.execute(sql, [body.author_id, body.content_id, body.comment])

            return results

        } catch (error) {
            throw new Error('Failed to add comment', 500)
        }
    },

    updateComment: async (body, id) => {
        try {
            const sql = `UPDATE comments SET comment='${body.comment}' WHERE id = ${id}`

            const [results] = await db.execute(sql)

            return results

        } catch (error) {
            throw new Error('Failed to update comment', 500)
        }
    },

    deleteComment: async (id) => {
        try {
            const sql = `DELETE FROM comments WHERE id=${id}`

            return await db.execute(sql)

        } catch (error) {
            throw new Error('Failed to delete comment', 500)
        }
    }
}

export default CommentModels