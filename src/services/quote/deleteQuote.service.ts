import { NotFoundError, BadRequestError } from '../../errors/errorApp';
import { prisma } from "../../server"

const deleteQuoteService = async ( quote_id: string ) => {

    await prisma.quote
        .findUniqueOrThrow({ where: { quote_id }})
        .catch( ()=>{ 
            throw new NotFoundError('Citação não encontrada')
        })
    
    await prisma.quote
        .delete({
            where: { quote_id }
        })    
        .catch( () => {
            throw new BadRequestError('Não foi possível deletar a citação')
        })    
}

export { deleteQuoteService }