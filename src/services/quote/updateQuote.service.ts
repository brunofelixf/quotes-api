import { IUpdateQuote } from './../../interfaces/quote.d';
import { prisma } from "../../server"
import { NotFoundError, UnauthorizedError } from "../../errors/errorApp"

const updateQuoteService = async ( 
    user_id: string,
    quote_id: string,
    { text }: IUpdateQuote ) => {

    const user = await prisma.user
        .findUnique({ where: { user_id }})
    
    if( !user ){
        throw new NotFoundError('Usuário não encontrado') }  
    if( user.user_id !== user_id ){
        throw new UnauthorizedError('Você não tem autorização para alterar essa citação')
    }

    const quote = await prisma.quote
        .findUnique({ where: { quote_id }})
    
    if( !quote ){
        throw new NotFoundError('Citação não encontrada') }  

    const quoteUpdated = await prisma.quote
        .update({
            where: { quote_id },
            data:{
                text: text ?? quote.text
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