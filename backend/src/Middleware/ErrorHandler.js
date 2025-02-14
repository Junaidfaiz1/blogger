class ApiError extends Error{
    constructor (statusCode, message){
        super(message);
        this.statusCode = statusCode;
        
    }
}


const ErrorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Server not responding";

    res.status(statusCode).json({
        status: "error",
        statusCode,
        message,
    });
};




export default {ApiError, ErrorHandler};