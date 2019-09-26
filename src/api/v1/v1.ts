import { Router } from 'express'
import { logger } from '../../utils/logger'
import { userRouter } from './routes/User'
import { profileRouter } from './routes/Profile'

export const routerV1 = Router()

routerV1.use(logger)

routerV1.get('/', (req, res) => {
  res.send('Welcome to Authors Haven')
})
routerV1.use(userRouter)
routerV1.use(profileRouter)
