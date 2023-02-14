import { prisma } from './../../prisma';
import { IPagination } from './../../interfaces/pagination.d';
import { NotFoundError } from "../../errors/errorApp"


const listQuoteService = async ( 
    user_id: string | undefined,
    { skip, take }: IPagination ) => {
    const quotes = await prisma.quote
        .findMany({
            skip,
            take,
            where: { user_id },
            select: {
                quote_id: true,
                text: true,
                likes: {  select: { user_id: true }},
                user: {  select: { name: true }},
                created_at: true,
            }
        })
        
        if( quotes.length == 0 ){
            throw new NotFoundError("Citações não encontrado")
        }

    return quotes
}

export { listQuoteService }