import { NextFunction, Request, Response } from 'express';
import { AnySchema, ValidationError } from 'yup';

const validatorDataMiddleware = (schema: AnySchema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;
      const validatedData = await schema.validate( data, { abortEarly: false });
      req.body = validatedData;
      next();
    } catch ( error ) {

      const yupError = error as ValidationError;
      const errors: Record<string, string> = {};
      
      yupError.inner.forEach( error => {
        if ( error.path === undefined ) return;
          errors[error.path] = error.message;
      });

      return res.status(400).json({ message: errors });
    }
  };
export { validatorDataMiddleware };