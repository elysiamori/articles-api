import contentRequest from '../entities/contentEntity.js'
import ContentModels from '../models/contentModels.js'

const ContentControllers = {
    getUserContent:  async (req, res) => {
        try {
            const contentUser = await ContentModels.getUserContent()

            const formattedData = contentUser.reduce((acc, user) => {
                const existingUser = acc.find(u => u.id === user.user_id)

                console.log(user.content_id)

                if(existingUser){
                    existingUser.content.push({
                        id: user.content_id,
                        author_id: user.author_id,
                        title: user.title,
                        content: user.content,
                        category: user.category,
                        created_at: user.created_at,
                        updated_at: user.updated_at
                    })
                } 
                
                if(!existingUser){
                    acc.push({
                        id: user.user_id,
                        username: user.username,
                        email: user.email,
                        content: user.content_id ? [{
                            id: user.content_id,
                            author_id: user.author_id,
                            title: user.title,
                            content: user.content,
                            category: user.category,
                            created_at: user.created_at,
                            updated_at: user.updated_at
                        }] : []
                    })
                }
                return acc
            }, [])

            res.status(200).json({
                data: formattedData,
                message: 'Get all users and contents'
            })
           
        } catch (error) {
            res.status(500).json({
                error: 'Internal server error[users contents]'
            })
        }
    },

    // controllers
    getAllContent: async (req, res) => {
        try {
            const { page, limit } = req.query;
            const pageNum = page ? +page : 1;
            const limitNum = limit ? +limit : 10;

            const result = await ContentModels.getAllContent(pageNum, limitNum);

            res.status(200).json({
                data: result.data,
                message: 'Get all content successfully',
                pagination: result.pagination
            });

        } catch (error) {
            res.status(500).json({
                error: 'Internal server error[all content]'
            });
        }
    },

    getUserContentById: async (req, res) => {
        const {id} = req.params

        try {
            const contentUser = await ContentModels.getUserContentById(id)
            
            if(contentUser.length === 0){
                return res.status(404).json({
                    error: "User content not found"
                })
            }

            const formattedData = contentUser.reduce((acc, user) => {
                const existingUser = acc.find(u => u.id === user.user_id)

                if(existingUser){
                    existingUser.content.push({
                        id: user.content_id,
                        author_id: user.author_id,
                        title: user.title,
                        content: user.content,
                        category: user.category,
                        created_at: user.created_at,
                        updated_at: user.updated_at
                    })
                } 
                
                // errro handling true or false
                if(!existingUser){
                    acc.push({
                        id: user.user_id,
                        username: user.username,
                        email: user.email,
                        content: user.content_id ? [{
                            id: user.content_id,
                            author_id: user.author_id,
                            title: user.title,
                            content: user.content,
                            category: user.category,
                            created_at: user.created_at,
                            updated_at: user.updated_at
                        }] : []
                    })
                }
                return acc
            }, [])

            res.status(200).json({
                data: formattedData,
                message: 'Get all users and contents by id'
            })
        } catch (error) {
            
        }
    },

    getContentById: async (req, res) => {
        const {id} = req.params

        try {
            const [content] = await ContentModels.getContentById(id)

            if(content.length === 0){
                return res.status(404).json({
                    error: 'Content not found'
                })
            }

            res.status(200).json({
                data: content,
                message: `Get content by id: ${id} found`
            })
        } catch (error) {
            res.status(500).json({
                error: 'Internal server error[content id]'
            })
        }
    },

    searchContent: async (req, res) => {
        const {searchTerm} = req.query

        const contentUser = await ContentModels.searchContent(searchTerm)
            // error handling for query parameter
            if(contentUser.length === 0){
                return res.status(404).json({
                    error: "Data not found"
                })
            }

        try {
            const formattedData = contentUser.reduce((acc, user) => {
                const existingUser = acc.find(u => u.id === user.user_id)

                if(existingUser){
                    existingUser.content.push({
                        id: user.content_id,
                        author_id: user.author_id,
                        title: user.title,
                        content: user.content,
                        category: user.category,
                        created_at: user.created_at,
                        updated_at: user.updated_at
                    })
                } 
                
                // error handling true or false
                if(!existingUser){
                    acc.push({
                        id: user.user_id,
                        username: user.username,
                        email: user.email,
                        content: user.content_id ? [{
                            id: user.content_id,
                            author_id: user.author_id,
                            title: user.title,
                            content: user.content,
                            category: user.category,
                            created_at: user.created_at,
                            updated_at: user.updated_at
                        }] : []
                    })
                }
                return acc
            }, [])

            res.status(200).json({
                data: formattedData,
                message: 'Sucessfully search user and contents'
            })
           
        } catch (error) {
            res.status(500).json({
                error: 'Internal server error [search]'
            })
        }
    },

    addContent: async (req, res) => {
        const {id} = req.userId // for user crud 
        const {body} = req
        body.author_id = id

        const {error} = contentRequest.validate(body)

        if(error){
            return res.status(400).json({
                error: error.details[0].message
            })
        }

        try {
            await ContentModels.addContent(body)

            res.status(201).json({
                data: body,
                message: 'Add content successfully'
            })
        } catch (error) {
            res.status(500).json({
                error: 'Internal server error[add]'
            })
        }
    },

    updateContent: async (req, res) => {
        const {id} = req.userId
        const content_id = req.params.id
        const {body} = req
        body.author_id = id

        const {error} = contentRequest.validate(body)

        if(error){
            return res.status(400).json({
                error: error.details[0].message
            })
        }

        try {
            const [existingContent] = await ContentModels.getContentById(content_id)

            // error handling for getting id
            if(existingContent.length === 0){
                return res.status(404).json({
                    erorr: 'Content not found'
                })
            }

            if(existingContent[0].author_id != id){
                console.error('Cannot update content user')
                return res.status(401).json({
                    error: 'Unauthorized',
                    message: 'Failed to update content user'
                })
            }

            await ContentModels.updateContent(body, content_id)
            res.status(200).json({
                data: body,
                message: 'Update content successfully'
            })

        } catch (error) {
            res.status(500).json({
                error: 'Internal server error[update]'
            })
        }
    },

    deleteContent: async (req, res) => {
        const {id} = req.userId

        const deleted_id = req.params.id

        try {

            const [user] = await ContentModels.getContentById(deleted_id)

            // error handling for getting id
            if(user.length === 0){
                return res.status(404).json({
                    erorr: 'Content not found'
                })
            }

            if(user[0].author_id != id){
                console.error('Cannot delete content user')
                return res.status(401).json({
                    error: 'Unauthorized',
                    message: 'Failed to delete content user'
                })
            }

            await ContentModels.deleteContent(deleted_id)

            res.status(200).json({
                message: `Content id: ${deleted_id} has been deleted sucessfully`
            })
        } catch (error) {
            res.status(500).json({
                error: 'Internal server error[delete]'
            })
        }
    }
}

export default ContentControllers