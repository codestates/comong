import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { order, orderId } from './order';
import type { user_payment_has_shipping, user_payment_has_shippingId } from './user_payment_has_shipping';

export interface shippingAttributes {
  id: number;
  shipping_method?: string;
  shipping_charge?: number;
  state?: string;
  tracking_number?: string;
  order_id: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export type shippingPk = "id" | "order_id";
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
  createdAt?: Date;
  updatedAt?: Date;

  // shipping belongsTo order via order_id
  order!: order;
  getOrder!: Sequelize.BelongsToGetAssociationMixin<order>;
  setOrder!: Sequelize.BelongsToSetAssociationMixin<order, orderId>;
  createOrder!: Sequelize.BelongsToCreateAssociationMixin<order>;
  // shipping hasMany user_payment_has_shipping via shipping_id
  user_payment_has_shippings!: user_payment_has_shipping[];
  getUser_payment_has_shippings!: Sequelize.HasManyGetAssociationsMixin<user_payment_has_shipping>;
  setUser_payment_has_shippings!: Sequelize.HasManySetAssociationsMixin<user_payment_has_shipping, user_payment_has_shippingId>;
  addUser_payment_has_shipping!: Sequelize.HasManyAddAssociationMixin<user_payment_has_shipping, user_payment_has_shippingId>;
  addUser_payment_has_shippings!: Sequelize.HasManyAddAssociationsMixin<user_payment_has_shipping, user_payment_has_shippingId>;
  createUser_payment_has_shipping!: Sequelize.HasManyCreateAssociationMixin<user_payment_has_shipping>;
  removeUser_payment_has_shipping!: Sequelize.HasManyRemoveAssociationMixin<user_payment_has_shipping, user_payment_has_shippingId>;
  removeUser_payment_has_shippings!: Sequelize.HasManyRemoveAssociationsMixin<user_payment_has_shipping, user_payment_has_shippingId>;
  hasUser_payment_has_shipping!: Sequelize.HasManyHasAssociationMixin<user_payment_has_shipping, user_payment_has_shippingId>;
  hasUser_payment_has_shippings!: Sequelize.HasManyHasAssociationsMixin<user_payment_has_shipping, user_payment_has_shippingId>;
  countUser_payment_has_shippings!: Sequelize.HasManyCountAssociationsMixin;
  // shipping hasMany user_payment_has_shipping via shipping_order_id
  shipping_order_user_payment_has_shippings!: user_payment_has_shipping[];
  getShipping_order_user_payment_has_shippings!: Sequelize.HasManyGetAssociationsMixin<user_payment_has_shipping>;
  setShipping_order_user_payment_has_shippings!: Sequelize.HasManySetAssociationsMixin<user_payment_has_shipping, user_payment_has_shippingId>;
  addShipping_order_user_payment_has_shipping!: Sequelize.HasManyAddAssociationMixin<user_payment_has_shipping, user_payment_has_shippingId>;
  addShipping_order_user_payment_has_shippings!: Sequelize.HasManyAddAssociationsMixin<user_payment_has_shipping, user_payment_has_shippingId>;
  createShipping_order_user_payment_has_shipping!: Sequelize.HasManyCreateAssociationMixin<user_payment_has_shipping>;
  removeShipping_order_user_payment_has_shipping!: Sequelize.HasManyRemoveAssociationMixin<user_payment_has_shipping, user_payment_has_shippingId>;
  removeShipping_order_user_payment_has_shippings!: Sequelize.HasManyRemoveAssociationsMixin<user_payment_has_shipping, user_payment_has_shippingId>;
  hasShipping_order_user_payment_has_shipping!: Sequelize.HasManyHasAssociationMixin<user_payment_has_shipping, user_payment_has_shippingId>;
  hasShipping_order_user_payment_has_shippings!: Sequelize.HasManyHasAssociationsMixin<user_payment_has_shipping, user_payment_has_shippingId>;
  countShipping_order_user_payment_has_shippings!: Sequelize.HasManyCountAssociationsMixin;

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
      primaryKey: true,
      references: {
        model: 'order',
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
          { name: "order_id" },
        ]
      },
      {
        name: "fk_shipping_order1_idx",
        using: "BTREE",
        fields: [
          { name: "order_id" },
        ]
      },
    ]
  });
  }
}
