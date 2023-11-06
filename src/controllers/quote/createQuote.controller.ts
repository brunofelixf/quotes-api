import { ICreateQuote } from './../../interfaces/quote.d';
import { Request, Response } from "express"
import { createQuoteService } from '../../services/quote/createQuote.service';


const createQuoteController = async (req: Request, res: Response) => {
        const { text } = req.body;
        const { user_id } = req.user;

        const data: ICreateQuote = { user_id, text }
                
        const quote = await createQuoteService( data  );
        return res.status(201).json( quote );
}

export { createQuoteController }

//teste