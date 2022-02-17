const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('shipping', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    shipping_method: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    shipping_charge: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    state: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    tracking_number: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    order_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'order',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'shipping',
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
        name: "fk_shipping_order1_idx",
        using: "BTREE",
        fields: [
          { name: "order_id" },
        ]
      },
    ]
  });
};
