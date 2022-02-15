import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { order, orderId } from './order';
import type { user, userId } from './user';
import type { user_payment_has_order, user_payment_has_orderId } from './user_payment_has_order';
import type { user_payment_has_shipping, user_payment_has_shippingId } from './user_payment_has_shipping';

export interface user_paymentAttributes {
  id: number;
  user_id: number;
  payment_method?: string;
  payment_status?: string;
  detail?: string;
  total_amount?: string;
  imp_uid?: string;
  merchant_uid?: string;
  buyer_name?: string;
  status?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type user_paymentPk = "id";
export type user_paymentId = user_payment[user_paymentPk];
export type user_paymentOptionalAttributes = "id" | "payment_method" | "payment_status" | "detail" | "total_amount" | "imp_uid" | "merchant_uid" | "buyer_name" | "status" | "createdAt" | "updatedAt";
export type user_paymentCreationAttributes = Optional<user_paymentAttributes, user_paymentOptionalAttributes>;

export class user_payment extends Model<user_paymentAttributes, user_paymentCreationAttributes> implements user_paymentAttributes {
  id!: number;
  user_id!: number;
  payment_method?: string;
  payment_status?: string;
  detail?: string;
  total_amount?: string;
  imp_uid?: string;
  merchant_uid?: string;
  buyer_name?: string;
  status?: string;
  createdAt?: Date;
  updatedAt?: Date;

  // user_payment belongsTo user via user_id
  user!: user;
  getUser!: Sequelize.BelongsToGetAssociationMixin<user>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<user, userId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<user>;
  // user_payment belongsToMany order via user_payment_id and order_id
  order_id_order_user_payment_has_orders!: order[];
  getOrder_id_order_user_payment_has_orders!: Sequelize.BelongsToManyGetAssociationsMixin<order>;
  setOrder_id_order_user_payment_has_orders!: Sequelize.BelongsToManySetAssociationsMixin<order, orderId>;
  addOrder_id_order_user_payment_has_order!: Sequelize.BelongsToManyAddAssociationMixin<order, orderId>;
  addOrder_id_order_user_payment_has_orders!: Sequelize.BelongsToManyAddAssociationsMixin<order, orderId>;
  createOrder_id_order_user_payment_has_order!: Sequelize.BelongsToManyCreateAssociationMixin<order>;
  removeOrder_id_order_user_payment_has_order!: Sequelize.BelongsToManyRemoveAssociationMixin<order, orderId>;
  removeOrder_id_order_user_payment_has_orders!: Sequelize.BelongsToManyRemoveAssociationsMixin<order, orderId>;
  hasOrder_id_order_user_payment_has_order!: Sequelize.BelongsToManyHasAssociationMixin<order, orderId>;
  hasOrder_id_order_user_payment_has_orders!: Sequelize.BelongsToManyHasAssociationsMixin<order, orderId>;
  countOrder_id_order_user_payment_has_orders!: Sequelize.BelongsToManyCountAssociationsMixin;
  // user_payment hasMany user_payment_has_order via user_payment_id
  user_payment_has_orders!: user_payment_has_order[];
  getUser_payment_has_orders!: Sequelize.HasManyGetAssociationsMixin<user_payment_has_order>;
  setUser_payment_has_orders!: Sequelize.HasManySetAssociationsMixin<user_payment_has_order, user_payment_has_orderId>;
  addUser_payment_has_order!: Sequelize.HasManyAddAssociationMixin<user_payment_has_order, user_payment_has_orderId>;
  addUser_payment_has_orders!: Sequelize.HasManyAddAssociationsMixin<user_payment_has_order, user_payment_has_orderId>;
  createUser_payment_has_order!: Sequelize.HasManyCreateAssociationMixin<user_payment_has_order>;
  removeUser_payment_has_order!: Sequelize.HasManyRemoveAssociationMixin<user_payment_has_order, user_payment_has_orderId>;
  removeUser_payment_has_orders!: Sequelize.HasManyRemoveAssociationsMixin<user_payment_has_order, user_payment_has_orderId>;
  hasUser_payment_has_order!: Sequelize.HasManyHasAssociationMixin<user_payment_has_order, user_payment_has_orderId>;
  hasUser_payment_has_orders!: Sequelize.HasManyHasAssociationsMixin<user_payment_has_order, user_payment_has_orderId>;
  countUser_payment_has_orders!: Sequelize.HasManyCountAssociationsMixin;
  // user_payment hasMany user_payment_has_shipping via user_payment_id
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

  static initModel(sequelize: Sequelize.Sequelize): typeof user_payment {
    return user_payment.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    payment_method: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    payment_status: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    detail: {
      type: DataTypes.STRING(225),
      allowNull: true
    },
    total_amount: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    imp_uid: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    merchant_uid: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    buyer_name: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    status: {
      type: DataTypes.STRING(45),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'user_payment',
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
        name: "fk_user_payment_user1_idx",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
    ]
  });
  }
}
