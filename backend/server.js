import 'dotenv/config';
import express from 'express'
import mongoose from 'mongoose';
import folderRoutes from './routes/folder.js'

// express app
const app = express()

app.use((req, res, next) => {
    // console.log(req.path, req.method)
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    // Respond to OPTIONS preflight requests
    if (req.method === 'OPTIONS') {
        return res.status(200).send(); // Sends an empty 200 response
    }

    next()
})
// middleware to parse the request body into the req obj
app.use(express.json())

// routes
app.use('/api/folders', folderRoutes)

// connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // listen for requests
        app.listen(process.env.PORT, () => {
            console.log('listening');
        })
    })
    .catch((error) => {
        console.log(error);
    })