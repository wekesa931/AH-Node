/* eslint-disable @typescript-eslint/explicit-function-return-type */
import * as Sequelize from 'sequelize'
import { SequelizeAttributes } from '../../types/sequelize'

export interface CommentAttributes {
  id?: string
  articleSlug: string
  author: object
  body: string
  likes: number
  dislikes: number
  replies: string[]
  createdAt?: string
  updatedAt?: string
}

export type CommentInstance = Sequelize.Instance<CommentAttributes> & CommentAttributes

export const CommentInit = (sequalize: Sequelize.Sequelize): Sequelize.Model<CommentInstance, CommentAttributes> => {
  const attributes: SequelizeAttributes<CommentAttributes> = {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
    },
    articleSlug: {
      type: Sequelize.STRING,
      references: {
        model: 'Articles',
        key: 'slug',
      },
      onDelete: 'CASCADE',
      onUpdate: 'NO ACTION',
    },
    author: {
      type: Sequelize.JSONB,
    },
    body: {
      type: Sequelize.STRING,
    },
    likes: {
      type: Sequelize.INTEGER,
    },
    dislikes: {
      type: Sequelize.INTEGER,
    },
    replies: {
      type: Sequelize.ARRAY(Sequelize.STRING),
      allowNull: true,
      defaultValue: [],
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
  const Comment = sequalize.define<CommentInstance, CommentAttributes>('Comment', attributes, {
    tableName: 'Comments',
  })

  Comment.associate = ({ Article }) => {
    Comment.belongsTo(Article, {
      foreignKey: 'articleSlug',
      as: 'article',
      onDelete: 'CASCADE',
    })
  }

  return Comment
}
