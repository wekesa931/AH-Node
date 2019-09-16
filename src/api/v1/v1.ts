import { Router } from 'express'
import { logger } from '../../utils/logger'
import { userRouter } from './routes/User'

export const routerV1 = Router()

routerV1.use(logger)

routerV1.get('/', (req, res) => {
  res.send('Welcome to Authors Haven')
})
routerV1.use(userRouter)
