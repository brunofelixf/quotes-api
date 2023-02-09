import { IUpdateUser } from './../../interfaces/user.d';
import { prisma } from "../../server"
import { hashSync } from 'bcryptjs'
import { NotFoundError, UnauthorizedError } from "../../errors/errorApp"

const updateUserService = async ( 
    user_id: string,
    { name, email, password }: IUpdateUser ) => {

    const user = await prisma.user
        .findUnique({ where: { user_id }})
    
    if( !user ){
        throw new NotFoundError('Usuário não encontrado') }  
    if( user.user_id !== user_id ){
        throw new UnauthorizedError('Você não tem autorização para alterar esse usuário')
    }

    if( password ){
        password = hashSync( password, 8 )
    }

    const userUpdated = await prisma.user
    .update({
        where: { user_id: user.user_id },
        data:{
            name: name ?? user.name,
            email: email ?? user.email,
            password: password ?? user.password,
        },
        select: {
            user_id: true,
                name: true,
                email: true,
                status: true,
                created_at: true,
                updated_at: true
        }
    })
    
    return userUpdated
}

export { updateUserService }