class OperationalError extends Error {
    constructor(...args) {
        super(...args);
    }
}

class InvalidSignupError extends OperationalError {
    constructor(message) {
        super();
        this.name = this.constructor.name;

        this.message = message;
        this.statusCode = 400;
    }
}

module.exports = {
    OperationalError,
    InvalidSignupError
}