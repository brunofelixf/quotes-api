import { IPagination } from './../../interfaces/pagination.d';
import { Request, Response } from "express"
import { listAllQuotesService } from "../../services/quote/listAllQuotes.service"


const listAllQuotesController = async (req: Request, res: Response) => {
        let { skip, take }: IPagination = req.query
        
        skip = skip ? +skip : undefined
        take = take ? +take : undefined
           
        const quote = await listAllQuotesService({ skip, take })
        return res.json( quote )
}

export { listAllQuotesController }