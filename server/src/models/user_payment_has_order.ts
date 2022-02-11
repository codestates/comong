import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { order, orderId } from './order';
import type { user_payment, user_paymentId } from './user_payment';

export interface user_payment_has_orderAttributes {
  user_payment_id: number;
  order_id: number;
}

export type user_payment_has_orderPk = "user_payment_id" | "order_id";
export type user_payment_has_orderId = user_payment_has_order[user_payment_has_orderPk];
export type user_payment_has_orderCreationAttributes = user_payment_has_orderAttributes;

export class user_payment_has_order extends Model<user_payment_has_orderAttributes, user_payment_has_orderCreationAttributes> implements user_payment_has_orderAttributes {
  user_payment_id!: number;
  order_id!: number;

  // user_payment_has_order belongsTo order via order_id
  order!: order;
  getOrder!: Sequelize.BelongsToGetAssociationMixin<order>;
  setOrder!: Sequelize.BelongsToSetAssociationMixin<order, orderId>;
  createOrder!: Sequelize.BelongsToCreateAssociationMixin<order>;
  // user_payment_has_order belongsTo user_payment via user_payment_id
  user_payment!: user_payment;
  getUser_payment!: Sequelize.BelongsToGetAssociationMixin<user_payment>;
  setUser_payment!: Sequelize.BelongsToSetAssociationMixin<user_payment, user_paymentId>;
  createUser_payment!: Sequelize.BelongsToCreateAssociationMixin<user_payment>;

  static initModel(sequelize: Sequelize.Sequelize): typeof user_payment_has_order {
    return user_payment_has_order.init({
    user_payment_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'user_payment',
        key: 'id'
      }
    },
    order_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'order',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'user_payment_has_order',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "user_payment_id" },
          { name: "order_id" },
        ]
      },
      {
        name: "fk_user_payment_has_order_order1_idx",
        using: "BTREE",
        fields: [
          { name: "order_id" },
        ]
      },
      {
        name: "fk_user_payment_has_order_user_payment1_idx",
        using: "BTREE",
        fields: [
          { name: "user_payment_id" },
        ]
      },
    ]
  });
  }
}
