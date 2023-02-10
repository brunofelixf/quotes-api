import { IPagination } from './../../interfaces/pagination.d';
import { NotFoundError } from "../../errors/errorApp"
import { prisma } from "../../server"


const listAllQuotesService = async ( {skip, take}: IPagination) => {
    const quotes = await prisma.quote
        .findMany({
            skip: skip,
            take: take,
            orderBy: { created_at: 'desc' },
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

export { listAllQuotesService }