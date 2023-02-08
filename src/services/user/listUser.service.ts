import { NotFoundError } from "../../errors/errorApp"
import { prisma } from "../../server"


const listUserService = async ( user_id: string | undefined ) => {
    const user = await prisma.user
        .findMany({
            where: { user_id },
            select: {
                user_id: true,
                name: true,
                email: true,
                status: true,
                quotes: true,
            }
        })
        
        if( user.length == 0 ){
            throw new NotFoundError("Usuário não encontrado")
        }

    return user
}

export { listUserService }