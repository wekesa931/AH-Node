/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable require-jsdoc */
import { RequestHandler } from 'express'
import bcrypt from 'bcrypt'
import db from '../../../../database/models'
import { APIError } from '../../validations/messages';
import jsonResponse from '../../../../utils/jsonResponse';


const jwt = require('jsonwebtoken')

class LoginUser {
  public login: RequestHandler = async (req, res, next) => {
    const { email, password } = req.body

    const findUser = await db.User.findOne({
      where: {
        email,
        activated: true,
      },
    })
    findUser ?
      this.confirmPassword(findUser, findUser.password, password, res, next)
      : next(APIError.errorResponseMessage(400, 'wrong username or email', res))
  }

  public confirmPassword = (
    user: any, password: string, inputPass: string,  res: any, next: any) => {
    bcrypt.compare(inputPass, password, (err, response) => {
      if (err){
        next(APIError.errorResponseMessage(500, 'Oops! Something went wrong!', res))
      } else {
        response ?
        this.makeAuth(user, res)
        : next(APIError.errorResponseMessage(400, 'wrong username or email', res))
        
        }
    })
  }

  public makeAuth = ({ username, email, id }: { username: string; email: string; id: string }, res: any) => {
    const payload = { username, email, id }
    const options = { expiresIn: '2d' }
    const secret = process.env.JWT_SECRET
    const token = jwt.sign(payload, secret, options)
    return jsonResponse({
      res,
      status: 201,
      message: 'User successfully logged in',
      token,
    })
  }
}

export default new LoginUser()
