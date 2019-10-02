import { Router } from 'express'
import * as bodyparser from 'body-parser'
import userAuth from '../validations/userAuth'
import ArticleCrud from '../controllers/article-controller/Article'

const jsonParser = bodyparser.json()

export const articleRouter = Router()

articleRouter
  .route('/article')
  .post(jsonParser, userAuth.checkUserAuthenticated, ArticleCrud.createArticle)
  .get(ArticleCrud.getAlleArticles)

articleRouter
  .route('/article/:slug')
  .get(ArticleCrud.getSingleArticle)
  .patch(jsonParser, userAuth.checkUserAuthenticated, ArticleCrud.editArticle)
  .delete(userAuth.checkUserAuthenticated, ArticleCrud.deleteArticle)
