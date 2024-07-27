import db from '../config/config.js'
import dotenv from 'dotenv'
import querysql from '../helpers/query.js'
dotenv.config()

const ContentModels = {
    getUserContent: async () => {
        try {
            const sql = querysql.usersContents

            const [results] =  await db.execute(sql)
            return results

        } catch (error) {
            throw new Error('Failed get users and category', 400)
        }
       
    },
    searchContent: async (searchTerm) => {
        try {
            const sql = `SELECT u.id AS user_id, u.username, u.email, 
            c.id AS content_id, c.author_id, c.title, c.content, c.category, c.created_at, c.updated_at
            FROM users u 
            LEFT JOIN contents c ON u.id = c.author_id
            WHERE LOWER(u.username) LIKE LOWER(?) OR LOWER(c.title) LIKE LOWER(?)`

            const [results] =  await db.execute(sql, [`%${searchTerm}%`, `%${searchTerm}%`])
            return results

        } catch (error) {
            throw new Error('Failed get users and category', 400)
        }
    },


    getUserContentById: async (id) => {
        try {
            const sql = `SELECT u.id AS user_id, u.username, u.email, 
            c.id AS content_id, c.author_id, c.title, c.content, c.category, c.created_at, c.updated_at
            FROM users u 
            LEFT JOIN contents c ON u.id = c.author_id
            WHERE u.id = (?)`

            const [results] =  await db.execute(sql, [id])

            return results
        } catch (error) {
            throw new Error(`Failed get by id: ${id} contents`, 500)
        }
    },

    getAllContent: async (page, limit) => {
        try {
            const offset = (page - 1) * limit;
            const dataSql = 'SELECT * FROM contents LIMIT ? OFFSET ?';
            const countSql = 'SELECT COUNT(*) as count FROM contents';

            const [data] = await db.execute(dataSql, [+limit, +offset]);
            const [totalPageData] = await db.execute(countSql);
            const totalPage = Math.ceil(+totalPageData[0]?.count / limit);

            return {
                data,
                pagination: {
                    page: +page,
                    limit: +limit,
                    totalPage
                }
            };

        } catch (error) {
            throw new Error('Failed to get all contents', 500);
        }
    },

    getUser: async () => {
        try {
            const sql = 'SELECT id, username, email FROM users'

            return await db.execute(sql)

        } catch (error) {
            throw new Error('Failed to get users', 500)
        }
       
    },

    getContentById: async (id) => {
        try {
            const sql = `SELECT * FROM contents WHERE id = ${id}`

            return await db.execute(sql)

        } catch (error) {
            throw new Error('Failed to get content by id', 500)
        }
    },

    addContent: async (body) => {
        try {
            const sql = `INSERT INTO contents (author_id, title, content, category) VALUES (?, ?, ?, ?)`

            return await db.execute(sql, [body.author_id, body.title, body.content, body.category])

        } catch (error) {
            throw new Error('Failed to add contents', 500)
        }
    },

    updateContent: async (body, id) => {
        try {
            const sql = `UPDATE contents SET title='${body.title}', content='${body.content}'
                        , category='${body.category}' WHERE id=${id}`

            return await db.execute(sql) 

        } catch (error) {
            throw new Error('Failed to update contents', 500)
        }
    },

    deleteContent: async  (id) =>{
        try {
            const sql = `DELETE FROM contents WHERE id=${id}`

            return await db.execute(sql)

        } catch (error) {
            throw new Error('Failed to delete contents', 500)
        }
    }
}

export default ContentModels