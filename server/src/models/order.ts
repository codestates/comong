import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { order_detail, order_detailId } from './order_detail';
import type { order_detail_has_order, order_detail_has_orderId } from './order_detail_has_order';
import type { user, userId } from './user';
import type { user_payment, user_paymentId } from './user_payment';

export interface orderAttributes {
  id: number;
  total_amount?: number;
  status?: string;
  user_id: number;
  shipping_method?: string;
  shipping_charge?: number;
  shipping_status?: string;
  shipping_company?: string;
  shipping_code?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type orderPk = "id";
export type orderId = order[orderPk];
export type orderOptionalAttributes = "id" | "total_amount" | "status" | "shipping_method" | "shipping_charge" | "shipping_status" | "shipping_company" | "shipping_code" | "createdAt" | "updatedAt";
export type orderCreationAttributes = Optional<orderAttributes, orderOptionalAttributes>;

export class order extends Model<orderAttributes, orderCreationAttributes> implements orderAttributes {
  id!: number;
  total_amount?: number;
  status?: string;
  user_id!: number;
  shipping_method?: string;
  shipping_charge?: number;
  shipping_status?: string;
  shipping_company?: string;
  shipping_code?: string;
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
  // order hasMany user_payment via order_id
  user_payments!: user_payment[];
  getUser_payments!: Sequelize.HasManyGetAssociationsMixin<user_payment>;
  setUser_payments!: Sequelize.HasManySetAssociationsMixin<user_payment, user_paymentId>;
  addUser_payment!: Sequelize.HasManyAddAssociationMixin<user_payment, user_paymentId>;
  addUser_payments!: Sequelize.HasManyAddAssociationsMixin<user_payment, user_paymentId>;
  createUser_payment!: Sequelize.HasManyCreateAssociationMixin<user_payment>;
  removeUser_payment!: Sequelize.HasManyRemoveAssociationMixin<user_payment, user_paymentId>;
  removeUser_payments!: Sequelize.HasManyRemoveAssociationsMixin<user_payment, user_paymentId>;
  hasUser_payment!: Sequelize.HasManyHasAssociationMixin<user_payment, user_paymentId>;
  hasUser_payments!: Sequelize.HasManyHasAssociationsMixin<user_payment, user_paymentId>;
  countUser_payments!: Sequelize.HasManyCountAssociationsMixin;
  // order belongsTo user via user_id
  user!: user;
  getUser!: Sequelize.BelongsToGetAssociationMixin<user>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<user, userId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<user>;

  static initModel(sequelize: Sequelize.Sequelize): typeof order {
    return order.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
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
    shipping_method: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    shipping_charge: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    shipping_status: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    shipping_company: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    shipping_code: {
      type: DataTypes.STRING(100),
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
      {
        name: "fk_order_user1_idx",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
    ]
  });
  }
}
