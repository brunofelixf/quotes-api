import { loginRequired } from '../../middlewares/loginRequired.middleware';
import { validatorData } from "../../middlewares/validatorData.middleware"
import { createQuoteSchema } from '../../validations/quote/createQuote.schema';
import { createQuoteController } from '../../controllers/quote/createQuote.controller';
import { listQuoteController } from '../../controllers/quote/listQuote.controller';
import { listAllQuotesController } from '../../controllers/quote/listAllQuotes.controller';
import { updateQuoteSchema } from '../../validations/quote/updateQuote.schema';
import { updateQuoteController } from '../../controllers/quote/updateQuote.controller';
import { deleteQuoteController } from '../../controllers/quote/deleteQuote.controller';
import { Router } from 'express';

const quoteRouter =  Router() 

    quoteRouter.post('', loginRequired, validatorData( createQuoteSchema ), createQuoteController)
    quoteRouter.get('', loginRequired, listQuoteController)
    quoteRouter.get('/all', loginRequired, listAllQuotesController)
    quoteRouter.patch('/:quote_id', loginRequired, validatorData( updateQuoteSchema ), updateQuoteController)
    quoteRouter.delete('/:quote_id', loginRequired, deleteQuoteController)

export { quoteRouter }