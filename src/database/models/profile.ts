/* eslint-disable @typescript-eslint/explicit-function-return-type */
import * as Sequelize from 'sequelize'
import { SequelizeAttributes } from '../../types/sequelize'

export interface ProfileAttributes {
  id?: string
  userId?: string
  firstname: string
  lastname: string
  email: string
  username: string
  bio?: string
  image?: string
  createdAt?: string
  updatedAt?: string
}

export type ProfileInstance = Sequelize.Instance<ProfileAttributes> & ProfileAttributes

export const ProfileInit = (sequalize: Sequelize.Sequelize): Sequelize.Model<ProfileInstance, ProfileAttributes> => {
  const attributes: SequelizeAttributes<ProfileAttributes> = {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
    },
    userId: {
      allowNull: false,
      type: Sequelize.STRING,
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
    bio: {
      allowNull: true,
      type: Sequelize.STRING,
    },
    image: {
      allowNull: true,
      type: Sequelize.STRING,
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
  const Profile = sequalize.define<ProfileInstance, ProfileAttributes>('Profile', attributes, {
    tableName: 'Profiles',
  })

  Profile.associate = ({ User }) => {
    Profile.belongsTo(User, {
      foreignKey: 'userId',
      as: 'user',
      onDelete: 'CASCADE',
    })
  }
  return Profile
}
