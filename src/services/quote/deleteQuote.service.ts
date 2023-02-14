import { prisma } from './../../prisma';
import { UnauthorizedError } from './../../errors/errorApp';
import { NotFoundError, BadRequestError } from '../../errors/errorApp';

const deleteQuoteService = async ( user_id: string, quote_id: string ) => {

    const quote = await prisma.quote
        .findUniqueOrThrow({ where: { quote_id }})
        .catch( ()=>{ 
            throw new NotFoundError('Citação não encontrada')
        })
    
    if( quote.user_id !== user_id ){
        throw new UnauthorizedError('Você não tem autorização para deletar essa citação')
    }
    
    await prisma.quote
        .delete({
            where: { quote_id }
        })    
        .catch( () => {
            throw new BadRequestError('Não foi possível deletar a citação')
        })    
}

export { deleteQuoteService }