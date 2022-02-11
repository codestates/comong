import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { item, itemId } from './item';
import type { order_detail, order_detailId } from './order_detail';

export interface order_detail_has_itemAttributes {
  order_detail_id: number;
  item_id: number;
}

export type order_detail_has_itemPk = "order_detail_id" | "item_id";
export type order_detail_has_itemId = order_detail_has_item[order_detail_has_itemPk];
export type order_detail_has_itemCreationAttributes = order_detail_has_itemAttributes;

export class order_detail_has_item extends Model<order_detail_has_itemAttributes, order_detail_has_itemCreationAttributes> implements order_detail_has_itemAttributes {
  order_detail_id!: number;
  item_id!: number;

  // order_detail_has_item belongsTo item via item_id
  item!: item;
  getItem!: Sequelize.BelongsToGetAssociationMixin<item>;
  setItem!: Sequelize.BelongsToSetAssociationMixin<item, itemId>;
  createItem!: Sequelize.BelongsToCreateAssociationMixin<item>;
  // order_detail_has_item belongsTo order_detail via order_detail_id
  order_detail!: order_detail;
  getOrder_detail!: Sequelize.BelongsToGetAssociationMixin<order_detail>;
  setOrder_detail!: Sequelize.BelongsToSetAssociationMixin<order_detail, order_detailId>;
  createOrder_detail!: Sequelize.BelongsToCreateAssociationMixin<order_detail>;

  static initModel(sequelize: Sequelize.Sequelize): typeof order_detail_has_item {
    return order_detail_has_item.init({
    order_detail_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'order_detail',
        key: 'id'
      }
    },
    item_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'item',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'order_detail_has_item',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "order_detail_id" },
          { name: "item_id" },
        ]
      },
      {
        name: "fk_order_detail_has_item_item1_idx",
        using: "BTREE",
        fields: [
          { name: "item_id" },
        ]
      },
      {
        name: "fk_order_detail_has_item_order_detail1_idx",
        using: "BTREE",
        fields: [
          { name: "order_detail_id" },
        ]
      },
    ]
  });
  }
}
