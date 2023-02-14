import { prisma } from './../../src/prisma';
import request  from "supertest";
import { Response } from 'superagent';
import { app } from '../../src/app';

describe('Criar Citação | Route', () => {

    const data = {
        email: "test@email2.com",
        password: "123"
    }

    let login: Response
    let quote: { quote_id: any; }

    afterAll( async () => {
        await prisma.quote.delete({ where: { quote_id: quote.quote_id } })
        await prisma.user.delete({ where: { email: 'test@email2.com' }})
        await prisma.$disconnect()

    })  

    it('Deve retornar erro se não estiver logado e retornar status 401', async () => {

        await request(app)
        .post('/user')
        .send( {
            name: "Usuário Teste 2",
            email: "test@email2.com",
            password: "123"
        } )

        login = await request(app)
        .post('/login')
        .send( data ) 

        const response = await request(app)
        .post('/quote')
        .expect(401)
        expect( response.body ).toEqual({"error": "O login é requerido"})
    })

    it('Não deve criar um citação se body estiver vazio e deve retornar status 400', async () => {

        login = await request(app)
        .post('/login')
        .send( data ) 

        const response = await request(app)
        .post('/quote')
        .set({ Authorization: `Bearer ${login.body.token}`})
        .send( {} )
        .expect(400)
        expect( response.body ).toEqual({"message": {"text": "O campo text é obrigatório"}})
    })

    it('Deve criar uma citação e retornar status 201', async () => {
        
        const response = await request(app)
        .post('/quote')
        .set({ Authorization: `Bearer ${login.body.token}`})
        .send( { text: 'Texto da citação teste'} )
        .expect(201)
        expect( response.body ).toHaveProperty( 'quote_id' ) 
        expect( response.body.text ).toEqual( 'Texto da citação teste' )
        quote = response.body
    })    
});

