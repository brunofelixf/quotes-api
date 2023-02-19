"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatorData = void 0;
const validatorData = (schema) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const validatedData = yield schema.validate(data, { abortEarly: false });
        req.body = validatedData;
        next();
    }
    catch (error) {
        const yupError = error;
        const errors = {};
        yupError.inner.forEach(error => {
            if (error.path === undefined)
                return;
            errors[error.path] = error.message;
        });
        return res.status(400).json({ message: errors });
    }
});
exports.validatorData = validatorData;
//# sourceMappingURL=validatorData.middleware.js.map