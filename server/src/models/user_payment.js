const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user_payment', {
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
    },
    payment_method: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    payment_status: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    detail: {
      type: DataTypes.STRING(225),
      allowNull: true
    },
    total_amount: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    imp_uid: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    merchant_uid: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    buyer_name: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    status: {
      type: DataTypes.STRING(45),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'user_payment',
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
        name: "fk_user_payment_user1_idx",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
    ]
  });
};
