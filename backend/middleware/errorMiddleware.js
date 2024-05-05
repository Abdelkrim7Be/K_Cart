const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandeler = (err, req, res, next) => {
    let statusCode = res.statusCode == 200 ? 500 : res.statusCode;
    let message = err.message;

    // Check for Mongoose bad objectId 
    if (err.name == 'CastError' && err.kind === 'ObjectId') {
        statusCode = 404;
        message = `Resource not found`;
    }

    res.status(statusCode).json({
        message,
        stack: process.env.NODE_ENV == 'production' ? '🎭' : err.stack,
    });
};

export { notFound, errorHandeler };
