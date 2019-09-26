import { Router } from 'express'
import * as bodyparser from 'body-parser'
import CreateUser from '../controllers/user-controllers/Users'
import LoginUser from '../controllers/user-controllers/login';
import userAuth from '../validations/userAuth'

const jsonParser = bodyparser.json()

export const userRouter = Router()

userRouter
  .route('/auth/user')
  .post(
    jsonParser,
    userAuth.fieldValidation,
    userAuth.emailValidation,
    userAuth.passwordValidation,
    userAuth.checkExistingUser,
    CreateUser.signUp,
  )

userRouter.route('/auth/login').post(jsonParser, userAuth.loginFieldValidation, LoginUser.login)

userRouter.route('/auth/confirmation/:token').get(CreateUser.activateUser)
