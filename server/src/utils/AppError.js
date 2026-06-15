// Error operacional controlado con statusCode y código legible
class AppError extends Error {
  constructor(message, statusCode, errorCode) {
    super(message);
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    this.isOperational = true; // diferencia errores controlados de bugs inesperados

    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
