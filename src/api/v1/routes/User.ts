import { Router } from 'express'
import * as bodyparser from 'body-parser'
import CreateUser from '../controllers/Users'
import userAuth from '../validations/userAuth'

const jsonParser = bodyparser.json()

export const userRouter = Router()

userRouter.route('/auth/user')
  .post(
    jsonParser,
    userAuth.fieldValidation,
    userAuth.emailValidation,
    userAuth.passwordValidation,
    userAuth.checkExistingUser,
    CreateUser.signUp
  )

userRouter.route('/auth/confirmation/:token')
  .get(CreateUser.activateUser)
