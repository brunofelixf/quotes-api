import { IPagination } from './../../interfaces/pagination.d';
import { Request, Response } from "express"
import { listQuoteService } from "../../services/quote/listQuote.service"


const listQuoteController = async (req: Request, res: Response) => {
        const { user_id } = req.user
        let { skip, take }: IPagination = req.query
        
        skip = skip ? +skip : undefined
        take = take ? +take : undefined   
           
        const quote = await listQuoteService( user_id, { skip, take } )
        return res.json( quote )
}

export { listQuoteController }