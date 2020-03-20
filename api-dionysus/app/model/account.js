'use strict';

module.exports = app => {
  const { STRING, BIGINT } = app.Sequelize;
  const Node = app.model.define('account', {
    id: {
      type: BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: STRING,
      allowNull: false,
    },
    password: {
      type: STRING,
      allowNull: false,
    },
    name: {
      type: STRING,
      allowNull: false,
    },
    avatar: {
      type: STRING,
      allowNull: false,
    },
  }, {
    timestamps: true,
    paranoid: true,
  });
  return Node;
};
