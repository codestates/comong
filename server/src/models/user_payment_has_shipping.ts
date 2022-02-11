import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { shipping, shippingId } from './shipping';
import type { user_payment, user_paymentId } from './user_payment';

export interface user_payment_has_shippingAttributes {
  user_payment_id: number;
  shipping_id: number;
  shipping_order_id: number;
}

export type user_payment_has_shippingPk = "user_payment_id" | "shipping_id" | "shipping_order_id";
export type user_payment_has_shippingId = user_payment_has_shipping[user_payment_has_shippingPk];
export type user_payment_has_shippingCreationAttributes = user_payment_has_shippingAttributes;

export class user_payment_has_shipping extends Model<user_payment_has_shippingAttributes, user_payment_has_shippingCreationAttributes> implements user_payment_has_shippingAttributes {
  user_payment_id!: number;
  shipping_id!: number;
  shipping_order_id!: number;

  // user_payment_has_shipping belongsTo shipping via shipping_id
  shipping!: shipping;
  getShipping!: Sequelize.BelongsToGetAssociationMixin<shipping>;
  setShipping!: Sequelize.BelongsToSetAssociationMixin<shipping, shippingId>;
  createShipping!: Sequelize.BelongsToCreateAssociationMixin<shipping>;
  // user_payment_has_shipping belongsTo shipping via shipping_order_id
  shipping_order!: shipping;
  getShipping_order!: Sequelize.BelongsToGetAssociationMixin<shipping>;
  setShipping_order!: Sequelize.BelongsToSetAssociationMixin<shipping, shippingId>;
  createShipping_order!: Sequelize.BelongsToCreateAssociationMixin<shipping>;
  // user_payment_has_shipping belongsTo user_payment via user_payment_id
  user_payment!: user_payment;
  getUser_payment!: Sequelize.BelongsToGetAssociationMixin<user_payment>;
  setUser_payment!: Sequelize.BelongsToSetAssociationMixin<user_payment, user_paymentId>;
  createUser_payment!: Sequelize.BelongsToCreateAssociationMixin<user_payment>;

  static initModel(sequelize: Sequelize.Sequelize): typeof user_payment_has_shipping {
    return user_payment_has_shipping.init({
    user_payment_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'user_payment',
        key: 'id'
      }
    },
    shipping_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'shipping',
        key: 'id'
      }
    },
    shipping_order_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'shipping',
        key: 'order_id'
      }
    }
  }, {
    sequelize,
    tableName: 'user_payment_has_shipping',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "user_payment_id" },
          { name: "shipping_id" },
          { name: "shipping_order_id" },
        ]
      },
      {
        name: "fk_user_payment_has_shipping_shipping1_idx",
        using: "BTREE",
        fields: [
          { name: "shipping_id" },
          { name: "shipping_order_id" },
        ]
      },
      {
        name: "fk_user_payment_has_shipping_user_payment1_idx",
        using: "BTREE",
        fields: [
          { name: "user_payment_id" },
        ]
      },
    ]
  });
  }
}
