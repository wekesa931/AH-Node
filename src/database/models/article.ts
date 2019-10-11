/* eslint-disable @typescript-eslint/explicit-function-return-type */
import * as Sequelize from 'sequelize'
import { SequelizeAttributes } from '../../types/sequelize'

export interface ArticleAttributes {
  id?: string
  slug?: string
  userId?: string
  image?: string
  title: string
  comments: object[]
  description: string
  body: string
  taglist: string[]
  rating?: number
  bookmarked?: boolean
  favoritesCount?: number
  author?: object
  createdAt?: string
  updatedAt?: string
}

export type ArticleInstance = Sequelize.Instance<ArticleAttributes> & ArticleAttributes

export const ArticleInit = (sequalize: Sequelize.Sequelize): Sequelize.Model<ArticleInstance, ArticleAttributes> => {
  const attributes: SequelizeAttributes<ArticleAttributes> = {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
    },
    slug: {
      type: Sequelize.STRING,
    },
    userId: {
      type: Sequelize.UUID,
      references: {
        model: 'Users',
        key: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'NO ACTION',
    },
    image: {
      type: Sequelize.STRING,
    },
    title: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING,
    },
    body: {
      type: Sequelize.TEXT,
    },
    taglist: {
      type: Sequelize.ARRAY(Sequelize.STRING),
      allowNull: true,
      defaultValue: [],
    },
    comments: {
      type: Sequelize.ARRAY(Sequelize.STRING),
      allowNull: true,
      defaultValue: [],
    },
    rating: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    bookmarked: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    favoritesCount: {
      type: Sequelize.INTEGER,
    },
    author: {
      type: Sequelize.JSONB,
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
  const Article = sequalize.define<ArticleInstance, ArticleAttributes>('Article', attributes, {
    tableName: 'Articles',
  })

  Article.associate = ({ User }) => {
    Article.belongsTo(User, {
      foreignKey: 'userId',
      as: 'user',
      onDelete: 'CASCADE',
    })
  }

  return Article
}
