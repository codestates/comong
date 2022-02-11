import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { comment, commentId } from './comment';
import type { item, itemId } from './item';

export interface item_has_commentAttributes {
  item_id: number;
  comment_id: number;
}

export type item_has_commentPk = "item_id" | "comment_id";
export type item_has_commentId = item_has_comment[item_has_commentPk];
export type item_has_commentCreationAttributes = item_has_commentAttributes;

export class item_has_comment extends Model<item_has_commentAttributes, item_has_commentCreationAttributes> implements item_has_commentAttributes {
  item_id!: number;
  comment_id!: number;

  // item_has_comment belongsTo comment via comment_id
  comment!: comment;
  getComment!: Sequelize.BelongsToGetAssociationMixin<comment>;
  setComment!: Sequelize.BelongsToSetAssociationMixin<comment, commentId>;
  createComment!: Sequelize.BelongsToCreateAssociationMixin<comment>;
  // item_has_comment belongsTo item via item_id
  item!: item;
  getItem!: Sequelize.BelongsToGetAssociationMixin<item>;
  setItem!: Sequelize.BelongsToSetAssociationMixin<item, itemId>;
  createItem!: Sequelize.BelongsToCreateAssociationMixin<item>;

  static initModel(sequelize: Sequelize.Sequelize): typeof item_has_comment {
    return item_has_comment.init({
    item_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'item',
        key: 'id'
      }
    },
    comment_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'comment',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'item_has_comment',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "item_id" },
          { name: "comment_id" },
        ]
      },
      {
        name: "fk_item_has_comment_comment1_idx",
        using: "BTREE",
        fields: [
          { name: "comment_id" },
        ]
      },
      {
        name: "fk_item_has_comment_item1_idx",
        using: "BTREE",
        fields: [
          { name: "item_id" },
        ]
      },
    ]
  });
  }
}
