import {body} from 'express-validator'

export const loginValidator = [
  body('email', 'Email não pode ser vazio').not().isEmpty(),
  body('email', 'Email inválido').isEmail(),
  body('password', 'Senha incorreta').isLength({min: 6}),
]
