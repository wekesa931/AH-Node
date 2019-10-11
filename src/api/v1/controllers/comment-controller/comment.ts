import { RequestHandler } from 'express'
import db from '../../../../database/models';
import { APIError } from '../../validations/messages';
import jsonResponse from '../../../../utils/jsonResponse';

/* eslint-disable require-jsdoc */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
class CommentFunction {
  public createComment: RequestHandler = async (req, res, next) => {
    console.log('%%%%%%%%%%%%%%%%%%%%I hit here')
    // @ts-ignore
    const { id } = req.currentUser
    const { slug } = req.params
    try {
      const commentAuthor = await db.User.findByPk(id, { attributes: ['firstname', 'lastname', 'username'] })
      const commentItem = await db.Comment.create({
        ...req.body,
        articleSlug: slug,
        userId: id,
        author: commentAuthor,
      })
      return jsonResponse({
        res,
        status: 200,
        comment: commentItem.get(),
      })
    } catch (err) {
      next(APIError.errorResponseMessage(400, 'Oops! Something went wrong', res))
    }
  }
  public getAllComments: RequestHandler = async (req, res, next) => {
    try {
      const { slug } = req.params
      const comments = await db.Comment.findAll({ where: { articleSlug: slug } })
      if (comments) {
        jsonResponse({
          res,
          status: 200,
          comments,
        })
      }
    } catch (err) {
      next(APIError.errorResponseMessage(500, 'Oops! Something went wrong', res))
    }
  }
}

export default new CommentFunction()
