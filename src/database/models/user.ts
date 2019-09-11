import * as Sequelize from 'sequelize'
import { SequelizeAttributes } from '../../types/sequelize'

export interface UserAttributes {
  id?: string
  firstname: number
  lastname: string
  email: number
  username: string
  password: string
  activated?: boolean
  createdAt?: string
  updatedAt?: string
}

export type UserInstance = Sequelize.Instance<UserAttributes> & UserAttributes

export const UserInit = (sequalize: Sequelize.Sequelize): Sequelize.Model<UserInstance, UserAttributes> => {
  const attributes: SequelizeAttributes<UserAttributes> = {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
    },
    firstname: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    lastname: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    email: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    username: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    password: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    activated: {
      allowNull: false,
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }
  const User = sequalize.define<UserInstance, UserAttributes>('User', attributes, {
    tableName: 'Users',
  })

  return User
}
