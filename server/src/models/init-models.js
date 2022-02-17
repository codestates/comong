var DataTypes = require("sequelize").DataTypes;
var _category = require("./category");
var _category_has_user = require("./category_has_user");
var _chat = require("./chat");
var _chat_has_item = require("./chat_has_item");
var _chat_has_user = require("./chat_has_user");
var _item = require("./item");
var _item_has_category = require("./item_has_category");
var _item_inventory = require("./item_inventory");
var _order = require("./order");
var _order_detail = require("./order_detail");
var _order_detail_has_order = require("./order_detail_has_order");
var _order_has_user = require("./order_has_user");
var _refreshtoken = require("./refreshtoken");
var _shipping = require("./shipping");
var _user = require("./user");
var _user_address = require("./user_address");
var _user_payment = require("./user_payment");
var _user_payment_has_order = require("./user_payment_has_order");
var _user_payment_has_shipping = require("./user_payment_has_shipping");

function initModels(sequelize) {
  var category = _category(sequelize, DataTypes);
  var category_has_user = _category_has_user(sequelize, DataTypes);
  var chat = _chat(sequelize, DataTypes);
  var chat_has_item = _chat_has_item(sequelize, DataTypes);
  var chat_has_user = _chat_has_user(sequelize, DataTypes);
  var item = _item(sequelize, DataTypes);
  var item_has_category = _item_has_category(sequelize, DataTypes);
  var item_inventory = _item_inventory(sequelize, DataTypes);
  var order = _order(sequelize, DataTypes);
  var order_detail = _order_detail(sequelize, DataTypes);
  var order_detail_has_order = _order_detail_has_order(sequelize, DataTypes);
  var order_has_user = _order_has_user(sequelize, DataTypes);
  var refreshtoken = _refreshtoken(sequelize, DataTypes);
  var shipping = _shipping(sequelize, DataTypes);
  var user = _user(sequelize, DataTypes);
  var user_address = _user_address(sequelize, DataTypes);
  var user_payment = _user_payment(sequelize, DataTypes);
  var user_payment_has_order = _user_payment_has_order(sequelize, DataTypes);
  var user_payment_has_shipping = _user_payment_has_shipping(sequelize, DataTypes);

  category.belongsToMany(item, { as: 'item_id_item_item_has_categories', through: item_has_category, foreignKey: "category_id", otherKey: "item_id" });
  category.belongsToMany(user, { as: 'user_id_users', through: category_has_user, foreignKey: "category_id", otherKey: "user_id" });
  chat.belongsToMany(item, { as: 'item_id_items', through: chat_has_item, foreignKey: "chat_id", otherKey: "item_id" });
  chat.belongsToMany(user, { as: 'user_id_user_chat_has_users', through: chat_has_user, foreignKey: "chat_id", otherKey: "user_id" });
  item.belongsToMany(category, { as: 'category_id_category_item_has_categories', through: item_has_category, foreignKey: "item_id", otherKey: "category_id" });
  item.belongsToMany(chat, { as: 'chat_id_chats', through: chat_has_item, foreignKey: "item_id", otherKey: "chat_id" });
  order.belongsToMany(order_detail, { as: 'order_detail_id_order_details', through: order_detail_has_order, foreignKey: "order_id", otherKey: "order_detail_id" });
  order.belongsToMany(user, { as: 'user_id_user_order_has_users', through: order_has_user, foreignKey: "order_id", otherKey: "user_id" });
  order.belongsToMany(user_payment, { as: 'user_payment_id_user_payments', through: user_payment_has_order, foreignKey: "order_id", otherKey: "user_payment_id" });
  order_detail.belongsToMany(order, { as: 'order_id_orders', through: order_detail_has_order, foreignKey: "order_detail_id", otherKey: "order_id" });
  shipping.belongsToMany(user_payment, { as: 'user_payment_id_user_payment_user_payment_has_shippings', through: user_payment_has_shipping, foreignKey: "shipping_id", otherKey: "user_payment_id" });
  user.belongsToMany(category, { as: 'category_id_categories', through: category_has_user, foreignKey: "user_id", otherKey: "category_id" });
  user.belongsToMany(chat, { as: 'chat_id_chat_chat_has_users', through: chat_has_user, foreignKey: "user_id", otherKey: "chat_id" });
  user.belongsToMany(order, { as: 'order_id_order_order_has_users', through: order_has_user, foreignKey: "user_id", otherKey: "order_id" });
  user_payment.belongsToMany(order, { as: 'order_id_order_user_payment_has_orders', through: user_payment_has_order, foreignKey: "user_payment_id", otherKey: "order_id" });
  user_payment.belongsToMany(shipping, { as: 'shipping_id_shippings', through: user_payment_has_shipping, foreignKey: "user_payment_id", otherKey: "shipping_id" });
  category_has_user.belongsTo(category, { as: "category", foreignKey: "category_id"});
  category.hasMany(category_has_user, { as: "category_has_users", foreignKey: "category_id"});
  item_has_category.belongsTo(category, { as: "category", foreignKey: "category_id"});
  category.hasMany(item_has_category, { as: "item_has_categories", foreignKey: "category_id"});
  chat_has_item.belongsTo(chat, { as: "chat", foreignKey: "chat_id"});
  chat.hasMany(chat_has_item, { as: "chat_has_items", foreignKey: "chat_id"});
  chat_has_user.belongsTo(chat, { as: "chat", foreignKey: "chat_id"});
  chat.hasMany(chat_has_user, { as: "chat_has_users", foreignKey: "chat_id"});
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
  order_has_user.belongsTo(order, { as: "order", foreignKey: "order_id"});
  order.hasMany(order_has_user, { as: "order_has_users", foreignKey: "order_id"});
  shipping.belongsTo(order, { as: "order", foreignKey: "order_id"});
  order.hasMany(shipping, { as: "shippings", foreignKey: "order_id"});
  user_payment_has_order.belongsTo(order, { as: "order", foreignKey: "order_id"});
  order.hasMany(user_payment_has_order, { as: "user_payment_has_orders", foreignKey: "order_id"});
  order_detail_has_order.belongsTo(order_detail, { as: "order_detail", foreignKey: "order_detail_id"});
  order_detail.hasMany(order_detail_has_order, { as: "order_detail_has_orders", foreignKey: "order_detail_id"});
  user_payment_has_shipping.belongsTo(shipping, { as: "shipping", foreignKey: "shipping_id"});
  shipping.hasMany(user_payment_has_shipping, { as: "user_payment_has_shippings", foreignKey: "shipping_id"});
  category_has_user.belongsTo(user, { as: "user", foreignKey: "user_id"});
  user.hasMany(category_has_user, { as: "category_has_users", foreignKey: "user_id"});
  chat_has_user.belongsTo(user, { as: "user", foreignKey: "user_id"});
  user.hasMany(chat_has_user, { as: "chat_has_users", foreignKey: "user_id"});
  item.belongsTo(user, { as: "user", foreignKey: "user_id"});
  user.hasMany(item, { as: "items", foreignKey: "user_id"});
  order_detail.belongsTo(user, { as: "user", foreignKey: "user_id"});
  user.hasMany(order_detail, { as: "order_details", foreignKey: "user_id"});
  order_has_user.belongsTo(user, { as: "user", foreignKey: "user_id"});
  user.hasMany(order_has_user, { as: "order_has_users", foreignKey: "user_id"});
  refreshtoken.belongsTo(user, { as: "user", foreignKey: "user_id"});
  user.hasMany(refreshtoken, { as: "refreshtokens", foreignKey: "user_id"});
  user_address.belongsTo(user, { as: "user", foreignKey: "user_id"});
  user.hasMany(user_address, { as: "user_addresses", foreignKey: "user_id"});
  user_payment.belongsTo(user, { as: "user", foreignKey: "user_id"});
  user.hasMany(user_payment, { as: "user_payments", foreignKey: "user_id"});
  user_payment_has_order.belongsTo(user_payment, { as: "user_payment", foreignKey: "user_payment_id"});
  user_payment.hasMany(user_payment_has_order, { as: "user_payment_has_orders", foreignKey: "user_payment_id"});
  user_payment_has_shipping.belongsTo(user_payment, { as: "user_payment", foreignKey: "user_payment_id"});
  user_payment.hasMany(user_payment_has_shipping, { as: "user_payment_has_shippings", foreignKey: "user_payment_id"});

  return {
    category,
    category_has_user,
    chat,
    chat_has_item,
    chat_has_user,
    item,
    item_has_category,
    item_inventory,
    order,
    order_detail,
    order_detail_has_order,
    order_has_user,
    refreshtoken,
    shipping,
    user,
    user_address,
    user_payment,
    user_payment_has_order,
    user_payment_has_shipping,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
