import { prisma } from '../../server';
import { ICreateUser } from './../../interfaces/user.d';
import { hashSync } from 'bcryptjs'

const createUserService = async ({
    name,
    email,
    password
}: ICreateUser ) => {

    const alreadyExists = await prisma.user.findUnique({ where: { email } })
    
    if( alreadyExists ){ throw new Error( 'Usuário já existe' ) }

    const user = await prisma.user.create({
        data: {
            name,
            email,
            password: hashSync( password, 8 )
        },
        select: {
            user_id: true,
            name: true,
            email: true,
        }
     })

     if( !user ){ throw new Error( 'Usuário não criado' ) }

     return user
}

export { createUserService }