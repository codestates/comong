import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { item, itemId } from './item';
import type { user, userId } from './user';

export interface item_reviewAttributes {
  id: number;
  contents?: string;
  image_src?: string;
  score?: number;
  createdAt?: Date;
  updatedAt?: Date;
  item_id: number;
  user_id: number;
}

export type item_reviewPk = "id";
export type item_reviewId = item_review[item_reviewPk];
export type item_reviewOptionalAttributes = "id" | "contents" | "image_src" | "score" | "createdAt" | "updatedAt";
export type item_reviewCreationAttributes = Optional<item_reviewAttributes, item_reviewOptionalAttributes>;

export class item_review extends Model<item_reviewAttributes, item_reviewCreationAttributes> implements item_reviewAttributes {
  id!: number;
  contents?: string;
  image_src?: string;
  score?: number;
  createdAt?: Date;
  updatedAt?: Date;
  item_id!: number;
  user_id!: number;

  // item_review belongsTo item via item_id
  item!: item;
  getItem!: Sequelize.BelongsToGetAssociationMixin<item>;
  setItem!: Sequelize.BelongsToSetAssociationMixin<item, itemId>;
  createItem!: Sequelize.BelongsToCreateAssociationMixin<item>;
  // item_review belongsTo user via user_id
  user!: user;
  getUser!: Sequelize.BelongsToGetAssociationMixin<user>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<user, userId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<user>;

  static initModel(sequelize: Sequelize.Sequelize): typeof item_review {
    return item_review.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    contents: {
      type: DataTypes.STRING(300),
      allowNull: true
    },
    image_src: {
      type: DataTypes.STRING(300),
      allowNull: true
    },
    score: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    item_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'item',
        key: 'id'
      }
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'item_review',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "fk_item_review_item1_idx",
        using: "BTREE",
        fields: [
          { name: "item_id" },
        ]
      },
      {
        name: "fk_item_review_user1_idx",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
    ]
  });
  }
}
