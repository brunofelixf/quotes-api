import * as yup from 'yup'

const updateQuoteSchema = yup.object().shape({
    text: yup
        .string()
        .max(300, "A citação não pode ter mais de 300 caracteres")
        .notRequired()
})

export { updateQuoteSchema }