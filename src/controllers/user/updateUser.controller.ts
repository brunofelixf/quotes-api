import { IUpdateUser } from './../../interfaces/user.d';
import { Request, Response } from "express"
import { updateUserService } from "../../services/user/updateUser.service";


const updateUserController = async ( req: Request, res: Response ) => {
    const { user_id } = req.user;
    const data: IUpdateUser = req.body;

    const user = await updateUserService( user_id, data )
    return res.json( user )
}

export { updateUserController }