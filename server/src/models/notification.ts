import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { user, userId } from './user';

export interface notificationAttributes {
  id: number;
  title?: string;
  content?: string;
  read?: number;
  createdAt?: Date;
  updatedAt?: Date;
  user_id: number;
}

export type notificationPk = "id";
export type notificationId = notification[notificationPk];
export type notificationOptionalAttributes = "id" | "title" | "content" | "read" | "createdAt" | "updatedAt";
export type notificationCreationAttributes = Optional<notificationAttributes, notificationOptionalAttributes>;

export class notification extends Model<notificationAttributes, notificationCreationAttributes> implements notificationAttributes {
  id!: number;
  title?: string;
  content?: string;
  read?: number;
  createdAt?: Date;
  updatedAt?: Date;
  user_id!: number;

  // notification belongsTo user via user_id
  user!: user;
  getUser!: Sequelize.BelongsToGetAssociationMixin<user>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<user, userId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<user>;

  static initModel(sequelize: Sequelize.Sequelize): typeof notification {
    return notification.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    read: {
      type: DataTypes.TINYINT,
      allowNull: true,
      defaultValue: 0
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'notification',
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
        name: "fk_notification_user1_idx",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
    ]
  });
  }
}
