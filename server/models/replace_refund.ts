import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { order_detail, order_detailId } from './order_detail';
import type { user, userId } from './user';

export interface replace_refundAttributes {
  id: number;
  title?: string;
  contents?: string;
  image_src?: string;
  createdAt?: Date;
  updatedAt?: Date;
  order_detail_id: number;
  user_id: number;
}

export type replace_refundPk = "id";
export type replace_refundId = replace_refund[replace_refundPk];
export type replace_refundOptionalAttributes = "id" | "title" | "contents" | "image_src" | "createdAt" | "updatedAt";
export type replace_refundCreationAttributes = Optional<replace_refundAttributes, replace_refundOptionalAttributes>;

export class replace_refund extends Model<replace_refundAttributes, replace_refundCreationAttributes> implements replace_refundAttributes {
  id!: number;
  title?: string;
  contents?: string;
  image_src?: string;
  createdAt?: Date;
  updatedAt?: Date;
  order_detail_id!: number;
  user_id!: number;

  // replace_refund belongsTo order_detail via order_detail_id
  order_detail!: order_detail;
  getOrder_detail!: Sequelize.BelongsToGetAssociationMixin<order_detail>;
  setOrder_detail!: Sequelize.BelongsToSetAssociationMixin<order_detail, order_detailId>;
  createOrder_detail!: Sequelize.BelongsToCreateAssociationMixin<order_detail>;
  // replace_refund belongsTo user via user_id
  user!: user;
  getUser!: Sequelize.BelongsToGetAssociationMixin<user>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<user, userId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<user>;

  static initModel(sequelize: Sequelize.Sequelize): typeof replace_refund {
    return replace_refund.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    contents: {
      type: DataTypes.STRING(300),
      allowNull: true
    },
    image_src: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    order_detail_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'order_detail',
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
    tableName: 'replace_refund',
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
        name: "fk_replaceandrefund_order_detail1_idx",
        using: "BTREE",
        fields: [
          { name: "order_detail_id" },
        ]
      },
      {
        name: "fk_replaceandrefund_user1_idx",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
    ]
  });
  }
}
