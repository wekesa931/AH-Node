/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable require-jsdoc */
import CrudController from '../../../../utils/crud'
import { APIError } from '../../validations/messages'
import jsonResponse from '../../../../utils/jsonResponse'
import { RequestHandler } from 'express'
import db from '../../../../database/models'
const slugify = require('slug-generator')

class ArticleCrud extends CrudController {
  protected model = 'Article'

  public createArticle: RequestHandler = async (req, res, next) => {
    const articleSlug = slugify(req.body.title)
    const {
      // @ts-ignore
      currentUser: { id: userId },
    } = req
    try {
      const articleAuthor = await db.User.findByPk(userId, { attributes: ['firstname', 'lastname', 'username'] })
      // @ts-ignore
      const newArticle = await db[`${this.model}`].create({
        ...req.body,
        userId,
        slug: articleSlug,
        author: articleAuthor,
      })
      return jsonResponse({
        res,
        status: 200,
        [this.model]: newArticle.get(),
      })
    } catch (err) {
      next(APIError.errorResponseMessage(400, `${err.message}`, res))
    }
  }
  public getSingleArticle: RequestHandler = async (req, res, next) => {
    try {
      const { slug } = req.params
      const article = await db.Article.findOne({
        where: { slug },
      })
      const articleComments = await db.Comment.findAll({
        where: { articleSlug: slug },
      })
      const art = article && article.get()
      const articleDetails = { ...art, comments: articleComments && articleComments }
      article
        ? jsonResponse({
            res,
            status: 200,
            [this.model]: articleDetails,
          })
        : next(APIError.errorResponseMessage(400, 'Article not found', res))
    } catch (err) {
      next(APIError.errorResponseMessage(400, `${err.message}`, res))
    }
  }
  public getAlleArticles: RequestHandler = async (req, res, next) => {
    try {
      const articles = await db.Article.findAll({
        attributes: ['slug', 'image', 'title', 'description', 'taglist', 'rating', 'bookmarked', 'author', 'createdAt'],
      })
      articles
        ? jsonResponse({
            res,
            status: 200,
            Articles: articles,
          })
        : next(APIError.errorResponseMessage(400, 'No article found', res))
    } catch (err) {
      next(APIError.errorResponseMessage(500, 'Oops! Something went wrong', res))
    }
  }
  public editArticle: RequestHandler = async (req, res, next) => {
    // @ts-ignore
    const { id } = req.currentUser
    const { slug } = req.params
    const { body } = req
    const selector = {
      where: { userId: id, slug },
      returning: true,
      plain: true,
    }
    try {
      // @ts-ignore
      const editRelation = await db[`${this.model}`].update(body, selector)
      editRelation
        ? jsonResponse({
            res,
            status: 200,
            [this.model]: editRelation[1],
          })
        : next(APIError.errorResponseMessage(401, `You cannot change this ${this.model}`, res))
    } catch (err) {
      next(APIError.errorResponseMessage(500, `Ooops! An error has occured!`, res))
    }
  }

  public deleteArticle: RequestHandler = async (req, res, next) => {
    // @ts-ignore
    const { id } = req.currentUser
    const { slug } = req.params
    const selector = {
      where: { userId: id, slug },
      returning: true,
      plain: true,
    }
    try {
      // @ts-ignore
      const editRelation = await db[`${this.model}`].destroy(selector)
      editRelation
        ? jsonResponse({
            res,
            status: 200,
            message: 'Article deleted',
          })
        : next(APIError.errorResponseMessage(401, `Article not existing`, res))
    } catch (err) {
      next(APIError.errorResponseMessage(500, `Ooops! An error has occured!`, res))
    }
  }
}

export default new ArticleCrud()
