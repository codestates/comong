import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { user, userId } from './user';

export interface keywordAttributes {
  id: number;
  keyword?: string;
  score?: number;
  user_id?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export type keywordPk = "id";
export type keywordId = keyword[keywordPk];
export type keywordOptionalAttributes = "id" | "keyword" | "score" | "user_id" | "createdAt" | "updatedAt";
export type keywordCreationAttributes = Optional<keywordAttributes, keywordOptionalAttributes>;

export class keyword extends Model<keywordAttributes, keywordCreationAttributes> implements keywordAttributes {
  id!: number;
  keyword?: string;
  score?: number;
  user_id?: number;
  createdAt?: Date;
  updatedAt?: Date;

  // keyword belongsTo user via user_id
  user!: user;
  getUser!: Sequelize.BelongsToGetAssociationMixin<user>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<user, userId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<user>;

  static initModel(sequelize: Sequelize.Sequelize): typeof keyword {
    return keyword.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    keyword: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    score: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'user',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'keyword',
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
        name: "fk_keyword_user1_idx",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
    ]
  });
  }
}
