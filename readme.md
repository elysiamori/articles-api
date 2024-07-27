# RESTful API Project : Articles App
Tech Stack:
- Node JS
- Express JS
- MySQL

Library:
- jsonwebtoken
- bcryptjs
- supervisor
- dotenv
- joi

# Folder Structure [ MVC Architecture ]
- src: - api
       - config
       - controllers
       - entities
       - helpers
       - middlewares
       - models
       - routes
- .env
- package.json
- server.js

## Resources Register | Login | Logout
- Hash password: - hash models
                 - compare password models

- JWT Thing    : - get id, get email, get password
                 - jwt sign id
                 - verify token models
                 - authorize models
                 - middleware authorize