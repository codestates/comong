import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { user, userId } from './user';

export interface user_addressAttributes {
  id: number;
  user_id: number;
  address_line1?: string;
  address_line2?: string;
  city?: string;
  postal_code?: string;
  country?: string;
  telephone?: string;
  mobile?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type user_addressPk = "id";
export type user_addressId = user_address[user_addressPk];
export type user_addressOptionalAttributes = "id" | "address_line1" | "address_line2" | "city" | "postal_code" | "country" | "telephone" | "mobile" | "createdAt" | "updatedAt";
export type user_addressCreationAttributes = Optional<user_addressAttributes, user_addressOptionalAttributes>;

export class user_address extends Model<user_addressAttributes, user_addressCreationAttributes> implements user_addressAttributes {
  id!: number;
  user_id!: number;
  address_line1?: string;
  address_line2?: string;
  city?: string;
  postal_code?: string;
  country?: string;
  telephone?: string;
  mobile?: string;
  createdAt?: Date;
  updatedAt?: Date;

  // user_address belongsTo user via user_id
  user!: user;
  getUser!: Sequelize.BelongsToGetAssociationMixin<user>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<user, userId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<user>;

  static initModel(sequelize: Sequelize.Sequelize): typeof user_address {
    return user_address.init({
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
    address_line1: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    address_line2: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    city: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    postal_code: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    country: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    telephone: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    mobile: {
      type: DataTypes.STRING(45),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'user_address',
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
        name: "fk_user_address_user1_idx",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
    ]
  });
  }
}
