import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { item, itemId } from './item';
import type { item_inventory_has_order_detail, item_inventory_has_order_detailId } from './item_inventory_has_order_detail';
import type { order_detail, order_detailId } from './order_detail';

export interface item_inventoryAttributes {
  id: number;
  item_id: number;
  stock?: number;
}

export type item_inventoryPk = "id";
export type item_inventoryId = item_inventory[item_inventoryPk];
export type item_inventoryOptionalAttributes = "id" | "stock";
export type item_inventoryCreationAttributes = Optional<item_inventoryAttributes, item_inventoryOptionalAttributes>;

export class item_inventory extends Model<item_inventoryAttributes, item_inventoryCreationAttributes> implements item_inventoryAttributes {
  id!: number;
  item_id!: number;
  stock?: number;

  // item_inventory belongsTo item via item_id
  item!: item;
  getItem!: Sequelize.BelongsToGetAssociationMixin<item>;
  setItem!: Sequelize.BelongsToSetAssociationMixin<item, itemId>;
  createItem!: Sequelize.BelongsToCreateAssociationMixin<item>;
  // item_inventory hasMany item_inventory_has_order_detail via item_inventory_id
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
  // item_inventory belongsToMany order_detail via item_inventory_id and order_detail_id
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

  static initModel(sequelize: Sequelize.Sequelize): typeof item_inventory {
    return item_inventory.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    item_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'item',
        key: 'id'
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'item_inventory',
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
      {
        name: "fk_item_inventory_item1_idx",
        using: "BTREE",
        fields: [
          { name: "item_id" },
        ]
      },
    ]
  });
  }
}
