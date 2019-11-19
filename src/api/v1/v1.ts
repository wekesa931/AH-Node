import { Router } from 'express'
import { logger } from '../../utils/logger'
import { userRouter } from './routes/User'
import { profileRouter } from './routes/Profile'
import { articleRouter } from './routes/Article'

export const routerV1 = Router()

routerV1.use(logger)

routerV1.get('/', (req, res) => {
  res.send('Welcome to Authors Haven')
})
routerV1.use(userRouter)
routerV1.use(profileRouter)
routerV1.use(articleRouter)
