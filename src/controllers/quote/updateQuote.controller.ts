import { IUpdateQuote } from './../../interfaces/quote.d';
import { Request, Response } from "express"
import { updateQuoteService } from '../../services/quote/updateQuote.service';


const updateQuoteController = async ( req: Request, res: Response ) => {
    const { quote_id } = req.params;
    const { user_id } = req.user;
    const data: IUpdateQuote = req.body;

    const user = await updateQuoteService( user_id, quote_id, data )
    return res.json( user )
}

export { updateQuoteController }