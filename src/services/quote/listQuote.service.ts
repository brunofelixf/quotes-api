import { NotFoundError } from "../../errors/errorApp"
import { prisma } from "../../server"


const listQuoteService = async ( user_id: string | undefined ) => {
    const quotes = await prisma.quote
        .findMany({
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