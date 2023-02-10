import { RequestHandler } from "express"
import { deleteQuoteService } from "../../services/quote/deleteQuote.service";

const deleteQuoteController: RequestHandler = async (req, res) => {
    const { quote_id } = req.params;
    const { user_id } = req.user;

    await deleteQuoteService( user_id, quote_id )
    return res.status(204).send()
}

export { deleteQuoteController }