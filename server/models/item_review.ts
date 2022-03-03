import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { order_detail, order_detailId } from './order_detail';
import type { user, userId } from './user';

export interface item_reviewAttributes {
  id: number;
  contents?: string;
  image_src?: string;
  score?: number;
  createdAt?: Date;
  updatedAt?: Date;
  user_id: number;
  order_detail_id: number;
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
  user_id!: number;
  order_detail_id!: number;

  // item_review belongsTo order_detail via order_detail_id
  order_detail!: order_detail;
  getOrder_detail!: Sequelize.BelongsToGetAssociationMixin<order_detail>;
  setOrder_detail!: Sequelize.BelongsToSetAssociationMixin<order_detail, order_detailId>;
  createOrder_detail!: Sequelize.BelongsToCreateAssociationMixin<order_detail>;
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
      type: DataTypes.TEXT,
      allowNull: true
    },
    score: {
      type: DataTypes.SMALLINT,
      allowNull: true,
      defaultValue: 0
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    order_detail_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'order_detail',
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
        name: "fk_item_review_user1_idx",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
      {
        name: "fk_item_review_order_detail1_idx",
        using: "BTREE",
        fields: [
          { name: "order_detail_id" },
        ]
      },
    ]
  });
  }
}
