import { Router } from 'express'
import * as bodyparser from 'body-parser'
import { apiCreateUser, activateUser } from '../controllers/Users'

const jsonParser = bodyparser.json()

export const userRouter = Router()

userRouter.route('/auth/user').post(jsonParser, apiCreateUser)

userRouter.route('/auth/confirmation/:token').get(activateUser)
