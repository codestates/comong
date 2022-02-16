import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { item, itemId } from './item';
import type { item_inventory, item_inventoryId } from './item_inventory';
import type { item_inventory_has_order_detail, item_inventory_has_order_detailId } from './item_inventory_has_order_detail';
import type { order, orderId } from './order';
import type { order_detail_has_item, order_detail_has_itemId } from './order_detail_has_item';
import type { order_detail_has_order, order_detail_has_orderId } from './order_detail_has_order';
import type { shopping_cart, shopping_cartId } from './shopping_cart';
import type { shopping_cart_has_order_detail, shopping_cart_has_order_detailId } from './shopping_cart_has_order_detail';

export interface order_detailAttributes {
  id: number;
  order_amount?: number;
  total_price?: number;
  state?: string;
}

export type order_detailPk = "id";
export type order_detailId = order_detail[order_detailPk];
export type order_detailOptionalAttributes = "id" | "order_amount" | "total_price" | "state";
export type order_detailCreationAttributes = Optional<order_detailAttributes, order_detailOptionalAttributes>;

export class order_detail extends Model<order_detailAttributes, order_detailCreationAttributes> implements order_detailAttributes {
  id!: number;
  order_amount?: number;
  total_price?: number;
  state?: string;

  // order_detail belongsToMany item via order_detail_id and item_id
  item_id_item_order_detail_has_items!: item[];
  getItem_id_item_order_detail_has_items!: Sequelize.BelongsToManyGetAssociationsMixin<item>;
  setItem_id_item_order_detail_has_items!: Sequelize.BelongsToManySetAssociationsMixin<item, itemId>;
  addItem_id_item_order_detail_has_item!: Sequelize.BelongsToManyAddAssociationMixin<item, itemId>;
  addItem_id_item_order_detail_has_items!: Sequelize.BelongsToManyAddAssociationsMixin<item, itemId>;
  createItem_id_item_order_detail_has_item!: Sequelize.BelongsToManyCreateAssociationMixin<item>;
  removeItem_id_item_order_detail_has_item!: Sequelize.BelongsToManyRemoveAssociationMixin<item, itemId>;
  removeItem_id_item_order_detail_has_items!: Sequelize.BelongsToManyRemoveAssociationsMixin<item, itemId>;
  hasItem_id_item_order_detail_has_item!: Sequelize.BelongsToManyHasAssociationMixin<item, itemId>;
  hasItem_id_item_order_detail_has_items!: Sequelize.BelongsToManyHasAssociationsMixin<item, itemId>;
  countItem_id_item_order_detail_has_items!: Sequelize.BelongsToManyCountAssociationsMixin;
  // order_detail belongsToMany item_inventory via order_detail_id and item_inventory_id
  item_inventory_id_item_inventories!: item_inventory[];
  getItem_inventory_id_item_inventories!: Sequelize.BelongsToManyGetAssociationsMixin<item_inventory>;
  setItem_inventory_id_item_inventories!: Sequelize.BelongsToManySetAssociationsMixin<item_inventory, item_inventoryId>;
  addItem_inventory_id_item_inventory!: Sequelize.BelongsToManyAddAssociationMixin<item_inventory, item_inventoryId>;
  addItem_inventory_id_item_inventories!: Sequelize.BelongsToManyAddAssociationsMixin<item_inventory, item_inventoryId>;
  createItem_inventory_id_item_inventory!: Sequelize.BelongsToManyCreateAssociationMixin<item_inventory>;
  removeItem_inventory_id_item_inventory!: Sequelize.BelongsToManyRemoveAssociationMixin<item_inventory, item_inventoryId>;
  removeItem_inventory_id_item_inventories!: Sequelize.BelongsToManyRemoveAssociationsMixin<item_inventory, item_inventoryId>;
  hasItem_inventory_id_item_inventory!: Sequelize.BelongsToManyHasAssociationMixin<item_inventory, item_inventoryId>;
  hasItem_inventory_id_item_inventories!: Sequelize.BelongsToManyHasAssociationsMixin<item_inventory, item_inventoryId>;
  countItem_inventory_id_item_inventories!: Sequelize.BelongsToManyCountAssociationsMixin;
  // order_detail hasMany item_inventory_has_order_detail via order_detail_id
  item_inventory_has_order_details!: item_inventory_has_order_detail[];
  getItem_inventory_has_order_details!: Sequelize.HasManyGetAssociationsMixin<item_inventory_has_order_detail>;
  setItem_inventory_has_order_details!: Sequelize.HasManySetAssociationsMixin<item_inventory_has_order_detail, item_inventory_has_order_detailId>;
  addItem_inventory_has_order_detail!: Sequelize.HasManyAddAssociationMixin<item_inventory_has_order_detail, item_inventory_has_order_detailId>;
  addItem_inventory_has_order_details!: Sequelize.HasManyAddAssociationsMixin<item_inventory_has_order_detail, item_inventory_has_order_detailId>;
  createItem_inventory_has_order_detail!: Sequelize.HasManyCreateAssociationMixin<item_inventory_has_order_detail>;
  removeItem_inventory_has_order_detail!: Sequelize.HasManyRemoveAssociationMixin<item_inventory_has_order_detail, item_inventory_has_order_detailId>;
  removeItem_inventory_has_order_details!: Sequelize.HasManyRemoveAssociationsMixin<item_inventory_has_order_detail, item_inventory_has_order_detailId>;
  hasItem_inventory_has_order_detail!: Sequelize.HasManyHasAssociationMixin<item_inventory_has_order_detail, item_inventory_has_order_detailId>;
  hasItem_inventory_has_order_details!: Sequelize.HasManyHasAssociationsMixin<item_inventory_has_order_detail, item_inventory_has_order_detailId>;
  countItem_inventory_has_order_details!: Sequelize.HasManyCountAssociationsMixin;
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
  // order_detail hasMany order_detail_has_item via order_detail_id
  order_detail_has_items!: order_detail_has_item[];
  getOrder_detail_has_items!: Sequelize.HasManyGetAssociationsMixin<order_detail_has_item>;
  setOrder_detail_has_items!: Sequelize.HasManySetAssociationsMixin<order_detail_has_item, order_detail_has_itemId>;
  addOrder_detail_has_item!: Sequelize.HasManyAddAssociationMixin<order_detail_has_item, order_detail_has_itemId>;
  addOrder_detail_has_items!: Sequelize.HasManyAddAssociationsMixin<order_detail_has_item, order_detail_has_itemId>;
  createOrder_detail_has_item!: Sequelize.HasManyCreateAssociationMixin<order_detail_has_item>;
  removeOrder_detail_has_item!: Sequelize.HasManyRemoveAssociationMixin<order_detail_has_item, order_detail_has_itemId>;
  removeOrder_detail_has_items!: Sequelize.HasManyRemoveAssociationsMixin<order_detail_has_item, order_detail_has_itemId>;
  hasOrder_detail_has_item!: Sequelize.HasManyHasAssociationMixin<order_detail_has_item, order_detail_has_itemId>;
  hasOrder_detail_has_items!: Sequelize.HasManyHasAssociationsMixin<order_detail_has_item, order_detail_has_itemId>;
  countOrder_detail_has_items!: Sequelize.HasManyCountAssociationsMixin;
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
  // order_detail belongsToMany shopping_cart via order_detail_id and shopping_cart_id
  shopping_cart_id_shopping_carts!: shopping_cart[];
  getShopping_cart_id_shopping_carts!: Sequelize.BelongsToManyGetAssociationsMixin<shopping_cart>;
  setShopping_cart_id_shopping_carts!: Sequelize.BelongsToManySetAssociationsMixin<shopping_cart, shopping_cartId>;
  addShopping_cart_id_shopping_cart!: Sequelize.BelongsToManyAddAssociationMixin<shopping_cart, shopping_cartId>;
  addShopping_cart_id_shopping_carts!: Sequelize.BelongsToManyAddAssociationsMixin<shopping_cart, shopping_cartId>;
  createShopping_cart_id_shopping_cart!: Sequelize.BelongsToManyCreateAssociationMixin<shopping_cart>;
  removeShopping_cart_id_shopping_cart!: Sequelize.BelongsToManyRemoveAssociationMixin<shopping_cart, shopping_cartId>;
  removeShopping_cart_id_shopping_carts!: Sequelize.BelongsToManyRemoveAssociationsMixin<shopping_cart, shopping_cartId>;
  hasShopping_cart_id_shopping_cart!: Sequelize.BelongsToManyHasAssociationMixin<shopping_cart, shopping_cartId>;
  hasShopping_cart_id_shopping_carts!: Sequelize.BelongsToManyHasAssociationsMixin<shopping_cart, shopping_cartId>;
  countShopping_cart_id_shopping_carts!: Sequelize.BelongsToManyCountAssociationsMixin;
  // order_detail hasMany shopping_cart_has_order_detail via order_detail_id
  shopping_cart_has_order_details!: shopping_cart_has_order_detail[];
  getShopping_cart_has_order_details!: Sequelize.HasManyGetAssociationsMixin<shopping_cart_has_order_detail>;
  setShopping_cart_has_order_details!: Sequelize.HasManySetAssociationsMixin<shopping_cart_has_order_detail, shopping_cart_has_order_detailId>;
  addShopping_cart_has_order_detail!: Sequelize.HasManyAddAssociationMixin<shopping_cart_has_order_detail, shopping_cart_has_order_detailId>;
  addShopping_cart_has_order_details!: Sequelize.HasManyAddAssociationsMixin<shopping_cart_has_order_detail, shopping_cart_has_order_detailId>;
  createShopping_cart_has_order_detail!: Sequelize.HasManyCreateAssociationMixin<shopping_cart_has_order_detail>;
  removeShopping_cart_has_order_detail!: Sequelize.HasManyRemoveAssociationMixin<shopping_cart_has_order_detail, shopping_cart_has_order_detailId>;
  removeShopping_cart_has_order_details!: Sequelize.HasManyRemoveAssociationsMixin<shopping_cart_has_order_detail, shopping_cart_has_order_detailId>;
  hasShopping_cart_has_order_detail!: Sequelize.HasManyHasAssociationMixin<shopping_cart_has_order_detail, shopping_cart_has_order_detailId>;
  hasShopping_cart_has_order_details!: Sequelize.HasManyHasAssociationsMixin<shopping_cart_has_order_detail, shopping_cart_has_order_detailId>;
  countShopping_cart_has_order_details!: Sequelize.HasManyCountAssociationsMixin;

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
    total_price: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    state: {
      type: DataTypes.STRING(45),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'order_detail',
    timestamps: false,
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
