
import { RequestHandler } from 'express'
import uuid from 'uuid/v4'
import bcrypt from 'bcrypt'
import db from '../../../../database/models'
import jsonResponse from '../../../../utils/jsonResponse'
import userAuth from '../../validations/userAuth'

const jwt = require('jsonwebtoken')

const JWT_SECRET = process.env['JWT_SECRET']

class CreateUser {
  public signUp: RequestHandler = async (req, res, next) => {
    const { firstname, lastname, email, username, password } = req.body
    await bcrypt.hash(password, 10, function(err, hash) {
      const newUser = {
        id: uuid(),
        firstname,
        lastname,
        username,
        email,
        password: hash,
      }
      const addUser = db.User.create(newUser)
      if (addUser) {
        userAuth.jwtEncode(res, email, username)
      }
    })
  }
  public activateUser: RequestHandler = async (req, res) => {
    try {
      const { username } = jwt.verify(req.params.token, JWT_SECRET)
      await db.User.update({ activated: true }, { where: { username } })
      return jsonResponse({
        res,
        status: 201,
        message: 'User successfully activated',
      })
    } catch (error) {
      res.send(error)
    }
  }
}

export default new CreateUser()
