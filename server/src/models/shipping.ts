import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { order, orderId } from './order';
import type { user_payment, user_paymentId } from './user_payment';

export interface shippingAttributes {
  id: number;
  shipping_method?: string;
  shipping_charge?: number;
  state?: string;
  tracking_number?: string;
  order_id: number;
  user_payment_id: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export type shippingPk = "id";
export type shippingId = shipping[shippingPk];
export type shippingOptionalAttributes = "shipping_method" | "shipping_charge" | "state" | "tracking_number" | "createdAt" | "updatedAt";
export type shippingCreationAttributes = Optional<shippingAttributes, shippingOptionalAttributes>;

export class shipping extends Model<shippingAttributes, shippingCreationAttributes> implements shippingAttributes {
  id!: number;
  shipping_method?: string;
  shipping_charge?: number;
  state?: string;
  tracking_number?: string;
  order_id!: number;
  user_payment_id!: number;
  createdAt?: Date;
  updatedAt?: Date;

  // shipping belongsTo order via order_id
  order!: order;
  getOrder!: Sequelize.BelongsToGetAssociationMixin<order>;
  setOrder!: Sequelize.BelongsToSetAssociationMixin<order, orderId>;
  createOrder!: Sequelize.BelongsToCreateAssociationMixin<order>;
  // shipping belongsTo user_payment via user_payment_id
  user_payment!: user_payment;
  getUser_payment!: Sequelize.BelongsToGetAssociationMixin<user_payment>;
  setUser_payment!: Sequelize.BelongsToSetAssociationMixin<user_payment, user_paymentId>;
  createUser_payment!: Sequelize.BelongsToCreateAssociationMixin<user_payment>;

  static initModel(sequelize: Sequelize.Sequelize): typeof shipping {
    return shipping.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    shipping_method: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    shipping_charge: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    state: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    tracking_number: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    order_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'order',
        key: 'id'
      }
    },
    user_payment_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user_payment',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'shipping',
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
        name: "fk_shipping_order1_idx",
        using: "BTREE",
        fields: [
          { name: "order_id" },
        ]
      },
      {
        name: "fk_shipping_user_payment1_idx",
        using: "BTREE",
        fields: [
          { name: "user_payment_id" },
        ]
      },
    ]
  });
  }
}
