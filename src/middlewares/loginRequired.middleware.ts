import { IDecodedUser } from './../interfaces/user.d';
import { UnauthorizedError } from './../errors/errorApp';
import { RequestHandler } from "express";
import { verify } from 'jsonwebtoken';

export const loginRequired: RequestHandler = async ( req, res, next ) => {
    const { authorization } = req.headers;

    if( !authorization ){ 
        throw new UnauthorizedError('O login é requerido')
    }

    const token = authorization.split(' ')[1];

    try {
        const data = verify( token, process.env.KEY_TOKEN as string )
        
        const { name, user_id } = data as IDecodedUser;

        req.user = {
            name,
            user_id
        }

        return next();
    } catch (error: any) {
        return res.status(401).json( { error: error.message } )
    }
}