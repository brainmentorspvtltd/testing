export const ErrorHandler = (error, request, response, next)=>{
    const errorCode = error.statusCode || 500;
    const errorMsg = error.message || 'Something went Wrong...';
    response.status(errorCode).json({
        success: false,
        status:errorCode,
        message:errorMsg,
        stack: process.env.NODE_ENV==='development'?error.stack:{}
    })
}