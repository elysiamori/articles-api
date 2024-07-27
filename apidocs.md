# Articles API [DOCS]

Key Feature:
- User Register Login
- Content Articles
- Comment Articles
- Authorization

# API KEY [API]

# User [SECTION]
## [POST] /users/register
Request:
- Description : User register
- Header : application/json
- Body:
```json
    {
        "username" : "string",
        "email": "string",
        "password": "string",
        "passwordconfirm": "string"
    }
```
Response: 
- Status [201] Created
- data:
```json
    {
        "data": {
            "id": "integer",
            "username": "string",
            "email": "string",
            "password": "string[hash]",
            "token": "jwt-token"
        },
        "message": "User {username} created successfully"
    }
    
```
Error [Password]:
- Status [400] Bad Request
- error:
```json
    {
        "error": "password and password confirm do not match"
    }
```
Error [Validation]:
- Status [400] Bad Request
- error:
```json
    {
        "error": "\"key\" is not allowed to be empty"
    }
```
Error [Server]:
- Status [500] Internal Server Error
- error:
```json
    {
        "error": "Failed to register user",
        "message": "Internal Server Error"
    }
```