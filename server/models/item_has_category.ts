import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { category, categoryId } from './category';
import type { item, itemId } from './item';

export interface item_has_categoryAttributes {
  item_id: number;
  category_id: number;
}

export type item_has_categoryPk = "item_id" | "category_id";
export type item_has_categoryId = item_has_category[item_has_categoryPk];
export type item_has_categoryCreationAttributes = item_has_categoryAttributes;

export class item_has_category extends Model<item_has_categoryAttributes, item_has_categoryCreationAttributes> implements item_has_categoryAttributes {
  item_id!: number;
  category_id!: number;

  // item_has_category belongsTo category via category_id
  category!: category;
  getCategory!: Sequelize.BelongsToGetAssociationMixin<category>;
  setCategory!: Sequelize.BelongsToSetAssociationMixin<category, categoryId>;
  createCategory!: Sequelize.BelongsToCreateAssociationMixin<category>;
  // item_has_category belongsTo item via item_id
  item!: item;
  getItem!: Sequelize.BelongsToGetAssociationMixin<item>;
  setItem!: Sequelize.BelongsToSetAssociationMixin<item, itemId>;
  createItem!: Sequelize.BelongsToCreateAssociationMixin<item>;

  static initModel(sequelize: Sequelize.Sequelize): typeof item_has_category {
    return item_has_category.init({
    item_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'item',
        key: 'id'
      }
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'category',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'item_has_category',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "item_id" },
          { name: "category_id" },
        ]
      },
      {
        name: "fk_item_has_category_category1_idx",
        using: "BTREE",
        fields: [
          { name: "category_id" },
        ]
      },
      {
        name: "fk_item_has_category_item1_idx",
        using: "BTREE",
        fields: [
          { name: "item_id" },
        ]
      },
    ]
  });
  }
}
