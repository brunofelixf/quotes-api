import { ICreateQuote } from './../../interfaces/quote.d';
import { BadRequestError } from '../../errors/errorApp';
import { prisma } from '../../server';

const createQuoteService = async ({ user_id, text }: ICreateQuote ) => {

    const user = await prisma.user.findUnique({ where: { user_id } })
    
    if( !user ){ throw new BadRequestError( 'Usuário não existe' ) }

    const quote = await prisma.quote.create({
        data: {
           text,
           user: { connect: { user_id } }
        },
        select: {
            quote_id: true,
            text: true,
            created_at: true
        }
     })

     if( !quote ){
        throw new BadRequestError('Não foi possível criar a citação')
     }

     return quote
}

export { createQuoteService }