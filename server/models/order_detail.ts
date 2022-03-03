import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { item, itemId } from './item';
import type { item_review, item_reviewId } from './item_review';
import type { order, orderId } from './order';
import type { order_detail_has_order, order_detail_has_orderId } from './order_detail_has_order';
import type { replace_refund, replace_refundId } from './replace_refund';
import type { user, userId } from './user';

export interface order_detailAttributes {
  id: number;
  order_amount?: number;
  peritem_price?: number;
  status?: string;
  user_id: number;
  item_id: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export type order_detailPk = "id";
export type order_detailId = order_detail[order_detailPk];
export type order_detailOptionalAttributes = "id" | "order_amount" | "peritem_price" | "status" | "createdAt" | "updatedAt";
export type order_detailCreationAttributes = Optional<order_detailAttributes, order_detailOptionalAttributes>;

export class order_detail extends Model<order_detailAttributes, order_detailCreationAttributes> implements order_detailAttributes {
  id!: number;
  order_amount?: number;
  peritem_price?: number;
  status?: string;
  user_id!: number;
  item_id!: number;
  createdAt?: Date;
  updatedAt?: Date;

  // order_detail belongsTo item via item_id
  item!: item;
  getItem!: Sequelize.BelongsToGetAssociationMixin<item>;
  setItem!: Sequelize.BelongsToSetAssociationMixin<item, itemId>;
  createItem!: Sequelize.BelongsToCreateAssociationMixin<item>;
  // order_detail hasMany item_review via order_detail_id
  item_reviews!: item_review[];
  getItem_reviews!: Sequelize.HasManyGetAssociationsMixin<item_review>;
  setItem_reviews!: Sequelize.HasManySetAssociationsMixin<item_review, item_reviewId>;
  addItem_review!: Sequelize.HasManyAddAssociationMixin<item_review, item_reviewId>;
  addItem_reviews!: Sequelize.HasManyAddAssociationsMixin<item_review, item_reviewId>;
  createItem_review!: Sequelize.HasManyCreateAssociationMixin<item_review>;
  removeItem_review!: Sequelize.HasManyRemoveAssociationMixin<item_review, item_reviewId>;
  removeItem_reviews!: Sequelize.HasManyRemoveAssociationsMixin<item_review, item_reviewId>;
  hasItem_review!: Sequelize.HasManyHasAssociationMixin<item_review, item_reviewId>;
  hasItem_reviews!: Sequelize.HasManyHasAssociationsMixin<item_review, item_reviewId>;
  countItem_reviews!: Sequelize.HasManyCountAssociationsMixin;
  // order_detail belongsToMany order via order_detail_id and order_id
  order_id_orders!: order[];
  getOrder_id_orders!: Sequelize.BelongsToManyGetAssociationsMixin<order>;
  setOrder_id_orders!: Sequelize.BelongsToManySetAssociationsMixin<order, orderId>;
  addOrder_id_order!: Sequelize.BelongsToManyAddAssociationMixin<order, orderId>;
  addOrder_id_orders!: Sequelize.BelongsToManyAddAssociationsMixin<order, orderId>;
  createOrder_id_order!: Sequelize.BelongsToManyCreateAssociationMixin<order>;
  removeOrder_id_order!: Sequelize.BelongsToManyRemoveAssociationMixin<order, orderId>;
  removeOrder_id_orders!: Sequelize.BelongsToManyRemoveAssociationsMixin<order, orderId>;
  hasOrder_id_order!: Sequelize.BelongsToManyHasAssociationMixin<order, orderId>;
  hasOrder_id_orders!: Sequelize.BelongsToManyHasAssociationsMixin<order, orderId>;
  countOrder_id_orders!: Sequelize.BelongsToManyCountAssociationsMixin;
  // order_detail hasMany order_detail_has_order via order_detail_id
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
  // order_detail hasMany replace_refund via order_detail_id
  replace_refunds!: replace_refund[];
  getReplace_refunds!: Sequelize.HasManyGetAssociationsMixin<replace_refund>;
  setReplace_refunds!: Sequelize.HasManySetAssociationsMixin<replace_refund, replace_refundId>;
  addReplace_refund!: Sequelize.HasManyAddAssociationMixin<replace_refund, replace_refundId>;
  addReplace_refunds!: Sequelize.HasManyAddAssociationsMixin<replace_refund, replace_refundId>;
  createReplace_refund!: Sequelize.HasManyCreateAssociationMixin<replace_refund>;
  removeReplace_refund!: Sequelize.HasManyRemoveAssociationMixin<replace_refund, replace_refundId>;
  removeReplace_refunds!: Sequelize.HasManyRemoveAssociationsMixin<replace_refund, replace_refundId>;
  hasReplace_refund!: Sequelize.HasManyHasAssociationMixin<replace_refund, replace_refundId>;
  hasReplace_refunds!: Sequelize.HasManyHasAssociationsMixin<replace_refund, replace_refundId>;
  countReplace_refunds!: Sequelize.HasManyCountAssociationsMixin;
  // order_detail belongsTo user via user_id
  user!: user;
  getUser!: Sequelize.BelongsToGetAssociationMixin<user>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<user, userId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<user>;

  static initModel(sequelize: Sequelize.Sequelize): typeof order_detail {
    return order_detail.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    order_amount: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    peritem_price: {
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
    item_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'item',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'order_detail',
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
        name: "fk_order_detail_user1_idx",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
      {
        name: "fk_order_detail_item1_idx",
        using: "BTREE",
        fields: [
          { name: "item_id" },
        ]
      },
    ]
  });
  }
}
