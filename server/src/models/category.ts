import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { item, itemId } from './item';
import type { item_has_category, item_has_categoryId } from './item_has_category';

export interface categoryAttributes {
  id: number;
  pid?: number;
  depth?: number;
  category?: string;
}

export type categoryPk = "id";
export type categoryId = category[categoryPk];
export type categoryOptionalAttributes = "id" | "pid" | "depth" | "category";
export type categoryCreationAttributes = Optional<categoryAttributes, categoryOptionalAttributes>;

export class category extends Model<categoryAttributes, categoryCreationAttributes> implements categoryAttributes {
  id!: number;
  pid?: number;
  depth?: number;
  category?: string;

  // category belongsToMany item via category_id and item_id
  item_id_item_item_has_categories!: item[];
  getItem_id_item_item_has_categories!: Sequelize.BelongsToManyGetAssociationsMixin<item>;
  setItem_id_item_item_has_categories!: Sequelize.BelongsToManySetAssociationsMixin<item, itemId>;
  addItem_id_item_item_has_category!: Sequelize.BelongsToManyAddAssociationMixin<item, itemId>;
  addItem_id_item_item_has_categories!: Sequelize.BelongsToManyAddAssociationsMixin<item, itemId>;
  createItem_id_item_item_has_category!: Sequelize.BelongsToManyCreateAssociationMixin<item>;
  removeItem_id_item_item_has_category!: Sequelize.BelongsToManyRemoveAssociationMixin<item, itemId>;
  removeItem_id_item_item_has_categories!: Sequelize.BelongsToManyRemoveAssociationsMixin<item, itemId>;
  hasItem_id_item_item_has_category!: Sequelize.BelongsToManyHasAssociationMixin<item, itemId>;
  hasItem_id_item_item_has_categories!: Sequelize.BelongsToManyHasAssociationsMixin<item, itemId>;
  countItem_id_item_item_has_categories!: Sequelize.BelongsToManyCountAssociationsMixin;
  // category hasMany item_has_category via category_id
  item_has_categories!: item_has_category[];
  getItem_has_categories!: Sequelize.HasManyGetAssociationsMixin<item_has_category>;
  setItem_has_categories!: Sequelize.HasManySetAssociationsMixin<item_has_category, item_has_categoryId>;
  addItem_has_category!: Sequelize.HasManyAddAssociationMixin<item_has_category, item_has_categoryId>;
  addItem_has_categories!: Sequelize.HasManyAddAssociationsMixin<item_has_category, item_has_categoryId>;
  createItem_has_category!: Sequelize.HasManyCreateAssociationMixin<item_has_category>;
  removeItem_has_category!: Sequelize.HasManyRemoveAssociationMixin<item_has_category, item_has_categoryId>;
  removeItem_has_categories!: Sequelize.HasManyRemoveAssociationsMixin<item_has_category, item_has_categoryId>;
  hasItem_has_category!: Sequelize.HasManyHasAssociationMixin<item_has_category, item_has_categoryId>;
  hasItem_has_categories!: Sequelize.HasManyHasAssociationsMixin<item_has_category, item_has_categoryId>;
  countItem_has_categories!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof category {
    return category.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    pid: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    depth: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    category: {
      type: DataTypes.STRING(45),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'category',
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
