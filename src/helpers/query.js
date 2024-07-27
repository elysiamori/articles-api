const querysql = {
    usersContents: `SELECT u.id AS user_id, u.username, u.email, 
            c.id AS content_id, c.author_id, c.title, c.content, c.category, c.created_at, c.updated_at
            FROM users u 
            LEFT JOIN contents c ON u.id = c.author_id`,
    
    contentsComments: `SELECT c.id AS content_id, c.author_id AS content_author_id, u.username AS content_author_username,c.title, c.content, c.category,
            cm.id AS comment_id, cm.author_id AS comment_author_id, u2.username AS comment_author_username,cm.content_id AS comment_content_id, cm.comment, cm.created_at, cm.updated_at 
            FROM contents c
            LEFT JOIN comments cm ON c.id = cm.content_id
            LEFT JOIN users u ON c.author_id = u.id
            LEFT JOIN users u2 ON cm.author_id = u2.id`
}

export default querysql