import type { Sequelize } from "sequelize";
import { bookmark as _bookmark } from "./bookmark";
import type { bookmarkAttributes, bookmarkCreationAttributes } from "./bookmark";
import { category as _category } from "./category";
import type { categoryAttributes, categoryCreationAttributes } from "./category";
import { category_has_user as _category_has_user } from "./category_has_user";
import type { category_has_userAttributes, category_has_userCreationAttributes } from "./category_has_user";
import { chat as _chat } from "./chat";
import type { chatAttributes, chatCreationAttributes } from "./chat";
import { chat_has_item as _chat_has_item } from "./chat_has_item";
import type { chat_has_itemAttributes, chat_has_itemCreationAttributes } from "./chat_has_item";
import { chat_has_user as _chat_has_user } from "./chat_has_user";
import type { chat_has_userAttributes, chat_has_userCreationAttributes } from "./chat_has_user";
import { item as _item } from "./item";
import type { itemAttributes, itemCreationAttributes } from "./item";
import { item_has_category as _item_has_category } from "./item_has_category";
import type { item_has_categoryAttributes, item_has_categoryCreationAttributes } from "./item_has_category";
import { item_inventory as _item_inventory } from "./item_inventory";
import type { item_inventoryAttributes, item_inventoryCreationAttributes } from "./item_inventory";
import { item_review as _item_review } from "./item_review";
import type { item_reviewAttributes, item_reviewCreationAttributes } from "./item_review";
import { keyword as _keyword } from "./keyword";
import type { keywordAttributes, keywordCreationAttributes } from "./keyword";
import { notification as _notification } from "./notification";
import type { notificationAttributes, notificationCreationAttributes } from "./notification";
import { order as _order } from "./order";
import type { orderAttributes, orderCreationAttributes } from "./order";
import { order_detail as _order_detail } from "./order_detail";
import type { order_detailAttributes, order_detailCreationAttributes } from "./order_detail";
import { order_detail_has_order as _order_detail_has_order } from "./order_detail_has_order";
import type { order_detail_has_orderAttributes, order_detail_has_orderCreationAttributes } from "./order_detail_has_order";
import { refreshtoken as _refreshtoken } from "./refreshtoken";
import type { refreshtokenAttributes, refreshtokenCreationAttributes } from "./refreshtoken";
import { replace_refund as _replace_refund } from "./replace_refund";
import type { replace_refundAttributes, replace_refundCreationAttributes } from "./replace_refund";
import { user as _user } from "./user";
import type { userAttributes, userCreationAttributes } from "./user";
import { user_address as _user_address } from "./user_address";
import type { user_addressAttributes, user_addressCreationAttributes } from "./user_address";
import { user_payment as _user_payment } from "./user_payment";
import type { user_paymentAttributes, user_paymentCreationAttributes } from "./user_payment";

export {
  _bookmark as bookmark,
  _category as category,
  _category_has_user as category_has_user,
  _chat as chat,
  _chat_has_item as chat_has_item,
  _chat_has_user as chat_has_user,
  _item as item,
  _item_has_category as item_has_category,
  _item_inventory as item_inventory,
  _item_review as item_review,
  _keyword as keyword,
  _notification as notification,
  _order as order,
  _order_detail as order_detail,
  _order_detail_has_order as order_detail_has_order,
  _refreshtoken as refreshtoken,
  _replace_refund as replace_refund,
  _user as user,
  _user_address as user_address,
  _user_payment as user_payment,
};

export type {
  bookmarkAttributes,
  bookmarkCreationAttributes,
  categoryAttributes,
  categoryCreationAttributes,
  category_has_userAttributes,
  category_has_userCreationAttributes,
  chatAttributes,
  chatCreationAttributes,
  chat_has_itemAttributes,
  chat_has_itemCreationAttributes,
  chat_has_userAttributes,
  chat_has_userCreationAttributes,
  itemAttributes,
  itemCreationAttributes,
  item_has_categoryAttributes,
  item_has_categoryCreationAttributes,
  item_inventoryAttributes,
  item_inventoryCreationAttributes,
  item_reviewAttributes,
  item_reviewCreationAttributes,
  keywordAttributes,
  keywordCreationAttributes,
  notificationAttributes,
  notificationCreationAttributes,
  orderAttributes,
  orderCreationAttributes,
  order_detailAttributes,
  order_detailCreationAttributes,
  order_detail_has_orderAttributes,
  order_detail_has_orderCreationAttributes,
  refreshtokenAttributes,
  refreshtokenCreationAttributes,
  replace_refundAttributes,
  replace_refundCreationAttributes,
  userAttributes,
  userCreationAttributes,
  user_addressAttributes,
  user_addressCreationAttributes,
  user_paymentAttributes,
  user_paymentCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  const bookmark = _bookmark.initModel(sequelize);
  const category = _category.initModel(sequelize);
  const category_has_user = _category_has_user.initModel(sequelize);
  const chat = _chat.initModel(sequelize);
  const chat_has_item = _chat_has_item.initModel(sequelize);
  const chat_has_user = _chat_has_user.initModel(sequelize);
  const item = _item.initModel(sequelize);
  const item_has_category = _item_has_category.initModel(sequelize);
  const item_inventory = _item_inventory.initModel(sequelize);
  const item_review = _item_review.initModel(sequelize);
  const keyword = _keyword.initModel(sequelize);
  const notification = _notification.initModel(sequelize);
  const order = _order.initModel(sequelize);
  const order_detail = _order_detail.initModel(sequelize);
  const order_detail_has_order = _order_detail_has_order.initModel(sequelize);
  const refreshtoken = _refreshtoken.initModel(sequelize);
  const replace_refund = _replace_refund.initModel(sequelize);
  const user = _user.initModel(sequelize);
  const user_address = _user_address.initModel(sequelize);
  const user_payment = _user_payment.initModel(sequelize);

  category.belongsToMany(item, { as: 'item_id_item_item_has_categories', through: item_has_category, foreignKey: "category_id", otherKey: "item_id" });
  category.belongsToMany(user, { as: 'user_id_users', through: category_has_user, foreignKey: "category_id", otherKey: "user_id" });
  chat.belongsToMany(item, { as: 'item_id_items', through: chat_has_item, foreignKey: "chat_id", otherKey: "item_id" });
  chat.belongsToMany(user, { as: 'user_id_user_chat_has_users', through: chat_has_user, foreignKey: "chat_id", otherKey: "user_id" });
  item.belongsToMany(category, { as: 'category_id_category_item_has_categories', through: item_has_category, foreignKey: "item_id", otherKey: "category_id" });
  item.belongsToMany(chat, { as: 'chat_id_chats', through: chat_has_item, foreignKey: "item_id", otherKey: "chat_id" });
  order.belongsToMany(order_detail, { as: 'order_detail_id_order_details', through: order_detail_has_order, foreignKey: "order_id", otherKey: "order_detail_id" });
  order_detail.belongsToMany(order, { as: 'order_id_orders', through: order_detail_has_order, foreignKey: "order_detail_id", otherKey: "order_id" });
  user.belongsToMany(category, { as: 'category_id_categories', through: category_has_user, foreignKey: "user_id", otherKey: "category_id" });
  user.belongsToMany(chat, { as: 'chat_id_chat_chat_has_users', through: chat_has_user, foreignKey: "user_id", otherKey: "chat_id" });
  category_has_user.belongsTo(category, { as: "category", foreignKey: "category_id"});
  category.hasMany(category_has_user, { as: "category_has_users", foreignKey: "category_id"});
  item_has_category.belongsTo(category, { as: "category", foreignKey: "category_id"});
  category.hasMany(item_has_category, { as: "item_has_categories", foreignKey: "category_id"});
  chat_has_item.belongsTo(chat, { as: "chat", foreignKey: "chat_id"});
  chat.hasMany(chat_has_item, { as: "chat_has_items", foreignKey: "chat_id"});
  chat_has_user.belongsTo(chat, { as: "chat", foreignKey: "chat_id"});
  chat.hasMany(chat_has_user, { as: "chat_has_users", foreignKey: "chat_id"});
  bookmark.belongsTo(item, { as: "item", foreignKey: "item_id"});
  item.hasMany(bookmark, { as: "bookmarks", foreignKey: "item_id"});
  chat_has_item.belongsTo(item, { as: "item", foreignKey: "item_id"});
  item.hasMany(chat_has_item, { as: "chat_has_items", foreignKey: "item_id"});
  item_has_category.belongsTo(item, { as: "item", foreignKey: "item_id"});
  item.hasMany(item_has_category, { as: "item_has_categories", foreignKey: "item_id"});
  item_inventory.belongsTo(item, { as: "item", foreignKey: "item_id"});
  item.hasMany(item_inventory, { as: "item_inventories", foreignKey: "item_id"});
  order_detail.belongsTo(item, { as: "item", foreignKey: "item_id"});
  item.hasMany(order_detail, { as: "order_details", foreignKey: "item_id"});
  order_detail_has_order.belongsTo(order, { as: "order", foreignKey: "order_id"});
  order.hasMany(order_detail_has_order, { as: "order_detail_has_orders", foreignKey: "order_id"});
  user_payment.belongsTo(order, { as: "order", foreignKey: "order_id"});
  order.hasMany(user_payment, { as: "user_payments", foreignKey: "order_id"});
  item_review.belongsTo(order_detail, { as: "order_detail", foreignKey: "order_detail_id"});
  order_detail.hasMany(item_review, { as: "item_reviews", foreignKey: "order_detail_id"});
  order_detail_has_order.belongsTo(order_detail, { as: "order_detail", foreignKey: "order_detail_id"});
  order_detail.hasMany(order_detail_has_order, { as: "order_detail_has_orders", foreignKey: "order_detail_id"});
  replace_refund.belongsTo(order_detail, { as: "order_detail", foreignKey: "order_detail_id"});
  order_detail.hasMany(replace_refund, { as: "replace_refunds", foreignKey: "order_detail_id"});
  bookmark.belongsTo(user, { as: "user", foreignKey: "user_id"});
  user.hasMany(bookmark, { as: "bookmarks", foreignKey: "user_id"});
  category_has_user.belongsTo(user, { as: "user", foreignKey: "user_id"});
  user.hasMany(category_has_user, { as: "category_has_users", foreignKey: "user_id"});
  chat_has_user.belongsTo(user, { as: "user", foreignKey: "user_id"});
  user.hasMany(chat_has_user, { as: "chat_has_users", foreignKey: "user_id"});
  item.belongsTo(user, { as: "user", foreignKey: "user_id"});
  user.hasMany(item, { as: "items", foreignKey: "user_id"});
  item_review.belongsTo(user, { as: "user", foreignKey: "user_id"});
  user.hasMany(item_review, { as: "item_reviews", foreignKey: "user_id"});
  keyword.belongsTo(user, { as: "user", foreignKey: "user_id"});
  user.hasMany(keyword, { as: "keywords", foreignKey: "user_id"});
  notification.belongsTo(user, { as: "user", foreignKey: "user_id"});
  user.hasMany(notification, { as: "notifications", foreignKey: "user_id"});
  order.belongsTo(user, { as: "user", foreignKey: "user_id"});
  user.hasMany(order, { as: "orders", foreignKey: "user_id"});
  order_detail.belongsTo(user, { as: "user", foreignKey: "user_id"});
  user.hasMany(order_detail, { as: "order_details", foreignKey: "user_id"});
  refreshtoken.belongsTo(user, { as: "user", foreignKey: "user_id"});
  user.hasMany(refreshtoken, { as: "refreshtokens", foreignKey: "user_id"});
  replace_refund.belongsTo(user, { as: "user", foreignKey: "user_id"});
  user.hasMany(replace_refund, { as: "replace_refunds", foreignKey: "user_id"});
  user_address.belongsTo(user, { as: "user", foreignKey: "user_id"});
  user.hasMany(user_address, { as: "user_addresses", foreignKey: "user_id"});
  user_payment.belongsTo(user, { as: "user", foreignKey: "user_id"});
  user.hasMany(user_payment, { as: "user_payments", foreignKey: "user_id"});

  return {
    bookmark: bookmark,
    category: category,
    category_has_user: category_has_user,
    chat: chat,
    chat_has_item: chat_has_item,
    chat_has_user: chat_has_user,
    item: item,
    item_has_category: item_has_category,
    item_inventory: item_inventory,
    item_review: item_review,
    keyword: keyword,
    notification: notification,
    order: order,
    order_detail: order_detail,
    order_detail_has_order: order_detail_has_order,
    refreshtoken: refreshtoken,
    replace_refund: replace_refund,
    user: user,
    user_address: user_address,
    user_payment: user_payment,
  };
}
