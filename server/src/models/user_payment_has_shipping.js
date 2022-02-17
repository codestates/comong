const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user_payment_has_shipping', {
    user_payment_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'user_payment',
        key: 'id'
      }
    },
    shipping_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'shipping',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'user_payment_has_shipping',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "user_payment_id" },
          { name: "shipping_id" },
        ]
      },
      {
        name: "fk_user_payment_has_shipping_shipping1_idx",
        using: "BTREE",
        fields: [
          { name: "shipping_id" },
        ]
      },
      {
        name: "fk_user_payment_has_shipping_user_payment1_idx",
        using: "BTREE",
        fields: [
          { name: "user_payment_id" },
        ]
      },
    ]
  });
};
