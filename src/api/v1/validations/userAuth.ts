/* eslint-disable require-jsdoc */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/class-name-casing */
import nodemailer from 'nodemailer'
import * as EmailValidator from 'email-validator'
const jwt = require('jsonwebtoken')
let passwordValidator: any = require('password-validator')

import commonValidators from './common';
import jsonResponse from "../../../utils/jsonResponse";
import { RequestHandler } from 'express-serve-static-core';
import { APIError } from './messages';
import db from '../../../database/models';
const JWT_SECRET = process.env['JWT_SECRET']

class userAuth {
  public checkExistingUser: RequestHandler = (req, res, next): any => {
    const {
      email,
      username,} = req.body
      const User = db.User
    commonValidators.verifyDuplication([{email},{username}], 'User', res, next)
  }
  public fieldValidation: RequestHandler = (req, res, next): any => {
    const requiredFields = ['firstname', 'lastname', 'email', 'username', 'password']
    commonValidators.verifyFields(requiredFields, req.body, res, next)
  }
  private transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'wekesabill@gmail.com',
      pass: 'tintinabulation',
    },
    tls: {
      rejectUnauthorized: false,
    },
  })
  public jwtEncode = (res: any, email?: string, username?: string) => {
    jwt.sign({ username, email }, JWT_SECRET, { expiresIn: '1d' }, (err: any, mailToken: string) => {
      const url = `http://localhost:8000/v1/auth/confirmation/${mailToken}`
      this.transporter.sendMail(
        {
          to: email,
          subject: 'Confirm Email',
          html: `Please click this email to confirm your email: <a href="${url}">${url}</a>`,
        },
        (error: any, info: any) => {
          if (error) {
            return jsonResponse({
              res,
              status: 400,
              message: 'An error has occured',
            })
          } else {
            return jsonResponse({
              res,
              status: 201,
              message: 'An email has been sent to your account',
            })
          }
        },
      )
    })
  }
  public emailValidation: RequestHandler = (req, res, next): any => {
    EmailValidator.validate(req.body.email) ? next() : next(APIError.errorResponseMessage(
      400,
      'Invalid Email',
      res))
  }
  public passwordValidation: RequestHandler = (req, res, next): any => {
    const schema = new passwordValidator()
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
    schema.validate(req.body.password) ? next() : next(APIError.errorResponseMessage(
        400,
        'A password must have at least a capital and small letter, a number and a minimum of 8 characters. It should not be obvious e.g Password',
        res))
  }

}

export default new userAuth()