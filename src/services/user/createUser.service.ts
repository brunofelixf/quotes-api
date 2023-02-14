import { prisma } from './../../prisma';
import { BadRequestError } from './../../errors/errorApp';
import { ICreateUser } from './../../interfaces/user.d';
import { hashSync } from 'bcryptjs'

const createUserService = async ({
    name,
    email,
    password
}: ICreateUser ) => {

    const alreadyExists = await prisma.user.findUnique({ where: { email } })
    
    if( alreadyExists ){ throw new BadRequestError( 'Usuário já existe' ) }

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

     if( !user ){
        throw new BadRequestError('Não foi possível criar o usuário')
     }

     return user
}

export { createUserService }