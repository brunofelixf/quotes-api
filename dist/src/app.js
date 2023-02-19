"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
require("express-async-errors");
const express_1 = __importDefault(require("express"));
const routes_1 = require("./routes/routes");
const errorHandling_middleware_1 = require("./middlewares/errorHandling.middleware");
const app = (0, express_1.default)();
exports.app = app;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use('', routes_1.routerApp);
app.use(errorHandling_middleware_1.errorMiddleware);
//# sourceMappingURL=app.js.map