import { ILoginUser } from './../../interfaces/user.d';
import * as yup from 'yup'

const loginUserSchema: yup.SchemaOf<ILoginUser> = yup.object().shape({
    email: yup
        .string()
        .email("O campo deve conter um email")
        .max(100, "O email não pode ter mais de 100 caracteres")
        .required("O campo email é obrigatório"),
    password: yup
        .string()
        .max(30, "A senha não pode ter mais de 30 caracteres")
        .min(3, "A senha deve ter no mínimo 3 caracteres")
        .required("O campo senha é obrigatória"),
})

export { loginUserSchema }