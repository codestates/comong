const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('chat_has_item', {
    chat_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'chat',
        key: 'id'
      }
    },
    item_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'item',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'chat_has_item',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "chat_id" },
          { name: "item_id" },
        ]
      },
      {
        name: "fk_chat_has_item_item1_idx",
        using: "BTREE",
        fields: [
          { name: "item_id" },
        ]
      },
      {
        name: "fk_chat_has_item_chat1_idx",
        using: "BTREE",
        fields: [
          { name: "chat_id" },
        ]
      },
    ]
  });
};
