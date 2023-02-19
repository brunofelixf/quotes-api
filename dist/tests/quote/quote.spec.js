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
const prisma_1 = require("./../../src/prisma");
const supertest_1 = __importDefault(require("supertest"));
const app_1 = require("../../src/app");
let login;
let quote;
describe('Criar Citação | Route', () => {
    const data = {
        email: "test@email2.com",
        password: "123"
    };
    it('Deve lançar erro se não estiver logado e retornar status 401', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.app)
            .post('/quote')
            .expect(401);
        expect(response.body).toEqual({ "error": "O login é requerido" });
    }));
    it('Não deve criar um citação se body estiver vazio e deve retornar status 400', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.app)
            .post('/user')
            .send({
            name: "Usuário Teste 2",
            email: "test@email2.com",
            password: "123"
        });
        login = yield (0, supertest_1.default)(app_1.app)
            .post('/login')
            .send(data);
        const response = yield (0, supertest_1.default)(app_1.app)
            .post('/quote')
            .set({ Authorization: `Bearer ${login.body.token}` })
            .send({})
            .expect(400);
        expect(response.body).toEqual({ "message": { "text": "O campo text é obrigatório" } });
    }));
    it('Deve criar uma citação e retornar status 201', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.app)
            .post('/quote')
            .set({ Authorization: `Bearer ${login.body.token}` })
            .send({ text: 'Texto da citação teste' })
            .expect(201);
        expect(response.body).toHaveProperty('quote_id');
        expect(response.body.text).toEqual('Texto da citação teste');
        quote = response.body;
        console.log('quote: ' + JSON.stringify(quote));
    }));
});
describe('Listar citação | Route', () => {
    it('Deve lançar erro se não estiver logado e retornar status 401', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.app)
            .get('/quote')
            .expect(401);
        expect(response.body).toEqual({ "error": "O login é requerido" });
    }));
    it('Deve retornar as citações do usuário e retornar status 200', () => __awaiter(void 0, void 0, void 0, function* () {
        const quotes = yield (0, supertest_1.default)(app_1.app)
            .get('/quote')
            .set({ Authorization: `Bearer ${login.body.token}` })
            .expect(200);
        expect(quotes.body[0]).toHaveProperty('quote_id');
        yield prisma_1.prisma.quote.delete({ where: { quote_id: quote.quote_id } });
    }));
    it('Deve lançar erro se não houverem citações e retornar status 404', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.app)
            .get('/quote')
            .set({ Authorization: `Bearer ${login.body.token}` })
            .expect(404);
    }));
});
describe('Atualizar citação | Route', () => {
    it('Deve lançar erro se não estiver logado e retornar status 401', () => __awaiter(void 0, void 0, void 0, function* () {
        quote = yield (0, supertest_1.default)(app_1.app)
            .post('/quote')
            .set({ Authorization: `Bearer ${login.body.token}` })
            .send({ text: 'Texto da citação teste' });
        const response = yield (0, supertest_1.default)(app_1.app)
            .patch(`/quote/${quote.body.quote_id}`)
            .expect(401);
        expect(response.body).toEqual({ "error": "O login é requerido" });
    }));
    it('Deve atualizar dados da citação e retornar status 200', () => __awaiter(void 0, void 0, void 0, function* () {
        const quoteUpdated = yield (0, supertest_1.default)(app_1.app)
            .patch(`/quote/${quote.body.quote_id}`)
            .send({ text: "Usuário Teste Atualizado" })
            .set({ Authorization: `Bearer ${login.body.token}` })
            .expect(200);
        expect(quoteUpdated.body.text).toBe("Usuário Teste Atualizado");
    }));
});
describe('Deletar citação | Route', () => {
    it('Deve lançar erro se não estiver logado e retornar status 401', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.app)
            .delete(`/quote/${quote.body.quote_id}`)
            .expect(401);
        expect(response.body).toEqual({ "error": "O login é requerido" });
    }));
    it('Deve lançar erro se a citação não pertencer ao usuário logado e retornar status 401', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.app)
            .post('/user')
            .send({
            name: "Usuário Teste 3",
            email: "test@email3.com",
            password: "123"
        });
        const login2 = yield (0, supertest_1.default)(app_1.app)
            .post('/login')
            .send({ email: "test@email3.com", password: "123" });
        yield (0, supertest_1.default)(app_1.app)
            .delete(`/quote/${quote.body.quote_id}`)
            .set({ Authorization: `Bearer ${login2.body.token}` })
            .expect(401);
    }));
    it('Deve lançar erro se a citação não existir e retornar status 404', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.app)
            .delete(`/quote/123`)
            .set({ Authorization: `Bearer ${login.body.token}` })
            .expect(404);
    }));
    it('Deve deletar citação e retornar status 204', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.app)
            .delete(`/quote/${quote.body.quote_id}`)
            .set({ Authorization: `Bearer ${login.body.token}` })
            .expect(204);
        yield prisma_1.prisma.user.delete({ where: { email: "test@email2.com" } });
        yield prisma_1.prisma.user.delete({ where: { email: "test@email3.com" } });
        yield prisma_1.prisma.$disconnect();
    }));
});
//# sourceMappingURL=quote.spec.js.map