import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { comment, commentId } from './comment';
import type { user, userId } from './user';

export interface comment_has_userAttributes {
  comment_id: number;
  user_id: number;
}

export type comment_has_userPk = "comment_id" | "user_id";
export type comment_has_userId = comment_has_user[comment_has_userPk];
export type comment_has_userCreationAttributes = comment_has_userAttributes;

export class comment_has_user extends Model<comment_has_userAttributes, comment_has_userCreationAttributes> implements comment_has_userAttributes {
  comment_id!: number;
  user_id!: number;

  // comment_has_user belongsTo comment via comment_id
  comment!: comment;
  getComment!: Sequelize.BelongsToGetAssociationMixin<comment>;
  setComment!: Sequelize.BelongsToSetAssociationMixin<comment, commentId>;
  createComment!: Sequelize.BelongsToCreateAssociationMixin<comment>;
  // comment_has_user belongsTo user via user_id
  user!: user;
  getUser!: Sequelize.BelongsToGetAssociationMixin<user>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<user, userId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<user>;

  static initModel(sequelize: Sequelize.Sequelize): typeof comment_has_user {
    return comment_has_user.init({
    comment_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'comment',
        key: 'id'
      }
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'user',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'comment_has_user',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "comment_id" },
          { name: "user_id" },
        ]
      },
      {
        name: "fk_comment_has_user_user1_idx",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
      {
        name: "fk_comment_has_user_comment1_idx",
        using: "BTREE",
        fields: [
          { name: "comment_id" },
        ]
      },
    ]
  });
  }
}
