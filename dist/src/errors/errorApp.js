"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnauthorizedError = exports.NotFoundError = exports.BadRequestError = exports.ErrorApp = void 0;
class ErrorApp extends Error {
    constructor(message, status = 400) {
        super(message);
        this.status = status;
    }
}
exports.ErrorApp = ErrorApp;
class BadRequestError extends ErrorApp {
    constructor(message) {
        super(message, 400);
    }
}
exports.BadRequestError = BadRequestError;
class NotFoundError extends ErrorApp {
    constructor(message) {
        super(message, 404);
    }
}
exports.NotFoundError = NotFoundError;
class UnauthorizedError extends ErrorApp {
    constructor(message) {
        super(message, 401);
    }
}
exports.UnauthorizedError = UnauthorizedError;
//# sourceMappingURL=errorApp.js.map