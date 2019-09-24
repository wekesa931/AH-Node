/* eslint-disable @typescript-eslint/explicit-function-return-type */
// import chai, { expect } from 'chai'
// import sinonChai from 'sinon-chai'
// import { mockReq, mockRes } from 'sinon-express-mock'
// import { newUser } from './__mocks__/data'
// import db from '../../../../database/models'
// import CreateUser from '../Users'
// import sinon from 'sinon'

// chai.use(sinonChai)

// before(async () => {
//   await db.User.destroy({ where: {}, truncate: true })
//   await db.User.create(newUser)
// })

// after(async () => {
//   await db.User.destroy({ where: {}, truncate: true })
// })

// describe('user.controller', () => {
//   it('It should create a user', async () => {
//     const signUp = {
//       body: newUser,
//     }
//     const req = mockReq(signUp)
//     const res = mockRes()
//     const next = sinon.spy()

//     await CreateUser.signUp(req, res, next)
//     // console.log(res.status)

//     expect(res.status).to.have.been.calledWith(201)
//   })
// })

import chai from 'chai'
import chaiHttp from 'chai-http'
import app from '../../../../../server'
import { newUser } from './__mocks__/data'

chai.use(chaiHttp)
const { expect } = chai

describe('Users Endpoint API Test', () => {
  it('it should signup a valid user', done => {
    chai
      .request(app)
      .post('/v1/auth/user')
      .send(newUser)
      .end((err, res) => {
        console.log('---------->', res)
        expect(res.status).to.equal(201)
        expect(res.body).to.be.a('object')
      })
    done()
  })
})
