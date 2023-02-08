import { ILoginUser } from './../../interfaces/user.d';
import { Request, Response } from "express"
import { authenticateUserService } from "../../services/session/session.service";

const authenticateUserController = 
    async ( req: Request, res: Response ) => {
        const { email , password }: ILoginUser = req.body;
        const token = await authenticateUserService( email, password );        
        return res.json({ token: token } );
}

export { authenticateUserController }