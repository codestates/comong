import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { comment_has_user, comment_has_userId } from './comment_has_user';
import type { item, itemId } from './item';
import type { item_has_comment, item_has_commentId } from './item_has_comment';
import type { user, userId } from './user';

export interface commentAttributes {
  id: number;
  contents?: string;
  image_src?: string;
  status?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type commentPk = "id";
export type commentId = comment[commentPk];
export type commentOptionalAttributes = "id" | "contents" | "image_src" | "status" | "createdAt" | "updatedAt";
export type commentCreationAttributes = Optional<commentAttributes, commentOptionalAttributes>;

export class comment extends Model<commentAttributes, commentCreationAttributes> implements commentAttributes {
  id!: number;
  contents?: string;
  image_src?: string;
  status?: string;
  createdAt?: Date;
  updatedAt?: Date;

  // comment hasMany comment_has_user via comment_id
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
  // comment belongsToMany item via comment_id and item_id
  item_id_item_item_has_comments!: item[];
  getItem_id_item_item_has_comments!: Sequelize.BelongsToManyGetAssociationsMixin<item>;
  setItem_id_item_item_has_comments!: Sequelize.BelongsToManySetAssociationsMixin<item, itemId>;
  addItem_id_item_item_has_comment!: Sequelize.BelongsToManyAddAssociationMixin<item, itemId>;
  addItem_id_item_item_has_comments!: Sequelize.BelongsToManyAddAssociationsMixin<item, itemId>;
  createItem_id_item_item_has_comment!: Sequelize.BelongsToManyCreateAssociationMixin<item>;
  removeItem_id_item_item_has_comment!: Sequelize.BelongsToManyRemoveAssociationMixin<item, itemId>;
  removeItem_id_item_item_has_comments!: Sequelize.BelongsToManyRemoveAssociationsMixin<item, itemId>;
  hasItem_id_item_item_has_comment!: Sequelize.BelongsToManyHasAssociationMixin<item, itemId>;
  hasItem_id_item_item_has_comments!: Sequelize.BelongsToManyHasAssociationsMixin<item, itemId>;
  countItem_id_item_item_has_comments!: Sequelize.BelongsToManyCountAssociationsMixin;
  // comment hasMany item_has_comment via comment_id
  item_has_comments!: item_has_comment[];
  getItem_has_comments!: Sequelize.HasManyGetAssociationsMixin<item_has_comment>;
  setItem_has_comments!: Sequelize.HasManySetAssociationsMixin<item_has_comment, item_has_commentId>;
  addItem_has_comment!: Sequelize.HasManyAddAssociationMixin<item_has_comment, item_has_commentId>;
  addItem_has_comments!: Sequelize.HasManyAddAssociationsMixin<item_has_comment, item_has_commentId>;
  createItem_has_comment!: Sequelize.HasManyCreateAssociationMixin<item_has_comment>;
  removeItem_has_comment!: Sequelize.HasManyRemoveAssociationMixin<item_has_comment, item_has_commentId>;
  removeItem_has_comments!: Sequelize.HasManyRemoveAssociationsMixin<item_has_comment, item_has_commentId>;
  hasItem_has_comment!: Sequelize.HasManyHasAssociationMixin<item_has_comment, item_has_commentId>;
  hasItem_has_comments!: Sequelize.HasManyHasAssociationsMixin<item_has_comment, item_has_commentId>;
  countItem_has_comments!: Sequelize.HasManyCountAssociationsMixin;
  // comment belongsToMany user via comment_id and user_id
  user_id_user_comment_has_users!: user[];
  getUser_id_user_comment_has_users!: Sequelize.BelongsToManyGetAssociationsMixin<user>;
  setUser_id_user_comment_has_users!: Sequelize.BelongsToManySetAssociationsMixin<user, userId>;
  addUser_id_user_comment_has_user!: Sequelize.BelongsToManyAddAssociationMixin<user, userId>;
  addUser_id_user_comment_has_users!: Sequelize.BelongsToManyAddAssociationsMixin<user, userId>;
  createUser_id_user_comment_has_user!: Sequelize.BelongsToManyCreateAssociationMixin<user>;
  removeUser_id_user_comment_has_user!: Sequelize.BelongsToManyRemoveAssociationMixin<user, userId>;
  removeUser_id_user_comment_has_users!: Sequelize.BelongsToManyRemoveAssociationsMixin<user, userId>;
  hasUser_id_user_comment_has_user!: Sequelize.BelongsToManyHasAssociationMixin<user, userId>;
  hasUser_id_user_comment_has_users!: Sequelize.BelongsToManyHasAssociationsMixin<user, userId>;
  countUser_id_user_comment_has_users!: Sequelize.BelongsToManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof comment {
    return comment.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    contents: {
      type: DataTypes.STRING(300),
      allowNull: true
    },
    image_src: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    status: {
      type: DataTypes.STRING(45),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'comment',
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
