import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { order_detail, order_detailId } from './order_detail';
import type { shopping_cart, shopping_cartId } from './shopping_cart';

export interface shopping_cart_has_order_detailAttributes {
  shopping_cart_id: number;
  order_detail_id: number;
}

export type shopping_cart_has_order_detailPk = "shopping_cart_id" | "order_detail_id";
export type shopping_cart_has_order_detailId = shopping_cart_has_order_detail[shopping_cart_has_order_detailPk];
export type shopping_cart_has_order_detailCreationAttributes = shopping_cart_has_order_detailAttributes;

export class shopping_cart_has_order_detail extends Model<shopping_cart_has_order_detailAttributes, shopping_cart_has_order_detailCreationAttributes> implements shopping_cart_has_order_detailAttributes {
  shopping_cart_id!: number;
  order_detail_id!: number;

  // shopping_cart_has_order_detail belongsTo order_detail via order_detail_id
  order_detail!: order_detail;
  getOrder_detail!: Sequelize.BelongsToGetAssociationMixin<order_detail>;
  setOrder_detail!: Sequelize.BelongsToSetAssociationMixin<order_detail, order_detailId>;
  createOrder_detail!: Sequelize.BelongsToCreateAssociationMixin<order_detail>;
  // shopping_cart_has_order_detail belongsTo shopping_cart via shopping_cart_id
  shopping_cart!: shopping_cart;
  getShopping_cart!: Sequelize.BelongsToGetAssociationMixin<shopping_cart>;
  setShopping_cart!: Sequelize.BelongsToSetAssociationMixin<shopping_cart, shopping_cartId>;
  createShopping_cart!: Sequelize.BelongsToCreateAssociationMixin<shopping_cart>;

  static initModel(sequelize: Sequelize.Sequelize): typeof shopping_cart_has_order_detail {
    return shopping_cart_has_order_detail.init({
    shopping_cart_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'shopping_cart',
        key: 'id'
      }
    },
    order_detail_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'order_detail',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'shopping_cart_has_order_detail',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "shopping_cart_id" },
          { name: "order_detail_id" },
        ]
      },
      {
        name: "fk_shopping_cart_has_order_detail_order_detail1_idx",
        using: "BTREE",
        fields: [
          { name: "order_detail_id" },
        ]
      },
      {
        name: "fk_shopping_cart_has_order_detail_shopping_cart1_idx",
        using: "BTREE",
        fields: [
          { name: "shopping_cart_id" },
        ]
      },
    ]
  });
  }
}
