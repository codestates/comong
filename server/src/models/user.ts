import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { chat, chatId } from './chat';
import type { chat_has_user, chat_has_userId } from './chat_has_user';
import type { comment, commentId } from './comment';
import type { comment_has_user, comment_has_userId } from './comment_has_user';
import type { item, itemId } from './item';
import type { order, orderId } from './order';
import type { order_has_user, order_has_userId } from './order_has_user';
import type { refreshtoken, refreshtokenId } from './refreshtoken';
import type { shopping_cart, shopping_cartId } from './shopping_cart';
import type { user_address, user_addressId } from './user_address';
import type { user_payment, user_paymentId } from './user_payment';

export interface userAttributes {
  id: number;
  nickname?: string;
  email: string;
  mobile?: string;
  password?: string;
  createdAt?: Date;
  updatedAt?: Date;
  gender?: string;
  birthday?: string;
  role: string;
}

export type userPk = "id";
export type userId = user[userPk];
export type userOptionalAttributes = "id" | "nickname" | "mobile" | "password" | "createdAt" | "updatedAt" | "gender" | "birthday" | "role";
export type userCreationAttributes = Optional<userAttributes, userOptionalAttributes>;

export class user extends Model<userAttributes, userCreationAttributes> implements userAttributes {
  id!: number;
  nickname?: string;
  email!: string;
  mobile?: string;
  password?: string;
  createdAt?: Date;
  updatedAt?: Date;
  gender?: string;
  birthday?: string;
  role!: string;

  // user belongsToMany chat via user_id and chat_id
  chat_id_chat_chat_has_users!: chat[];
  getChat_id_chat_chat_has_users!: Sequelize.BelongsToManyGetAssociationsMixin<chat>;
  setChat_id_chat_chat_has_users!: Sequelize.BelongsToManySetAssociationsMixin<chat, chatId>;
  addChat_id_chat_chat_has_user!: Sequelize.BelongsToManyAddAssociationMixin<chat, chatId>;
  addChat_id_chat_chat_has_users!: Sequelize.BelongsToManyAddAssociationsMixin<chat, chatId>;
  createChat_id_chat_chat_has_user!: Sequelize.BelongsToManyCreateAssociationMixin<chat>;
  removeChat_id_chat_chat_has_user!: Sequelize.BelongsToManyRemoveAssociationMixin<chat, chatId>;
  removeChat_id_chat_chat_has_users!: Sequelize.BelongsToManyRemoveAssociationsMixin<chat, chatId>;
  hasChat_id_chat_chat_has_user!: Sequelize.BelongsToManyHasAssociationMixin<chat, chatId>;
  hasChat_id_chat_chat_has_users!: Sequelize.BelongsToManyHasAssociationsMixin<chat, chatId>;
  countChat_id_chat_chat_has_users!: Sequelize.BelongsToManyCountAssociationsMixin;
  // user hasMany chat_has_user via user_id
  chat_has_users!: chat_has_user[];
  getChat_has_users!: Sequelize.HasManyGetAssociationsMixin<chat_has_user>;
  setChat_has_users!: Sequelize.HasManySetAssociationsMixin<chat_has_user, chat_has_userId>;
  addChat_has_user!: Sequelize.HasManyAddAssociationMixin<chat_has_user, chat_has_userId>;
  addChat_has_users!: Sequelize.HasManyAddAssociationsMixin<chat_has_user, chat_has_userId>;
  createChat_has_user!: Sequelize.HasManyCreateAssociationMixin<chat_has_user>;
  removeChat_has_user!: Sequelize.HasManyRemoveAssociationMixin<chat_has_user, chat_has_userId>;
  removeChat_has_users!: Sequelize.HasManyRemoveAssociationsMixin<chat_has_user, chat_has_userId>;
  hasChat_has_user!: Sequelize.HasManyHasAssociationMixin<chat_has_user, chat_has_userId>;
  hasChat_has_users!: Sequelize.HasManyHasAssociationsMixin<chat_has_user, chat_has_userId>;
  countChat_has_users!: Sequelize.HasManyCountAssociationsMixin;
  // user belongsToMany comment via user_id and comment_id
  comment_id_comments!: comment[];
  getComment_id_comments!: Sequelize.BelongsToManyGetAssociationsMixin<comment>;
  setComment_id_comments!: Sequelize.BelongsToManySetAssociationsMixin<comment, commentId>;
  addComment_id_comment!: Sequelize.BelongsToManyAddAssociationMixin<comment, commentId>;
  addComment_id_comments!: Sequelize.BelongsToManyAddAssociationsMixin<comment, commentId>;
  createComment_id_comment!: Sequelize.BelongsToManyCreateAssociationMixin<comment>;
  removeComment_id_comment!: Sequelize.BelongsToManyRemoveAssociationMixin<comment, commentId>;
  removeComment_id_comments!: Sequelize.BelongsToManyRemoveAssociationsMixin<comment, commentId>;
  hasComment_id_comment!: Sequelize.BelongsToManyHasAssociationMixin<comment, commentId>;
  hasComment_id_comments!: Sequelize.BelongsToManyHasAssociationsMixin<comment, commentId>;
  countComment_id_comments!: Sequelize.BelongsToManyCountAssociationsMixin;
  // user hasMany comment_has_user via user_id
  comment_has_users!: comment_has_user[];
  getComment_has_users!: Sequelize.HasManyGetAssociationsMixin<comment_has_user>;
  setComment_has_users!: Sequelize.HasManySetAssociationsMixin<comment_has_user, comment_has_userId>;
  addComment_has_user!: Sequelize.HasManyAddAssociationMixin<comment_has_user, comment_has_userId>;
  addComment_has_users!: Sequelize.HasManyAddAssociationsMixin<comment_has_user, comment_has_userId>;
  createComment_has_user!: Sequelize.HasManyCreateAssociationMixin<comment_has_user>;
  removeComment_has_user!: Sequelize.HasManyRemoveAssociationMixin<comment_has_user, comment_has_userId>;
  removeComment_has_users!: Sequelize.HasManyRemoveAssociationsMixin<comment_has_user, comment_has_userId>;
  hasComment_has_user!: Sequelize.HasManyHasAssociationMixin<comment_has_user, comment_has_userId>;
  hasComment_has_users!: Sequelize.HasManyHasAssociationsMixin<comment_has_user, comment_has_userId>;
  countComment_has_users!: Sequelize.HasManyCountAssociationsMixin;
  // user hasMany item via user_id
  items!: item[];
  getItems!: Sequelize.HasManyGetAssociationsMixin<item>;
  setItems!: Sequelize.HasManySetAssociationsMixin<item, itemId>;
  addItem!: Sequelize.HasManyAddAssociationMixin<item, itemId>;
  addItems!: Sequelize.HasManyAddAssociationsMixin<item, itemId>;
  createItem!: Sequelize.HasManyCreateAssociationMixin<item>;
  removeItem!: Sequelize.HasManyRemoveAssociationMixin<item, itemId>;
  removeItems!: Sequelize.HasManyRemoveAssociationsMixin<item, itemId>;
  hasItem!: Sequelize.HasManyHasAssociationMixin<item, itemId>;
  hasItems!: Sequelize.HasManyHasAssociationsMixin<item, itemId>;
  countItems!: Sequelize.HasManyCountAssociationsMixin;
  // user belongsToMany order via user_id and order_id
  order_id_order_order_has_users!: order[];
  getOrder_id_order_order_has_users!: Sequelize.BelongsToManyGetAssociationsMixin<order>;
  setOrder_id_order_order_has_users!: Sequelize.BelongsToManySetAssociationsMixin<order, orderId>;
  addOrder_id_order_order_has_user!: Sequelize.BelongsToManyAddAssociationMixin<order, orderId>;
  addOrder_id_order_order_has_users!: Sequelize.BelongsToManyAddAssociationsMixin<order, orderId>;
  createOrder_id_order_order_has_user!: Sequelize.BelongsToManyCreateAssociationMixin<order>;
  removeOrder_id_order_order_has_user!: Sequelize.BelongsToManyRemoveAssociationMixin<order, orderId>;
  removeOrder_id_order_order_has_users!: Sequelize.BelongsToManyRemoveAssociationsMixin<order, orderId>;
  hasOrder_id_order_order_has_user!: Sequelize.BelongsToManyHasAssociationMixin<order, orderId>;
  hasOrder_id_order_order_has_users!: Sequelize.BelongsToManyHasAssociationsMixin<order, orderId>;
  countOrder_id_order_order_has_users!: Sequelize.BelongsToManyCountAssociationsMixin;
  // user hasMany order_has_user via user_id
  order_has_users!: order_has_user[];
  getOrder_has_users!: Sequelize.HasManyGetAssociationsMixin<order_has_user>;
  setOrder_has_users!: Sequelize.HasManySetAssociationsMixin<order_has_user, order_has_userId>;
  addOrder_has_user!: Sequelize.HasManyAddAssociationMixin<order_has_user, order_has_userId>;
  addOrder_has_users!: Sequelize.HasManyAddAssociationsMixin<order_has_user, order_has_userId>;
  createOrder_has_user!: Sequelize.HasManyCreateAssociationMixin<order_has_user>;
  removeOrder_has_user!: Sequelize.HasManyRemoveAssociationMixin<order_has_user, order_has_userId>;
  removeOrder_has_users!: Sequelize.HasManyRemoveAssociationsMixin<order_has_user, order_has_userId>;
  hasOrder_has_user!: Sequelize.HasManyHasAssociationMixin<order_has_user, order_has_userId>;
  hasOrder_has_users!: Sequelize.HasManyHasAssociationsMixin<order_has_user, order_has_userId>;
  countOrder_has_users!: Sequelize.HasManyCountAssociationsMixin;
  // user hasMany refreshtoken via user_id
  refreshtokens!: refreshtoken[];
  getRefreshtokens!: Sequelize.HasManyGetAssociationsMixin<refreshtoken>;
  setRefreshtokens!: Sequelize.HasManySetAssociationsMixin<refreshtoken, refreshtokenId>;
  addRefreshtoken!: Sequelize.HasManyAddAssociationMixin<refreshtoken, refreshtokenId>;
  addRefreshtokens!: Sequelize.HasManyAddAssociationsMixin<refreshtoken, refreshtokenId>;
  createRefreshtoken!: Sequelize.HasManyCreateAssociationMixin<refreshtoken>;
  removeRefreshtoken!: Sequelize.HasManyRemoveAssociationMixin<refreshtoken, refreshtokenId>;
  removeRefreshtokens!: Sequelize.HasManyRemoveAssociationsMixin<refreshtoken, refreshtokenId>;
  hasRefreshtoken!: Sequelize.HasManyHasAssociationMixin<refreshtoken, refreshtokenId>;
  hasRefreshtokens!: Sequelize.HasManyHasAssociationsMixin<refreshtoken, refreshtokenId>;
  countRefreshtokens!: Sequelize.HasManyCountAssociationsMixin;
  // user hasMany shopping_cart via user_id
  shopping_carts!: shopping_cart[];
  getShopping_carts!: Sequelize.HasManyGetAssociationsMixin<shopping_cart>;
  setShopping_carts!: Sequelize.HasManySetAssociationsMixin<shopping_cart, shopping_cartId>;
  addShopping_cart!: Sequelize.HasManyAddAssociationMixin<shopping_cart, shopping_cartId>;
  addShopping_carts!: Sequelize.HasManyAddAssociationsMixin<shopping_cart, shopping_cartId>;
  createShopping_cart!: Sequelize.HasManyCreateAssociationMixin<shopping_cart>;
  removeShopping_cart!: Sequelize.HasManyRemoveAssociationMixin<shopping_cart, shopping_cartId>;
  removeShopping_carts!: Sequelize.HasManyRemoveAssociationsMixin<shopping_cart, shopping_cartId>;
  hasShopping_cart!: Sequelize.HasManyHasAssociationMixin<shopping_cart, shopping_cartId>;
  hasShopping_carts!: Sequelize.HasManyHasAssociationsMixin<shopping_cart, shopping_cartId>;
  countShopping_carts!: Sequelize.HasManyCountAssociationsMixin;
  // user hasMany user_address via user_id
  user_addresses!: user_address[];
  getUser_addresses!: Sequelize.HasManyGetAssociationsMixin<user_address>;
  setUser_addresses!: Sequelize.HasManySetAssociationsMixin<user_address, user_addressId>;
  addUser_address!: Sequelize.HasManyAddAssociationMixin<user_address, user_addressId>;
  addUser_addresses!: Sequelize.HasManyAddAssociationsMixin<user_address, user_addressId>;
  createUser_address!: Sequelize.HasManyCreateAssociationMixin<user_address>;
  removeUser_address!: Sequelize.HasManyRemoveAssociationMixin<user_address, user_addressId>;
  removeUser_addresses!: Sequelize.HasManyRemoveAssociationsMixin<user_address, user_addressId>;
  hasUser_address!: Sequelize.HasManyHasAssociationMixin<user_address, user_addressId>;
  hasUser_addresses!: Sequelize.HasManyHasAssociationsMixin<user_address, user_addressId>;
  countUser_addresses!: Sequelize.HasManyCountAssociationsMixin;
  // user hasMany user_payment via user_id
  user_payments!: user_payment[];
  getUser_payments!: Sequelize.HasManyGetAssociationsMixin<user_payment>;
  setUser_payments!: Sequelize.HasManySetAssociationsMixin<user_payment, user_paymentId>;
  addUser_payment!: Sequelize.HasManyAddAssociationMixin<user_payment, user_paymentId>;
  addUser_payments!: Sequelize.HasManyAddAssociationsMixin<user_payment, user_paymentId>;
  createUser_payment!: Sequelize.HasManyCreateAssociationMixin<user_payment>;
  removeUser_payment!: Sequelize.HasManyRemoveAssociationMixin<user_payment, user_paymentId>;
  removeUser_payments!: Sequelize.HasManyRemoveAssociationsMixin<user_payment, user_paymentId>;
  hasUser_payment!: Sequelize.HasManyHasAssociationMixin<user_payment, user_paymentId>;
  hasUser_payments!: Sequelize.HasManyHasAssociationsMixin<user_payment, user_paymentId>;
  countUser_payments!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof user {
    return user.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nickname: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    mobile: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    password: {
      type: DataTypes.STRING(300),
      allowNull: true
    },
    gender: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    birthday: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    role: {
      type: DataTypes.STRING(15),
      allowNull: false,
      defaultValue: "0"
    }
  }, {
    sequelize,
    tableName: 'user',
    hasTrigger: true,
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
    ]
  });
  }
}
