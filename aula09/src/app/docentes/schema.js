import * as yup from "yup"
export const DocenteSchema = yup.object({
    nome: yup.string()
        .min(2, 'O nome deve possuir, no mínimo, 2 caracteres')
        .max(100, 'O nome deve possuir, no máximo, 100 caracteres')
        .required('O nome é obrigatório'),
    email: yup.string()
        .min(2, 'O e-mail deve possuir, no mínimo, 2 caracteres')
        .max(100, 'O e-mail deve possuir, no máximo, 100 caracteres')
        .required('O e-mail é obrigatório'),
}).required();