import { RequestHandler } from 'express'
import uuid from 'uuid/v4'
import bcrypt from 'bcrypt'
import nodemailer from 'nodemailer'
import { Op } from 'sequelize'
import * as EmailValidator from 'email-validator'
import db from '../../../database/models'
import jsonResponse from '../../../utils/jsonResponse'

const jwt = require('jsonwebtoken')
var passwordValidator = require('password-validator')

const JWT_SECRET = process.env['JWT_SECRET']

export const apiCreateUser: RequestHandler = async (req, res, next) => {
  const requiredFields = ['firstname', 'lastname', 'email', 'username', 'password']
  const givenFields = Object.getOwnPropertyNames(req.body)
  if (!requiredFields.every(field => givenFields.includes(field))) {
    let missingField = requiredFields.filter(item => givenFields.indexOf(item) == -1)
    return jsonResponse({
      res,
      status: 400,
      missingFields: missingField,
    })
  }
  const { firstname, lastname, email, username, password } = req.body

  //Email validation
  !EmailValidator.validate(email) &&
    jsonResponse({
      res,
      status: 400,
      message: 'invalid email',
    })

  //password validation
  var schema = new passwordValidator()
  schema
    .is()
    .min(8) // Minimum length 8
    .is()
    .max(100) // Maximum length 100
    .has()
    .uppercase() // Must have uppercase letters
    .has()
    .lowercase() // Must have lowercase letters
    .has()
    .digits() // Must have digits
    .has()
    .not()
    .spaces() // Should not have spaces
    .is()
    .not()
    .oneOf(['Passw0rd', 'Password123']) // Blacklist these values
  !schema.validate(password) &&
    jsonResponse({
      res,
      status: 400,
      message: 'invalid password',
    })

  //Unique validation
  const availableUsers = await db.User.findAll({
    where: {
      [Op.or]: [{ username: username }, { email: email }],
    },
  })
  if (availableUsers.length > 0) {
    return jsonResponse({
      res,
      status: 400,
      message: 'email / username already existing',
    })
  }
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
      const authItems = {
        username,
        email,
      }

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'wekesabill@gmail.com',
          pass: 'tintinabulation',
        },
        tls: {
          rejectUnauthorized: false,
        },
      })
      jwt.sign({ username, email }, JWT_SECRET, { expiresIn: '1d' }, (err: any, mailToken: string) => {
        const url = `http://localhost:8000/v1/auth/confirmation/${mailToken}`
        transporter.sendMail(
          {
            to: email,
            subject: 'Confirm Email',
            html: `Please click this email to confirm your email: <a href="${url}">${url}</a>`,
          },
          (error: any, info: any) => {
            if (error) {
              console.log(error)
            } else {
              console.log('Email sent: ' + info.response)
            }
          },
        )
        return jsonResponse({
          res,
          status: 201,
          message: 'User successfully created',
        })
      })
    }
  })
}

export const activateUser: RequestHandler = async (req, res, next) => {
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
