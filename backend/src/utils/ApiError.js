class ApiError extends Error {
  message = "";
  constructor(statusCode, message) {
    super(message);
    this.success = false;
    this.statusCode = statusCode || 500;
    this.message = message;
  }
}

export default ApiError;
