import { prisma } from './../../prisma';
import { NotFoundError, BadRequestError } from './../../errors/errorApp';

const deleteUserService = async ( user_id: string ) => {

    await prisma.user
        .findUniqueOrThrow({ where: { user_id }})
        .catch( ()=>{ 
            throw new NotFoundError('Usuário não encontrado')
        })
    
    await prisma.user
        .update({
            where: { user_id },
            data: {
                status: 'INACTIVE',
                deleted_at: new Date()
            }
        })    
        .catch( () => {
            throw new BadRequestError('Não foi possível deletar o produto')
        })    
}

export { deleteUserService }