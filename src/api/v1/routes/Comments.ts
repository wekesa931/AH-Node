import { Router } from 'express'
import * as bodyparser from 'body-parser'
import userAuth from '../validations/userAuth'
import CommentFunction from '../controllers/comment-controller/comment'

const jsonParser = bodyparser.json()

export const commentRouter = Router()

commentRouter
  .route('/comment/:slug')
  .post(jsonParser, userAuth.checkUserAuthenticated, CommentFunction.createComment)
  .get(CommentFunction.getAllComments)
