import 'dotenv/config';
import express from 'express'
import mongoose from 'mongoose';
import folderRoutes from './routes/folder.js'
import morgan from 'morgan';

// express app
const app = express()

app.use((req, res, next) => {
    // console.log(req.path, req.method)
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    next()
})
// middleware to parse the request body into the req obj
app.use(express.json())

// middleware to log the request method, url and method to the console every time it is called
app.use(morgan('dev'));

// routes
app.use('/api/folders', folderRoutes);

app.all('*', (req, res, next) => {

    const err = new Error(`Cannot find ${req.originalUrl} on this server!`);
    err.statusCode = 404;
    err.status = 'fail';
    
    // pass err to next middleware which stops all other middleware in the stack
    next(err);
});

// a middleware function with 4 arguments is considered an error handling middleware
// so this is called when express has errors
app.use((error, req, res, next) => {
    error.statusCode = error.statusCode || 500; // set statusCode to default 500 if it has no code
    console.error(error.stack);
    res.status(error.statusCode).json({
        status: error.statusCode,
        message: error.message,
    });
});

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