import { Request, Response } from "express"
import { listQuoteService } from "../../validations/quote/listQuote.service"


const listQuoteController = async (req: Request, res: Response) => {
        const { user_id } = req.user     
           
        const quote = await listQuoteService( user_id )
        return res.json( quote )
}

export { listQuoteController }