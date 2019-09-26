import { Router } from 'express'
import * as bodyparser from 'body-parser'
import userAuth from '../validations/userAuth'
import UserProfile from '../controllers/profile-controller/Profile'

const jsonParser = bodyparser.json()

export const profileRouter = Router()

profileRouter
  .route('/profile/:username')
  .get(userAuth.checkUserAuthenticated, UserProfile.getOne)
  .patch(jsonParser, userAuth.checkUserAuthenticated, UserProfile.editItem)

// userRouter.route('/auth/login').post(jsonParser, userAuth.loginFieldValidation, LoginUser.login)

// userRouter.route('/auth/confirmation/:token').get(CreateUser.activateUser)
