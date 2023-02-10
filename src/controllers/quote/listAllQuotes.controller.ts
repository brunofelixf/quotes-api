import { Request, Response } from "express"
import { listAllQuotesService } from "../../services/quote/listAllQuotes.service"


const listAllQuotesController = async (req: Request, res: Response) => {
        const { user_id } = req.user     
           
        const quote = await listAllQuotesService( user_id )
        return res.json( quote )
}

export { listAllQuotesController }