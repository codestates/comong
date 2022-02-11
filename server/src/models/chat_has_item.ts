import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { chat, chatId } from './chat';
import type { item, itemId } from './item';

export interface chat_has_itemAttributes {
  chat_id: number;
  item_id: number;
}

export type chat_has_itemPk = "chat_id" | "item_id";
export type chat_has_itemId = chat_has_item[chat_has_itemPk];
export type chat_has_itemCreationAttributes = chat_has_itemAttributes;

export class chat_has_item extends Model<chat_has_itemAttributes, chat_has_itemCreationAttributes> implements chat_has_itemAttributes {
  chat_id!: number;
  item_id!: number;

  // chat_has_item belongsTo chat via chat_id
  chat!: chat;
  getChat!: Sequelize.BelongsToGetAssociationMixin<chat>;
  setChat!: Sequelize.BelongsToSetAssociationMixin<chat, chatId>;
  createChat!: Sequelize.BelongsToCreateAssociationMixin<chat>;
  // chat_has_item belongsTo item via item_id
  item!: item;
  getItem!: Sequelize.BelongsToGetAssociationMixin<item>;
  setItem!: Sequelize.BelongsToSetAssociationMixin<item, itemId>;
  createItem!: Sequelize.BelongsToCreateAssociationMixin<item>;

  static initModel(sequelize: Sequelize.Sequelize): typeof chat_has_item {
    return chat_has_item.init({
    chat_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'chat',
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
    tableName: 'chat_has_item',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "chat_id" },
          { name: "item_id" },
        ]
      },
      {
        name: "fk_chat_has_item_item1_idx",
        using: "BTREE",
        fields: [
          { name: "item_id" },
        ]
      },
      {
        name: "fk_chat_has_item_chat1_idx",
        using: "BTREE",
        fields: [
          { name: "chat_id" },
        ]
      },
    ]
  });
  }
}
