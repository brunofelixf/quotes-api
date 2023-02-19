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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = require("../../src/app");
const prisma_1 = require("../../src/prisma");
const data = {
    email: "test@email.com",
    password: "123"
};
let login;
describe('Criar Usuário | Route', () => {
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield prisma_1.prisma.$disconnect();
    }));
    const data = {
        name: "Usuário Teste",
        email: "test@email.com",
        password: "123"
    };
    it('Não deve criar um usuário se body estiver vazio e deve retornar status 400', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.app)
            .post('/user')
            .send({})
            .expect(400);
    }));
    it('Não deve criar um usuário se faltar atributos e deve retornar status 400', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.app)
            .post('/user')
            .send({ name: 'teste', password: 123 })
            .expect(400);
        expect(response.body).toEqual({ "message": { "email": "O email é obrigatório" } });
    }));
    it('Deve criar um usuário e retornar status 201', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.app)
            .post('/user')
            .send(data)
            .expect(201);
        expect(response.body).toHaveProperty('user_id');
    }));
    it('Não deve criar um usuário existente e deve retornar retornar status 400', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.app)
            .post('/user')
            .send(data)
            .expect(400);
    }));
});
describe('Listar dados do usuário | Route', () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        login = yield (0, supertest_1.default)(app_1.app)
            .post('/login')
            .send(data);
    }));
    it('Deve lançar erro se não estiver logado e retornar status 401', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.app)
            .get('/user')
            .expect(401);
        expect(response.body).toEqual({ "error": "O login é requerido" });
    }));
    it('Deve lançar dados da conta logada e retornar status 200', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield (0, supertest_1.default)(app_1.app)
            .get('/user')
            .set({ Authorization: `Bearer ${login.body.token}` })
            .expect(200);
        expect(user.body[0]).toHaveProperty('user_id');
    }));
});
describe('Atualizar dados do usuário | Route', () => {
    it('Deve lançar erro se não estiver logado e retornar status 401', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.app)
            .patch('/user')
            .expect(401);
        expect(response.body).toEqual({ "error": "O login é requerido" });
    }));
    it('Deve atualizar dados da conta logada e retornar status 200', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield (0, supertest_1.default)(app_1.app)
            .patch('/user')
            .send({ name: "Usuário Teste Atualizado" })
            .set({ Authorization: `Bearer ${login.body.token}` })
            .expect(200);
        expect(user.body.name).toBe("Usuário Teste Atualizado");
    }));
});
describe('Deletar dados do usuário | Route', () => {
    it('Deve lançar erro se não estiver logado e retornar status 401', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.app)
            .delete('/user')
            .expect(401);
        expect(response.body).toEqual({ "error": "O login é requerido" });
    }));
    it('Deve deletar dados da conta logada e retornar status 204', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.app)
            .delete('/user')
            .set({ Authorization: `Bearer ${login.body.token}` })
            .expect(204);
        yield prisma_1.prisma.user.delete({ where: { email: "test@email.com" } });
        yield prisma_1.prisma.$disconnect();
    }));
});
//# sourceMappingURL=user.spec.js.map