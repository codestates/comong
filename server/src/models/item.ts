import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { bookmark, bookmarkId } from './bookmark';
import type { category, categoryId } from './category';
import type { chat, chatId } from './chat';
import type { chat_has_item, chat_has_itemId } from './chat_has_item';
import type { item_has_category, item_has_categoryId } from './item_has_category';
import type { item_inventory, item_inventoryId } from './item_inventory';
import type { item_review, item_reviewId } from './item_review';
import type { order_detail, order_detailId } from './order_detail';
import type { user, userId } from './user';

export interface itemAttributes {
  id: number;
  title: string;
  contents?: string;
  price?: number;
  createdAt?: Date;
  updatedAt?: Date;
  image_src?: string;
  user_id: number;
}

export type itemPk = "id";
export type itemId = item[itemPk];
export type itemOptionalAttributes = "id" | "contents" | "price" | "createdAt" | "updatedAt" | "image_src";
export type itemCreationAttributes = Optional<itemAttributes, itemOptionalAttributes>;

export class item extends Model<itemAttributes, itemCreationAttributes> implements itemAttributes {
  id!: number;
  title!: string;
  contents?: string;
  price?: number;
  createdAt?: Date;
  updatedAt?: Date;
  image_src?: string;
  user_id!: number;

  // item hasMany bookmark via item_id
  bookmarks!: bookmark[];
  getBookmarks!: Sequelize.HasManyGetAssociationsMixin<bookmark>;
  setBookmarks!: Sequelize.HasManySetAssociationsMixin<bookmark, bookmarkId>;
  addBookmark!: Sequelize.HasManyAddAssociationMixin<bookmark, bookmarkId>;
  addBookmarks!: Sequelize.HasManyAddAssociationsMixin<bookmark, bookmarkId>;
  createBookmark!: Sequelize.HasManyCreateAssociationMixin<bookmark>;
  removeBookmark!: Sequelize.HasManyRemoveAssociationMixin<bookmark, bookmarkId>;
  removeBookmarks!: Sequelize.HasManyRemoveAssociationsMixin<bookmark, bookmarkId>;
  hasBookmark!: Sequelize.HasManyHasAssociationMixin<bookmark, bookmarkId>;
  hasBookmarks!: Sequelize.HasManyHasAssociationsMixin<bookmark, bookmarkId>;
  countBookmarks!: Sequelize.HasManyCountAssociationsMixin;
  // item belongsToMany category via item_id and category_id
  category_id_category_item_has_categories!: category[];
  getCategory_id_category_item_has_categories!: Sequelize.BelongsToManyGetAssociationsMixin<category>;
  setCategory_id_category_item_has_categories!: Sequelize.BelongsToManySetAssociationsMixin<category, categoryId>;
  addCategory_id_category_item_has_category!: Sequelize.BelongsToManyAddAssociationMixin<category, categoryId>;
  addCategory_id_category_item_has_categories!: Sequelize.BelongsToManyAddAssociationsMixin<category, categoryId>;
  createCategory_id_category_item_has_category!: Sequelize.BelongsToManyCreateAssociationMixin<category>;
  removeCategory_id_category_item_has_category!: Sequelize.BelongsToManyRemoveAssociationMixin<category, categoryId>;
  removeCategory_id_category_item_has_categories!: Sequelize.BelongsToManyRemoveAssociationsMixin<category, categoryId>;
  hasCategory_id_category_item_has_category!: Sequelize.BelongsToManyHasAssociationMixin<category, categoryId>;
  hasCategory_id_category_item_has_categories!: Sequelize.BelongsToManyHasAssociationsMixin<category, categoryId>;
  countCategory_id_category_item_has_categories!: Sequelize.BelongsToManyCountAssociationsMixin;
  // item belongsToMany chat via item_id and chat_id
  chat_id_chats!: chat[];
  getChat_id_chats!: Sequelize.BelongsToManyGetAssociationsMixin<chat>;
  setChat_id_chats!: Sequelize.BelongsToManySetAssociationsMixin<chat, chatId>;
  addChat_id_chat!: Sequelize.BelongsToManyAddAssociationMixin<chat, chatId>;
  addChat_id_chats!: Sequelize.BelongsToManyAddAssociationsMixin<chat, chatId>;
  createChat_id_chat!: Sequelize.BelongsToManyCreateAssociationMixin<chat>;
  removeChat_id_chat!: Sequelize.BelongsToManyRemoveAssociationMixin<chat, chatId>;
  removeChat_id_chats!: Sequelize.BelongsToManyRemoveAssociationsMixin<chat, chatId>;
  hasChat_id_chat!: Sequelize.BelongsToManyHasAssociationMixin<chat, chatId>;
  hasChat_id_chats!: Sequelize.BelongsToManyHasAssociationsMixin<chat, chatId>;
  countChat_id_chats!: Sequelize.BelongsToManyCountAssociationsMixin;
  // item hasMany chat_has_item via item_id
  chat_has_items!: chat_has_item[];
  getChat_has_items!: Sequelize.HasManyGetAssociationsMixin<chat_has_item>;
  setChat_has_items!: Sequelize.HasManySetAssociationsMixin<chat_has_item, chat_has_itemId>;
  addChat_has_item!: Sequelize.HasManyAddAssociationMixin<chat_has_item, chat_has_itemId>;
  addChat_has_items!: Sequelize.HasManyAddAssociationsMixin<chat_has_item, chat_has_itemId>;
  createChat_has_item!: Sequelize.HasManyCreateAssociationMixin<chat_has_item>;
  removeChat_has_item!: Sequelize.HasManyRemoveAssociationMixin<chat_has_item, chat_has_itemId>;
  removeChat_has_items!: Sequelize.HasManyRemoveAssociationsMixin<chat_has_item, chat_has_itemId>;
  hasChat_has_item!: Sequelize.HasManyHasAssociationMixin<chat_has_item, chat_has_itemId>;
  hasChat_has_items!: Sequelize.HasManyHasAssociationsMixin<chat_has_item, chat_has_itemId>;
  countChat_has_items!: Sequelize.HasManyCountAssociationsMixin;
  // item hasMany item_has_category via item_id
  item_has_categories!: item_has_category[];
  getItem_has_categories!: Sequelize.HasManyGetAssociationsMixin<item_has_category>;
  setItem_has_categories!: Sequelize.HasManySetAssociationsMixin<item_has_category, item_has_categoryId>;
  addItem_has_category!: Sequelize.HasManyAddAssociationMixin<item_has_category, item_has_categoryId>;
  addItem_has_categories!: Sequelize.HasManyAddAssociationsMixin<item_has_category, item_has_categoryId>;
  createItem_has_category!: Sequelize.HasManyCreateAssociationMixin<item_has_category>;
  removeItem_has_category!: Sequelize.HasManyRemoveAssociationMixin<item_has_category, item_has_categoryId>;
  removeItem_has_categories!: Sequelize.HasManyRemoveAssociationsMixin<item_has_category, item_has_categoryId>;
  hasItem_has_category!: Sequelize.HasManyHasAssociationMixin<item_has_category, item_has_categoryId>;
  hasItem_has_categories!: Sequelize.HasManyHasAssociationsMixin<item_has_category, item_has_categoryId>;
  countItem_has_categories!: Sequelize.HasManyCountAssociationsMixin;
  // item hasMany item_inventory via item_id
  item_inventories!: item_inventory[];
  getItem_inventories!: Sequelize.HasManyGetAssociationsMixin<item_inventory>;
  setItem_inventories!: Sequelize.HasManySetAssociationsMixin<item_inventory, item_inventoryId>;
  addItem_inventory!: Sequelize.HasManyAddAssociationMixin<item_inventory, item_inventoryId>;
  addItem_inventories!: Sequelize.HasManyAddAssociationsMixin<item_inventory, item_inventoryId>;
  createItem_inventory!: Sequelize.HasManyCreateAssociationMixin<item_inventory>;
  removeItem_inventory!: Sequelize.HasManyRemoveAssociationMixin<item_inventory, item_inventoryId>;
  removeItem_inventories!: Sequelize.HasManyRemoveAssociationsMixin<item_inventory, item_inventoryId>;
  hasItem_inventory!: Sequelize.HasManyHasAssociationMixin<item_inventory, item_inventoryId>;
  hasItem_inventories!: Sequelize.HasManyHasAssociationsMixin<item_inventory, item_inventoryId>;
  countItem_inventories!: Sequelize.HasManyCountAssociationsMixin;
  // item hasMany item_review via item_id
  item_reviews!: item_review[];
  getItem_reviews!: Sequelize.HasManyGetAssociationsMixin<item_review>;
  setItem_reviews!: Sequelize.HasManySetAssociationsMixin<item_review, item_reviewId>;
  addItem_review!: Sequelize.HasManyAddAssociationMixin<item_review, item_reviewId>;
  addItem_reviews!: Sequelize.HasManyAddAssociationsMixin<item_review, item_reviewId>;
  createItem_review!: Sequelize.HasManyCreateAssociationMixin<item_review>;
  removeItem_review!: Sequelize.HasManyRemoveAssociationMixin<item_review, item_reviewId>;
  removeItem_reviews!: Sequelize.HasManyRemoveAssociationsMixin<item_review, item_reviewId>;
  hasItem_review!: Sequelize.HasManyHasAssociationMixin<item_review, item_reviewId>;
  hasItem_reviews!: Sequelize.HasManyHasAssociationsMixin<item_review, item_reviewId>;
  countItem_reviews!: Sequelize.HasManyCountAssociationsMixin;
  // item hasMany order_detail via item_id
  order_details!: order_detail[];
  getOrder_details!: Sequelize.HasManyGetAssociationsMixin<order_detail>;
  setOrder_details!: Sequelize.HasManySetAssociationsMixin<order_detail, order_detailId>;
  addOrder_detail!: Sequelize.HasManyAddAssociationMixin<order_detail, order_detailId>;
  addOrder_details!: Sequelize.HasManyAddAssociationsMixin<order_detail, order_detailId>;
  createOrder_detail!: Sequelize.HasManyCreateAssociationMixin<order_detail>;
  removeOrder_detail!: Sequelize.HasManyRemoveAssociationMixin<order_detail, order_detailId>;
  removeOrder_details!: Sequelize.HasManyRemoveAssociationsMixin<order_detail, order_detailId>;
  hasOrder_detail!: Sequelize.HasManyHasAssociationMixin<order_detail, order_detailId>;
  hasOrder_details!: Sequelize.HasManyHasAssociationsMixin<order_detail, order_detailId>;
  countOrder_details!: Sequelize.HasManyCountAssociationsMixin;
  // item belongsTo user via user_id
  user!: user;
  getUser!: Sequelize.BelongsToGetAssociationMixin<user>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<user, userId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<user>;

  static initModel(sequelize: Sequelize.Sequelize): typeof item {
    return item.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    contents: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    image_src: {
      type: DataTypes.TEXT,
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
    tableName: 'item',
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
        name: "fk_post_user1_idx",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
    ]
  });
  }
}
