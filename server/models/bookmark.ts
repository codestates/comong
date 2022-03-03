import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { item, itemId } from './item';
import type { user, userId } from './user';

export interface bookmarkAttributes {
  id: number;
  user_id: number;
  item_id: number;
  ismarked?: number;
}

export type bookmarkPk = "id";
export type bookmarkId = bookmark[bookmarkPk];
export type bookmarkOptionalAttributes = "id" | "ismarked";
export type bookmarkCreationAttributes = Optional<bookmarkAttributes, bookmarkOptionalAttributes>;

export class bookmark extends Model<bookmarkAttributes, bookmarkCreationAttributes> implements bookmarkAttributes {
  id!: number;
  user_id!: number;
  item_id!: number;
  ismarked?: number;

  // bookmark belongsTo item via item_id
  item!: item;
  getItem!: Sequelize.BelongsToGetAssociationMixin<item>;
  setItem!: Sequelize.BelongsToSetAssociationMixin<item, itemId>;
  createItem!: Sequelize.BelongsToCreateAssociationMixin<item>;
  // bookmark belongsTo user via user_id
  user!: user;
  getUser!: Sequelize.BelongsToGetAssociationMixin<user>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<user, userId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<user>;

  static initModel(sequelize: Sequelize.Sequelize): typeof bookmark {
    return bookmark.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
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
    },
    ismarked: {
      type: DataTypes.TINYINT,
      allowNull: true,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'bookmark',
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
        name: "fk_bookmark_user1_idx",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
      {
        name: "fk_bookmark_item1_idx",
        using: "BTREE",
        fields: [
          { name: "item_id" },
        ]
      },
    ]
  });
  }
}
