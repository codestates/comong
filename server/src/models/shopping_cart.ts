import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { order_detail, order_detailId } from './order_detail';
import type { shopping_cart_has_order_detail, shopping_cart_has_order_detailId } from './shopping_cart_has_order_detail';
import type { user, userId } from './user';

export interface shopping_cartAttributes {
  id: number;
  user_id: number;
}

export type shopping_cartPk = "id";
export type shopping_cartId = shopping_cart[shopping_cartPk];
export type shopping_cartOptionalAttributes = "id";
export type shopping_cartCreationAttributes = Optional<shopping_cartAttributes, shopping_cartOptionalAttributes>;

export class shopping_cart extends Model<shopping_cartAttributes, shopping_cartCreationAttributes> implements shopping_cartAttributes {
  id!: number;
  user_id!: number;

  // shopping_cart belongsToMany order_detail via shopping_cart_id and order_detail_id
  order_detail_id_order_detail_shopping_cart_has_order_details!: order_detail[];
  getOrder_detail_id_order_detail_shopping_cart_has_order_details!: Sequelize.BelongsToManyGetAssociationsMixin<order_detail>;
  setOrder_detail_id_order_detail_shopping_cart_has_order_details!: Sequelize.BelongsToManySetAssociationsMixin<order_detail, order_detailId>;
  addOrder_detail_id_order_detail_shopping_cart_has_order_detail!: Sequelize.BelongsToManyAddAssociationMixin<order_detail, order_detailId>;
  addOrder_detail_id_order_detail_shopping_cart_has_order_details!: Sequelize.BelongsToManyAddAssociationsMixin<order_detail, order_detailId>;
  createOrder_detail_id_order_detail_shopping_cart_has_order_detail!: Sequelize.BelongsToManyCreateAssociationMixin<order_detail>;
  removeOrder_detail_id_order_detail_shopping_cart_has_order_detail!: Sequelize.BelongsToManyRemoveAssociationMixin<order_detail, order_detailId>;
  removeOrder_detail_id_order_detail_shopping_cart_has_order_details!: Sequelize.BelongsToManyRemoveAssociationsMixin<order_detail, order_detailId>;
  hasOrder_detail_id_order_detail_shopping_cart_has_order_detail!: Sequelize.BelongsToManyHasAssociationMixin<order_detail, order_detailId>;
  hasOrder_detail_id_order_detail_shopping_cart_has_order_details!: Sequelize.BelongsToManyHasAssociationsMixin<order_detail, order_detailId>;
  countOrder_detail_id_order_detail_shopping_cart_has_order_details!: Sequelize.BelongsToManyCountAssociationsMixin;
  // shopping_cart hasMany shopping_cart_has_order_detail via shopping_cart_id
  shopping_cart_has_order_details!: shopping_cart_has_order_detail[];
  getShopping_cart_has_order_details!: Sequelize.HasManyGetAssociationsMixin<shopping_cart_has_order_detail>;
  setShopping_cart_has_order_details!: Sequelize.HasManySetAssociationsMixin<shopping_cart_has_order_detail, shopping_cart_has_order_detailId>;
  addShopping_cart_has_order_detail!: Sequelize.HasManyAddAssociationMixin<shopping_cart_has_order_detail, shopping_cart_has_order_detailId>;
  addShopping_cart_has_order_details!: Sequelize.HasManyAddAssociationsMixin<shopping_cart_has_order_detail, shopping_cart_has_order_detailId>;
  createShopping_cart_has_order_detail!: Sequelize.HasManyCreateAssociationMixin<shopping_cart_has_order_detail>;
  removeShopping_cart_has_order_detail!: Sequelize.HasManyRemoveAssociationMixin<shopping_cart_has_order_detail, shopping_cart_has_order_detailId>;
  removeShopping_cart_has_order_details!: Sequelize.HasManyRemoveAssociationsMixin<shopping_cart_has_order_detail, shopping_cart_has_order_detailId>;
  hasShopping_cart_has_order_detail!: Sequelize.HasManyHasAssociationMixin<shopping_cart_has_order_detail, shopping_cart_has_order_detailId>;
  hasShopping_cart_has_order_details!: Sequelize.HasManyHasAssociationsMixin<shopping_cart_has_order_detail, shopping_cart_has_order_detailId>;
  countShopping_cart_has_order_details!: Sequelize.HasManyCountAssociationsMixin;
  // shopping_cart belongsTo user via user_id
  user!: user;
  getUser!: Sequelize.BelongsToGetAssociationMixin<user>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<user, userId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<user>;

  static initModel(sequelize: Sequelize.Sequelize): typeof shopping_cart {
    return shopping_cart.init({
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
    }
  }, {
    sequelize,
    tableName: 'shopping_cart',
    timestamps: false,
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
        name: "fk_shopping_cart_user1_idx",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
    ]
  });
  }
}
