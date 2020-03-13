'use strict';

module.exports = app => {
  const { STRING, JSON, UUID, UUIDV4 } = app.Sequelize;

  const Node = app.model.define('node', {
    id: {
      type: UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: UUIDV4,
    },
    type: {
      type: STRING,
      allowNull: false,
    },
    name: {
      type: STRING,
      allowNull: false,
    },
    displayName: {
      type: STRING,
      allowNull: false,
    },
    description: {
      type: STRING,
      allowNull: true,
    },
    version: {
      type: STRING,
      allowNull: false,
    },
    checkpoint: {
      type: STRING,
      allowNull: true,
    },
    inputs: {
      type: JSON,
      allowNull: true,
    },
    outputs: {
      type: JSON,
      allowNull: true,
    },
    options: {
      type: JSON,
      allowNull: true,
    },
  }, {
    timestamps: true,
    paranoid: true,
  });
  return Node;
};
