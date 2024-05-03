import {body} from 'express-validator'

export const registerValidator = [
  body('name', 'The minimum name length is 2 characters').isLength({min: 2}),
  body('email', 'Invalid does not Empty').not().isEmpty(),
  body('email', 'Invalid email').isEmail(),
  body('email', 'Invalid email').isEmail(),
]
