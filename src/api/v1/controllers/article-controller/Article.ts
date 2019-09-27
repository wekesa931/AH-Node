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
      next(APIError.errorResponseMessage(400, 'Oops! Something went wrong', res))
    }
  }
}

export default new ArticleCrud()
