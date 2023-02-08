import * as yup from 'yup'
import { ICreateUser } from '../../interfaces/user'

const createUserSchema: yup.SchemaOf<ICreateUser> = yup.object().shape({
    name: yup
        .string()
        .max(100, "O nome não pode ter mais de 100 caracteres")
        .required("O nome é obrigatório"),
    email: yup
        .string()
        .email("O campo deve conter um email")
        .max(100, "O email não pode ter mais de 100 caracteres")
        .required("O email é obrigatório"),
    password: yup
        .string()
        .max(30, "A senha não pode ter mais de 30 caracteres")
        .min(3, "A senha deve ter no mínimo 3 caracteres")
        .required("A senha é obrigatória"),
})

export { createUserSchema }