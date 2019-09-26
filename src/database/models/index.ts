import Sequelize from 'sequelize'
import dotenv from 'dotenv'
import { UserInit, UserAttributes, UserInstance } from './user'
import { ProfileInit, ProfileAttributes, ProfileInstance } from './profile'

dotenv.config()

const DBConfig = require('../config/config')
const env = process.env.NODE_ENV || 'development'
const config = DBConfig[env]

const sequelize = new Sequelize(config.url as string, config)

interface Database {
  sequelize: Sequelize.Sequelize
  Sequelize: Sequelize.SequelizeStatic
  User: Sequelize.Model<UserInstance, UserAttributes>
  Profile: Sequelize.Model<ProfileInstance, ProfileAttributes>
}

const db: Database = {
  sequelize,
  Sequelize: Sequelize.Sequelize,
  User: UserInit(sequelize),
  Profile: ProfileInit(sequelize),
}

Object.keys(db).forEach((modelName): void => {
  // @ts-ignore
  if (db[modelName].associate) {
    // @ts-ignore
    db[modelName].associate(db)
  }
})

export default db
