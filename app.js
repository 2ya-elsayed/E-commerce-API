const express = require('express');
const dotenv = require("dotenv");
dotenv.config({path: 'config.env'});
const dbConnection = require('./config/database');
const categoryRoute = require("./routes/categoryRoute");
const ApiError = require("./utils/apiError");
const globalError = require("./middlewares/errorMiddleware")
const morgan = require('morgan');

// connect with db
dbConnection();

// express app
const app = express();

// Middelwares
if(process.env.NODE_ENV === "development"){
    app.use(morgan("dev"));
    console.log(`mode: ${process.env.NODE_ENV}`);
}

app.use(express.json());

// Mount Routes
app.use("/api/categories", categoryRoute);
app.all("*", (req, res, next)=>{
    // create error and send it to err handling middleware
    // const err = new Error(`can't find this route : ${req.originalUrl}`);
    // next(err.message);
    next(new ApiError(`can't find this route : ${req.originalUrl}`, 400));
});

// global error handling middleware for express
app.use(globalError);

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT , ()=>{
    console.log(`app runing on port ${PORT}`);
});

// handle errors or rejections outside express (database connection , ...)
// Events => listen => callback(err)
process.on("unhandledRejection",(err)=>{
    console.log(`unhandledRejection Errors ${err.name} | ${err.message}`);
    server.close(()=>{
        console.log("shutting down...");
        process.exit(1);
    });
});