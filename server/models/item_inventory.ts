import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { item, itemId } from './item';

export interface item_inventoryAttributes {
  id: number;
  item_id: number;
  stock?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export type item_inventoryPk = "id";
export type item_inventoryId = item_inventory[item_inventoryPk];
export type item_inventoryOptionalAttributes = "id" | "stock" | "createdAt" | "updatedAt";
export type item_inventoryCreationAttributes = Optional<item_inventoryAttributes, item_inventoryOptionalAttributes>;

export class item_inventory extends Model<item_inventoryAttributes, item_inventoryCreationAttributes> implements item_inventoryAttributes {
  id!: number;
  item_id!: number;
  stock?: number;
  createdAt?: Date;
  updatedAt?: Date;

  // item_inventory belongsTo item via item_id
  item!: item;
  getItem!: Sequelize.BelongsToGetAssociationMixin<item>;
  setItem!: Sequelize.BelongsToSetAssociationMixin<item, itemId>;
  createItem!: Sequelize.BelongsToCreateAssociationMixin<item>;

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
