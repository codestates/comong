import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { item_inventory, item_inventoryId } from './item_inventory';
import type { order_detail, order_detailId } from './order_detail';

export interface item_inventory_has_order_detailAttributes {
  item_inventory_id: number;
  order_detail_id: number;
}

export type item_inventory_has_order_detailPk = "item_inventory_id" | "order_detail_id";
export type item_inventory_has_order_detailId = item_inventory_has_order_detail[item_inventory_has_order_detailPk];
export type item_inventory_has_order_detailCreationAttributes = item_inventory_has_order_detailAttributes;

export class item_inventory_has_order_detail extends Model<item_inventory_has_order_detailAttributes, item_inventory_has_order_detailCreationAttributes> implements item_inventory_has_order_detailAttributes {
  item_inventory_id!: number;
  order_detail_id!: number;

  // item_inventory_has_order_detail belongsTo item_inventory via item_inventory_id
  item_inventory!: item_inventory;
  getItem_inventory!: Sequelize.BelongsToGetAssociationMixin<item_inventory>;
  setItem_inventory!: Sequelize.BelongsToSetAssociationMixin<item_inventory, item_inventoryId>;
  createItem_inventory!: Sequelize.BelongsToCreateAssociationMixin<item_inventory>;
  // item_inventory_has_order_detail belongsTo order_detail via order_detail_id
  order_detail!: order_detail;
  getOrder_detail!: Sequelize.BelongsToGetAssociationMixin<order_detail>;
  setOrder_detail!: Sequelize.BelongsToSetAssociationMixin<order_detail, order_detailId>;
  createOrder_detail!: Sequelize.BelongsToCreateAssociationMixin<order_detail>;

  static initModel(sequelize: Sequelize.Sequelize): typeof item_inventory_has_order_detail {
    return item_inventory_has_order_detail.init({
    item_inventory_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'item_inventory',
        key: 'id'
      }
    },
    order_detail_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'order_detail',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'item_inventory_has_order_detail',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "item_inventory_id" },
          { name: "order_detail_id" },
        ]
      },
      {
        name: "fk_item_inventory_has_order_detail_order_detail1_idx",
        using: "BTREE",
        fields: [
          { name: "order_detail_id" },
        ]
      },
      {
        name: "fk_item_inventory_has_order_detail_item_inventory1_idx",
        using: "BTREE",
        fields: [
          { name: "item_inventory_id" },
        ]
      },
    ]
  });
  }
}
