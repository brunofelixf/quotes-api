"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUserSchema = void 0;
const yup = __importStar(require("yup"));
const loginUserSchema = yup.object().shape({
    email: yup
        .string()
        .email("O campo deve conter um email")
        .max(100, "O email não pode ter mais de 100 caracteres")
        .required("O campo email é obrigatório"),
    password: yup
        .string()
        .max(30, "A senha não pode ter mais de 30 caracteres")
        .min(3, "A senha deve ter no mínimo 3 caracteres")
        .required("O campo senha é obrigatória"),
});
exports.loginUserSchema = loginUserSchema;
//# sourceMappingURL=loginUser.schema.js.map