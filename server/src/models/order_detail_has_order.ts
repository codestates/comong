import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { order, orderId } from './order';
import type { order_detail, order_detailId } from './order_detail';

export interface order_detail_has_orderAttributes {
  order_detail_id: number;
  order_id: string;
}

export type order_detail_has_orderPk = "order_detail_id" | "order_id";
export type order_detail_has_orderId = order_detail_has_order[order_detail_has_orderPk];
export type order_detail_has_orderCreationAttributes = order_detail_has_orderAttributes;

export class order_detail_has_order extends Model<order_detail_has_orderAttributes, order_detail_has_orderCreationAttributes> implements order_detail_has_orderAttributes {
  order_detail_id!: number;
  order_id!: string;

  // order_detail_has_order belongsTo order via order_id
  order!: order;
  getOrder!: Sequelize.BelongsToGetAssociationMixin<order>;
  setOrder!: Sequelize.BelongsToSetAssociationMixin<order, orderId>;
  createOrder!: Sequelize.BelongsToCreateAssociationMixin<order>;
  // order_detail_has_order belongsTo order_detail via order_detail_id
  order_detail!: order_detail;
  getOrder_detail!: Sequelize.BelongsToGetAssociationMixin<order_detail>;
  setOrder_detail!: Sequelize.BelongsToSetAssociationMixin<order_detail, order_detailId>;
  createOrder_detail!: Sequelize.BelongsToCreateAssociationMixin<order_detail>;

  static initModel(sequelize: Sequelize.Sequelize): typeof order_detail_has_order {
    return order_detail_has_order.init({
    order_detail_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'order_detail',
        key: 'id'
      }
    },
    order_id: {
      type: DataTypes.STRING(45),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'order',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'order_detail_has_order',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "order_detail_id" },
          { name: "order_id" },
        ]
      },
      {
        name: "fk_order_detail_has_order_order1_idx",
        using: "BTREE",
        fields: [
          { name: "order_id" },
        ]
      },
      {
        name: "fk_order_detail_has_order_order_detail1_idx",
        using: "BTREE",
        fields: [
          { name: "order_detail_id" },
        ]
      },
    ]
  });
  }
}
