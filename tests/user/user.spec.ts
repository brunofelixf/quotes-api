import request  from "supertest";
import { Response } from 'superagent';
import { app } from '../../src/app';
import { prisma } from "../../src/prisma";

describe('Criar Usuário | Route', () => {

    afterAll( async()=> {
        await prisma.$disconnect()
    })
    
    const data = {
        name: "Usuário Teste",
        email: "test@email.com",
        password: "123"
    }

    it('Não deve criar um usuário se body estiver vazio e deve retornar status 400', async () => {
        await request(app)
        .post('/user')
        .send( {} )
        .expect(400)
    })
    
    it('Não deve criar um usuário se faltar atributos e deve retornar status 400', async () => {
        const response = await request(app)
        .post('/user')
        .send( { name: 'teste', password: 123 } )
        .expect(400)
        expect( response.body ).toEqual({"message": {"email": "O email é obrigatório"}})
    })

    it('Deve criar um usuário e retornar status 201', async () => {
        const response = await request(app)
        .post('/user')
        .send( data )
        .expect(201)
        expect( response.body ).toHaveProperty( 'user_id') 
    })    
    
    it('Não deve criar um usuário existente e deve retornar retornar status 400', async () => {
        await request(app)
        .post('/user')
        .send( data )
        .expect(400)
    })
});

describe('Listar dados do usuário | Route', () => {

    const data = {
        email: "test@email.com",
        password: "123"
    }

    let login: Response

    beforeAll( async () => { 
        login = await request(app)
        .post('/login')
        .send( data ) 
    })

    afterAll( async()=> {
        await prisma.$disconnect()
    })

    it('Deve lançar erro se não estiver logado e retornar status 401', async () => {
        const response = await request(app)
        .get('/user')
        .expect(401)
        expect( response.body ).toEqual({"error": "O login é requerido"})
    })

    it('Deve lançar dados da conta logada e retornar status 200', async () => {

        const user = await request(app)
        .get('/user')
        .set({ Authorization: `Bearer ${login.body.token}`})
        .expect(200)
        expect( user.body[0] ).toHaveProperty( 'user_id') 
    })
});

describe('Atualizar dados do usuário | Route', () => {

    const data = {
        email: "test@email.com",
        password: "123"
    }

    let login: Response

    beforeAll( async () => { 
        login = await request(app)
        .post('/login')
        .send( data ) 
    })
    
    it('Deve lançar erro se não estiver logado e retornar status 401', async () => {
        const response = await request(app)
        .patch('/user')
        .expect(401)
        expect( response.body ).toEqual({"error": "O login é requerido"})
    })

    it('Deve atualizar dados da conta logada e retornar status 200', async () => {
        const user = await request(app)
        .patch('/user')
        .send( { name: "Usuário Teste Atualizado" } )
        .set({ Authorization: `Bearer ${login.body.token}`})
        .expect(200)
        expect( user.body.name ).toBe( "Usuário Teste Atualizado" ) 
    })
});
describe('Deletar dados do usuário | Route', () => {

    const data = {
        email: "test@email.com",
        password: "123"
    }

    let login: Response

    beforeAll( async () => { 
        login = await request(app)
        .post('/login')
        .send( data ) 
    })

    it('Deve lançar erro se não estiver logado e retornar status 401', async () => {
        const response = await request(app)
        .delete('/user')
        .expect(401)
        expect( response.body ).toEqual({"error": "O login é requerido"})
    })
    
    it('Deve deletar dados da conta logada e retornar status 204', async () => {
        await request(app)
        .delete('/user')
        .set({ Authorization: `Bearer ${login.body.token}`})
        .expect(204)

        await prisma.user.delete({ where: { email: "test@email.com" }})
        await prisma.$disconnect()
    })
    
});

