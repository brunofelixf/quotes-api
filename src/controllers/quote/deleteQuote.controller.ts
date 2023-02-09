import { RequestHandler } from "express"
import { deleteQuoteService } from "../../services/quote/deleteQuote.service";

const deleteQuoteController: RequestHandler = async (req, res) => {
    const { quote_id } = req.params;

    await deleteQuoteService( quote_id )
    return res.status(204).send()
}

export { deleteQuoteController }