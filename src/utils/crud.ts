/* eslint-disable require-jsdoc */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { RequestHandler } from 'express'
const slugify = require('slug-generator')
import db from '../database/models'
import jsonResponse from './jsonResponse'
import { APIError } from '../api/v1/validations/messages'

export default class CrudController {
  protected model: string = ''

  public getOne: RequestHandler = async (req, res, next) => {
    const { username } = req.params
    try {
      // @ts-ignore
      const singleItem = await db[`${this.model}`].findOne({
        where: { username },
      })
      return jsonResponse({
        res,
        status: 200,
        [this.model]: singleItem.get(),
      })
    } catch (err) {
      next(APIError.errorResponseMessage(400, 'Username does not exist ', res))
    }
  }
  public editItem: RequestHandler = async (req, res, next) => {
    // @ts-ignore
    const { id } = req.currentUser
    const { username } = req.params
    const { body } = req
    const selector = {
      where: { userId: id, username },
      returning: true,
      plain: true,
    }
    try {
      // @ts-ignore
      const editRelation = await db[`${this.model}`].update(body, selector)
      return jsonResponse({
        res,
        status: 200,
        [this.model]: editRelation[1],
      })
    } catch (err) {
      next(APIError.errorResponseMessage(401, `You cannot change this ${this.model}`, res))
    }
  }
}
