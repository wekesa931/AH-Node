import { Router } from 'express'
import * as bodyparser from 'body-parser'
import userAuth from '../validations/userAuth'
import ArticleCrud from '../controllers/article-controller/Article'

const jsonParser = bodyparser.json()

export const articleRouter = Router()

articleRouter.route('/article').post(jsonParser, userAuth.checkUserAuthenticated, ArticleCrud.createArticle)
