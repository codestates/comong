import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { order, orderId } from './order';
import type { user, userId } from './user';

export interface user_paymentAttributes {
  id: number;
  user_id: number;
  order_id: string;
  payment_method?: string;
  detail?: string;
  total_amount?: string;
  imp_uid?: string;
  merchant_uid?: string;
  buyer_name?: string;
  status?: string;
  createdAt?: Date;
  updatedAt?: Date;
  address_line1?: string;
  address_line2?: string;
  postal_code?: string;
  email?: string;
  contact?: string;
}

export type user_paymentPk = "id";
export type user_paymentId = user_payment[user_paymentPk];
export type user_paymentOptionalAttributes = "id" | "payment_method" | "detail" | "total_amount" | "imp_uid" | "merchant_uid" | "buyer_name" | "status" | "createdAt" | "updatedAt" | "address_line1" | "address_line2" | "postal_code" | "email" | "contact";
export type user_paymentCreationAttributes = Optional<user_paymentAttributes, user_paymentOptionalAttributes>;

export class user_payment extends Model<user_paymentAttributes, user_paymentCreationAttributes> implements user_paymentAttributes {
  id!: number;
  user_id!: number;
  order_id!: string;
  payment_method?: string;
  detail?: string;
  total_amount?: string;
  imp_uid?: string;
  merchant_uid?: string;
  buyer_name?: string;
  status?: string;
  createdAt?: Date;
  updatedAt?: Date;
  address_line1?: string;
  address_line2?: string;
  postal_code?: string;
  email?: string;
  contact?: string;

  // user_payment belongsTo order via order_id
  order!: order;
  getOrder!: Sequelize.BelongsToGetAssociationMixin<order>;
  setOrder!: Sequelize.BelongsToSetAssociationMixin<order, orderId>;
  createOrder!: Sequelize.BelongsToCreateAssociationMixin<order>;
  // user_payment belongsTo user via user_id
  user!: user;
  getUser!: Sequelize.BelongsToGetAssociationMixin<user>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<user, userId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<user>;

  static initModel(sequelize: Sequelize.Sequelize): typeof user_payment {
    return user_payment.init({
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
    order_id: {
      type: DataTypes.STRING(45),
      allowNull: false,
      references: {
        model: 'order',
        key: 'id'
      }
    },
    payment_method: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    detail: {
      type: DataTypes.STRING(225),
      allowNull: true
    },
    total_amount: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    imp_uid: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    merchant_uid: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    buyer_name: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    status: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    address_line1: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    address_line2: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    postal_code: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    contact: {
      type: DataTypes.STRING(45),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'user_payment',
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
        name: "fk_user_payment_user1_idx",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
      {
        name: "fk_user_payment_order1_idx",
        using: "BTREE",
        fields: [
          { name: "order_id" },
        ]
      },
    ]
  });
  }
}
