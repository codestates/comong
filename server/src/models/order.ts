import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { order_detail, order_detailId } from './order_detail';
import type { order_detail_has_order, order_detail_has_orderId } from './order_detail_has_order';
import type { shipping, shippingId } from './shipping';
import type { user, userId } from './user';
import type { user_payment, user_paymentId } from './user_payment';

export interface orderAttributes {
  id: number;
  order_date?: string;
  total_amount?: number;
  status?: string;
  user_id: number;
  user_payment_id: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export type orderPk = "id";
export type orderId = order[orderPk];
export type orderOptionalAttributes = "id" | "order_date" | "total_amount" | "status" | "createdAt" | "updatedAt";
export type orderCreationAttributes = Optional<orderAttributes, orderOptionalAttributes>;

export class order extends Model<orderAttributes, orderCreationAttributes> implements orderAttributes {
  id!: number;
  order_date?: string;
  total_amount?: number;
  status?: string;
  user_id!: number;
  user_payment_id!: number;
  createdAt?: Date;
  updatedAt?: Date;

  // order belongsToMany order_detail via order_id and order_detail_id
  order_detail_id_order_details!: order_detail[];
  getOrder_detail_id_order_details!: Sequelize.BelongsToManyGetAssociationsMixin<order_detail>;
  setOrder_detail_id_order_details!: Sequelize.BelongsToManySetAssociationsMixin<order_detail, order_detailId>;
  addOrder_detail_id_order_detail!: Sequelize.BelongsToManyAddAssociationMixin<order_detail, order_detailId>;
  addOrder_detail_id_order_details!: Sequelize.BelongsToManyAddAssociationsMixin<order_detail, order_detailId>;
  createOrder_detail_id_order_detail!: Sequelize.BelongsToManyCreateAssociationMixin<order_detail>;
  removeOrder_detail_id_order_detail!: Sequelize.BelongsToManyRemoveAssociationMixin<order_detail, order_detailId>;
  removeOrder_detail_id_order_details!: Sequelize.BelongsToManyRemoveAssociationsMixin<order_detail, order_detailId>;
  hasOrder_detail_id_order_detail!: Sequelize.BelongsToManyHasAssociationMixin<order_detail, order_detailId>;
  hasOrder_detail_id_order_details!: Sequelize.BelongsToManyHasAssociationsMixin<order_detail, order_detailId>;
  countOrder_detail_id_order_details!: Sequelize.BelongsToManyCountAssociationsMixin;
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
  // order belongsTo user via user_id
  user!: user;
  getUser!: Sequelize.BelongsToGetAssociationMixin<user>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<user, userId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<user>;
  // order belongsTo user_payment via user_payment_id
  user_payment!: user_payment;
  getUser_payment!: Sequelize.BelongsToGetAssociationMixin<user_payment>;
  setUser_payment!: Sequelize.BelongsToSetAssociationMixin<user_payment, user_paymentId>;
  createUser_payment!: Sequelize.BelongsToCreateAssociationMixin<user_payment>;

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
    status: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
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
      {
        name: "fk_order_user1_idx",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
      {
        name: "fk_order_user_payment1_idx",
        using: "BTREE",
        fields: [
          { name: "user_payment_id" },
        ]
      },
    ]
  });
  }
}
