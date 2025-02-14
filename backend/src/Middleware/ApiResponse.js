const SuccessResponse = (res, data, message = 'success')=>{
    return res.status(200).json({
        status: 'success',
        data,
        message,
    })
}

 export const ErrorResponse = (res, statusCode, message)=>{
    return res.status(statusCode).json({
        status: 'error',
        message,
    })
}

export default SuccessResponse