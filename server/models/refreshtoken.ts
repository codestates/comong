import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { user, userId } from './user';

export interface refreshtokenAttributes {
  id: number;
  refreshtoken?: string;
  exp?: Date;
  createdAt?: Date;
  updatedAt?: Date;
  user_id: number;
}

export type refreshtokenPk = "id";
export type refreshtokenId = refreshtoken[refreshtokenPk];
export type refreshtokenOptionalAttributes = "id" | "refreshtoken" | "exp" | "createdAt" | "updatedAt";
export type refreshtokenCreationAttributes = Optional<refreshtokenAttributes, refreshtokenOptionalAttributes>;

export class refreshtoken extends Model<refreshtokenAttributes, refreshtokenCreationAttributes> implements refreshtokenAttributes {
  id!: number;
  refreshtoken?: string;
  exp?: Date;
  createdAt?: Date;
  updatedAt?: Date;
  user_id!: number;

  // refreshtoken belongsTo user via user_id
  user!: user;
  getUser!: Sequelize.BelongsToGetAssociationMixin<user>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<user, userId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<user>;

  static initModel(sequelize: Sequelize.Sequelize): typeof refreshtoken {
    return refreshtoken.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    refreshtoken: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    exp: {
      type: DataTypes.DATE,
      allowNull: true
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
    tableName: 'refreshtoken',
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
        name: "fk_refreshtoken_user1_idx",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
    ]
  });
  }
}
