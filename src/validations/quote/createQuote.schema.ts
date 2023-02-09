import * as yup from 'yup'

const createQuoteSchema = yup.object().shape({
    text: yup
        .string()
        .max(300, "A citação não pode ter mais de 300 caracteres")
        .required("O campo text é obrigatório"),
})

export { createQuoteSchema }