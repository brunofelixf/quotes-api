import { prisma } from './../../prisma';
import { IUpdateQuote } from './../../interfaces/quote.d';
import { NotFoundError, UnauthorizedError } from "../../errors/errorApp"

const updateQuoteService = async ( 
    user_id: string,
    quote_id: string,
    { text }: IUpdateQuote ) => {

    const quote = await prisma.quote
        .findUnique({ where: { quote_id }})
    
    if( !quote ){
        throw new NotFoundError('Citação não encontrada') }
    
    if( quote.user_id !== user_id ){
        throw new UnauthorizedError('Você não tem autorização para alterar essa citação')
    }

    const quoteUpdated = await prisma.quote
        .update({
            where: { quote_id },
            data:{
                text
            },
            select: {
                quote_id: true,
                text: true,
                likes: true,
                created_at: true,
                updated_at: true
            }
        })
    
    return quoteUpdated
}

export { updateQuoteService }