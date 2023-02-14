import { prisma } from './../../prisma';
import { User } from '@prisma/client';
import { UnauthorizedError } from './../../errors/errorApp';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { NotFoundError } from '../../errors/errorApp';


const authenticateUserService =
    async ( email: string, password: string ) => {
    const user: User = await prisma.user
        .findUniqueOrThrow({ where: {email} })
        .catch( () => { throw new NotFoundError('Usuário não encontrado')})
    
    if( user.status === 'INACTIVE' ){
        throw new UnauthorizedError('Usuário desativado')
    }
    
    const passwordIsCorrect = await compare( password, user.password );    

    if( !passwordIsCorrect ){
        throw new UnauthorizedError('Email ou Senha inválidos')
    }

    const token = sign(
        {
            name: user.name,
            user_id: user.user_id
        },
            process.env.KEY_TOKEN as string,
        {
            expiresIn: "12h"
        }
    )    

    return token
}

export { authenticateUserService }