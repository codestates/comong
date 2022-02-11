import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { order_detail, order_detailId } from './order_detail';
import type { order_detail_has_order, order_detail_has_orderId } from './order_detail_has_order';
import type { order_has_user, order_has_userId } from './order_has_user';
import type { shipping, shippingId } from './shipping';
import type { user, userId } from './user';
import type { user_payment, user_paymentId } from './user_payment';
import type { user_payment_has_order, user_payment_has_orderId } from './user_payment_has_order';

export interface orderAttributes {
  id: number;
  order_date?: string;
  total_amount?: number;
  state?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type orderPk = "id";
export type orderId = order[orderPk];
export type orderOptionalAttributes = "id" | "order_date" | "total_amount" | "state" | "createdAt" | "updatedAt";
export type orderCreationAttributes = Optional<orderAttributes, orderOptionalAttributes>;

export class order extends Model<orderAttributes, orderCreationAttributes> implements orderAttributes {
  id!: number;
  order_date?: string;
  total_amount?: number;
  state?: string;
  createdAt?: Date;
  updatedAt?: Date;

  // order belongsToMany order_detail via order_id and order_detail_id
  order_detail_id_order_detail_order_detail_has_orders!: order_detail[];
  getOrder_detail_id_order_detail_order_detail_has_orders!: Sequelize.BelongsToManyGetAssociationsMixin<order_detail>;
  setOrder_detail_id_order_detail_order_detail_has_orders!: Sequelize.BelongsToManySetAssociationsMixin<order_detail, order_detailId>;
  addOrder_detail_id_order_detail_order_detail_has_order!: Sequelize.BelongsToManyAddAssociationMixin<order_detail, order_detailId>;
  addOrder_detail_id_order_detail_order_detail_has_orders!: Sequelize.BelongsToManyAddAssociationsMixin<order_detail, order_detailId>;
  createOrder_detail_id_order_detail_order_detail_has_order!: Sequelize.BelongsToManyCreateAssociationMixin<order_detail>;
  removeOrder_detail_id_order_detail_order_detail_has_order!: Sequelize.BelongsToManyRemoveAssociationMixin<order_detail, order_detailId>;
  removeOrder_detail_id_order_detail_order_detail_has_orders!: Sequelize.BelongsToManyRemoveAssociationsMixin<order_detail, order_detailId>;
  hasOrder_detail_id_order_detail_order_detail_has_order!: Sequelize.BelongsToManyHasAssociationMixin<order_detail, order_detailId>;
  hasOrder_detail_id_order_detail_order_detail_has_orders!: Sequelize.BelongsToManyHasAssociationsMixin<order_detail, order_detailId>;
  countOrder_detail_id_order_detail_order_detail_has_orders!: Sequelize.BelongsToManyCountAssociationsMixin;
  // order hasMany order_detail_has_order via order_id
  order_detail_has_orders!: order_detail_has_order[];
  getOrder_detail_has_orders!: Sequelize.HasManyGetAssociationsMixin<order_detail_has_order>;
  setOrder_detail_has_orders!: Sequelize.HasManySetAssociationsMixin<order_detail_has_order, order_detail_has_orderId>;
  addOrder_detail_has_order!: Sequelize.HasManyAddAssociationMixin<order_detail_has_order, order_detail_has_orderId>;
  addOrder_detail_has_orders!: Sequelize.HasManyAddAssociationsMixin<order_detail_has_order, order_detail_has_orderId>;
  createOrder_detail_has_order!: Sequelize.HasManyCreateAssociationMixin<order_detail_has_order>;
  removeOrder_detail_has_order!: Sequelize.HasManyRemoveAssociationMixin<order_detail_has_order, order_detail_has_orderId>;
  removeOrder_detail_has_orders!: Sequelize.HasManyRemoveAssociationsMixin<order_detail_has_order, order_detail_has_orderId>;
  hasOrder_detail_has_order!: Sequelize.HasManyHasAssociationMixin<order_detail_has_order, order_detail_has_orderId>;
  hasOrder_detail_has_orders!: Sequelize.HasManyHasAssociationsMixin<order_detail_has_order, order_detail_has_orderId>;
  countOrder_detail_has_orders!: Sequelize.HasManyCountAssociationsMixin;
  // order hasMany order_has_user via order_id
  order_has_users!: order_has_user[];
  getOrder_has_users!: Sequelize.HasManyGetAssociationsMixin<order_has_user>;
  setOrder_has_users!: Sequelize.HasManySetAssociationsMixin<order_has_user, order_has_userId>;
  addOrder_has_user!: Sequelize.HasManyAddAssociationMixin<order_has_user, order_has_userId>;
  addOrder_has_users!: Sequelize.HasManyAddAssociationsMixin<order_has_user, order_has_userId>;
  createOrder_has_user!: Sequelize.HasManyCreateAssociationMixin<order_has_user>;
  removeOrder_has_user!: Sequelize.HasManyRemoveAssociationMixin<order_has_user, order_has_userId>;
  removeOrder_has_users!: Sequelize.HasManyRemoveAssociationsMixin<order_has_user, order_has_userId>;
  hasOrder_has_user!: Sequelize.HasManyHasAssociationMixin<order_has_user, order_has_userId>;
  hasOrder_has_users!: Sequelize.HasManyHasAssociationsMixin<order_has_user, order_has_userId>;
  countOrder_has_users!: Sequelize.HasManyCountAssociationsMixin;
  // order hasMany shipping via order_id
  shippings!: shipping[];
  getShippings!: Sequelize.HasManyGetAssociationsMixin<shipping>;
  setShippings!: Sequelize.HasManySetAssociationsMixin<shipping, shippingId>;
  addShipping!: Sequelize.HasManyAddAssociationMixin<shipping, shippingId>;
  addShippings!: Sequelize.HasManyAddAssociationsMixin<shipping, shippingId>;
  createShipping!: Sequelize.HasManyCreateAssociationMixin<shipping>;
  removeShipping!: Sequelize.HasManyRemoveAssociationMixin<shipping, shippingId>;
  removeShippings!: Sequelize.HasManyRemoveAssociationsMixin<shipping, shippingId>;
  hasShipping!: Sequelize.HasManyHasAssociationMixin<shipping, shippingId>;
  hasShippings!: Sequelize.HasManyHasAssociationsMixin<shipping, shippingId>;
  countShippings!: Sequelize.HasManyCountAssociationsMixin;
  // order belongsToMany user via order_id and user_id
  user_id_user_order_has_users!: user[];
  getUser_id_user_order_has_users!: Sequelize.BelongsToManyGetAssociationsMixin<user>;
  setUser_id_user_order_has_users!: Sequelize.BelongsToManySetAssociationsMixin<user, userId>;
  addUser_id_user_order_has_user!: Sequelize.BelongsToManyAddAssociationMixin<user, userId>;
  addUser_id_user_order_has_users!: Sequelize.BelongsToManyAddAssociationsMixin<user, userId>;
  createUser_id_user_order_has_user!: Sequelize.BelongsToManyCreateAssociationMixin<user>;
  removeUser_id_user_order_has_user!: Sequelize.BelongsToManyRemoveAssociationMixin<user, userId>;
  removeUser_id_user_order_has_users!: Sequelize.BelongsToManyRemoveAssociationsMixin<user, userId>;
  hasUser_id_user_order_has_user!: Sequelize.BelongsToManyHasAssociationMixin<user, userId>;
  hasUser_id_user_order_has_users!: Sequelize.BelongsToManyHasAssociationsMixin<user, userId>;
  countUser_id_user_order_has_users!: Sequelize.BelongsToManyCountAssociationsMixin;
  // order belongsToMany user_payment via order_id and user_payment_id
  user_payment_id_user_payments!: user_payment[];
  getUser_payment_id_user_payments!: Sequelize.BelongsToManyGetAssociationsMixin<user_payment>;
  setUser_payment_id_user_payments!: Sequelize.BelongsToManySetAssociationsMixin<user_payment, user_paymentId>;
  addUser_payment_id_user_payment!: Sequelize.BelongsToManyAddAssociationMixin<user_payment, user_paymentId>;
  addUser_payment_id_user_payments!: Sequelize.BelongsToManyAddAssociationsMixin<user_payment, user_paymentId>;
  createUser_payment_id_user_payment!: Sequelize.BelongsToManyCreateAssociationMixin<user_payment>;
  removeUser_payment_id_user_payment!: Sequelize.BelongsToManyRemoveAssociationMixin<user_payment, user_paymentId>;
  removeUser_payment_id_user_payments!: Sequelize.BelongsToManyRemoveAssociationsMixin<user_payment, user_paymentId>;
  hasUser_payment_id_user_payment!: Sequelize.BelongsToManyHasAssociationMixin<user_payment, user_paymentId>;
  hasUser_payment_id_user_payments!: Sequelize.BelongsToManyHasAssociationsMixin<user_payment, user_paymentId>;
  countUser_payment_id_user_payments!: Sequelize.BelongsToManyCountAssociationsMixin;
  // order hasMany user_payment_has_order via order_id
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

  static initModel(sequelize: Sequelize.Sequelize): typeof order {
    return order.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    order_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    total_amount: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    state: {
      type: DataTypes.STRING(45),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'order',
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
    ]
  });
  }
}
