import {body} from 'express-validator'

export const registerValidator = [
  body('name', 'Insira ao menos 2 caracteres').isLength({min: 2}),
  body('email', 'Email não pode ser vazio').not().isEmpty(),
  body('email', 'Email inválido').isEmail(),
]
