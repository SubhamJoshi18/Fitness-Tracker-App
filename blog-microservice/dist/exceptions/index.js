"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseException = exports.ValidationException = exports.UnAuthorizedException = void 0;
class HttpException extends Error {
    constructor(message, statusNumber) {
        super(message);
        this.statusNumber = statusNumber;
        Object.setPrototypeOf(this, new.target.prototype);
    }
    getStatusNumber() {
        return this.statusNumber;
    }
    getMessage() {
        return this.message;
    }
}
class UnAuthorizedException extends HttpException {
    constructor(message, statusNumber) {
        super(message, statusNumber);
        this.name = 'UnAuthorizedExceptions';
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
exports.UnAuthorizedException = UnAuthorizedException;
class ValidationException extends HttpException {
    constructor(statusNumber, message) {
        super(message, statusNumber);
        this.name = 'ValidationException';
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
exports.ValidationException = ValidationException;
class DatabaseException extends HttpException {
    constructor(statusNumber, message) {
        super(message, statusNumber);
        this.name = 'DatabaseException';
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
exports.DatabaseException = DatabaseException;
//# sourceMappingURL=index.js.map