import { RequestHandler } from "express"
import { deleteUserService } from "../../services/user/deleteUser.service";

const deleteUserController: RequestHandler = async (req, res) => {
    const { user_id } = req.user;

    await deleteUserService( user_id )
    return res.status(204).send()
}

export { deleteUserController }