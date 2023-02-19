"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = void 0;
const errorMiddleware = (error, req, res, next) => {
    var _a;
    const statusCode = (_a = error.status) !== null && _a !== void 0 ? _a : 500;
    const message = error.status ? error.message : 'Internal Server Error';
    console.log(error);
    return res.status(statusCode).json({
        error: message
    });
};
exports.errorMiddleware = errorMiddleware;
//# sourceMappingURL=errorHandling.middleware.js.map