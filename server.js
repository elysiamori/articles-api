import express from 'express'
import dotenv from 'dotenv'
import {v4 as uuidv4} from 'uuid'
import Routes from './src/routes/route.js'
import apiKeyMiddleware from './src/middlewares/apiKey.js'
import logRequest from './src/middlewares/logRequest.js'
dotenv.config()

const app = express()
const PORT = process.env.PORT || 4000

app.use(logRequest)
app.use(express.json())

// All Routes
app.use('/', apiKeyMiddleware, Routes)

// Generate API Key
app.post('/generate-api-key', (req, res) => {
    const newApiKey = uuidv4()
    res.status(200).json({
        apiKey: newApiKey
    })
})

// First Routes
app.get('/', apiKeyMiddleware,(req, res) => {
    res.status(200).json({
        message: 'You have access to api'
    })
});

// Default for method or path unavailable
app.use('*',  (req, res) => {
    res.status(404).json({
        error: 'method or path unavailable'
    })
})

// Server
const responseServer = `+------------------------------------+
|            Express JS              |
+-------------------------------------
|    Server running on port ${PORT}     |
+------------------------------------+`

app.listen(PORT, () => {
    console.log(responseServer);
});