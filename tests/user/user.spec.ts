import { prisma } from '../../src/server';
import request  from "supertest";
import { server } from "../../src/server";
import { Response } from 'superagent';

describe('Criar Usuário | Route', () => {

    beforeEach( () => {
        server
    })
    
    afterEach( () => {
        server.close();
    })
    
    const data = {
        name: "Usuário Teste",
        email: "test@email.com",
        password: "123"
    }

    it('Deve criar um usuário e retornar status 201', async () => {
        const response = await request(server)
        .post('/user')
        .send( data )
        .expect(201)
        expect( response.body ).toHaveProperty( 'user_id') 
    })

    it('Não deve criar um usuário se body estiver vazio e deve retornar status 400', async () => {
        await request(server)
        .post('/user')
        .send( {} )
        .expect(400)
    })
    
    it('Não deve criar um usuário existente e deve retornar retornar status 400', async () => {
        await request(server)
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
        login = await request(server)
        .post('/login')
        .send( data ) 
    })

    it('Deve retornar erro se não estiver logado e retornar status 401', async () => {
        const response = await request(server)
        .get('/user')
        .expect(401)
        expect( response.body ).toEqual({"error": "O login é requerido"})
    })

    it('Deve retornar dados da conta logada e retornar status 200', async () => {

        const user = await request(server)
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
        login = await request(server)
        .post('/login')
        .send( data ) 
    })
    
    afterAll( async () => {
        await prisma.user.delete({ where: { email: 'test@email.com' }})
    })
    
    it('Deve retornar erro se não estiver logado e retornar status 401', async () => {
        const response = await request(server)
        .patch('/user')
        .expect(401)
        expect( response.body ).toEqual({"error": "O login é requerido"})
    })

    it('Deve atualizar dados da conta logada e retornar status 200', async () => {
        const user = await request(server)
        .patch('/user')
        .send( { name: "Usuário Teste Atualizado" } )
        .set({ Authorization: `Bearer ${login.body.token}`})
        .expect(200)
        expect( user.body.name ).toBe( "Usuário Teste Atualizado" ) 
    })

    it('Deve deletar dados da conta logada e retornar status 204', async () => {
        await request(server)
        .delete('/user')
        .set({ Authorization: `Bearer ${login.body.token}`})
        .expect(204)
    })
});