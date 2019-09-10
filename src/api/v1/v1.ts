import { Router } from 'express'
import { logger } from '../../utils/logger'

export const routerV1 = Router()

routerV1.use(logger)

routerV1.get('/', (req, res) => {
  res.send('Welcome to Authors Haven')
})
