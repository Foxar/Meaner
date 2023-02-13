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

class InvalidLoginError extends OperationalError {
    constructor(message) {
        super();
        this.name = this.constructor.name;
        this.message = message;
        this.statusCode = 401;
    }
}

class InvalidAuthTokenError extends OperationalError {
    constructor(message) {
        super();
        this.name = this.constructor.name;
        this.message = message;
        this.statusCode = 401;
    }
}

module.exports = {
    OperationalError,
    InvalidSignupError,
    InvalidLoginError,
    InvalidAuthTokenError
}