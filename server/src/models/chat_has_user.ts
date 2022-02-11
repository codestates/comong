import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { chat, chatId } from './chat';
import type { user, userId } from './user';

export interface chat_has_userAttributes {
  chat_id: number;
  user_id: number;
}

export type chat_has_userPk = "chat_id" | "user_id";
export type chat_has_userId = chat_has_user[chat_has_userPk];
export type chat_has_userCreationAttributes = chat_has_userAttributes;

export class chat_has_user extends Model<chat_has_userAttributes, chat_has_userCreationAttributes> implements chat_has_userAttributes {
  chat_id!: number;
  user_id!: number;

  // chat_has_user belongsTo chat via chat_id
  chat!: chat;
  getChat!: Sequelize.BelongsToGetAssociationMixin<chat>;
  setChat!: Sequelize.BelongsToSetAssociationMixin<chat, chatId>;
  createChat!: Sequelize.BelongsToCreateAssociationMixin<chat>;
  // chat_has_user belongsTo user via user_id
  user!: user;
  getUser!: Sequelize.BelongsToGetAssociationMixin<user>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<user, userId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<user>;

  static initModel(sequelize: Sequelize.Sequelize): typeof chat_has_user {
    return chat_has_user.init({
    chat_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'chat',
        key: 'id'
      }
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'user',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'chat_has_user',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "chat_id" },
          { name: "user_id" },
        ]
      },
      {
        name: "fk_chat_has_user_user1_idx",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
      {
        name: "fk_chat_has_user_chat1_idx",
        using: "BTREE",
        fields: [
          { name: "chat_id" },
        ]
      },
    ]
  });
  }
}
