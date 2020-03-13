'use strict';

module.exports = app => {
  const { STRING, JSON, UUID, UUIDV4 } = app.Sequelize;

  const Workflow = app.model.define('workflow', {
    id: {
      type: UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: UUIDV4,
    },
    name: {
      type: STRING,
      allowNull: true,
    },
    description: {
      type: STRING,
      allowNull: true,
    },
    graph: {
      type: JSON,
      allowNull: true,
    },
  }, {
    timestamps: true,
    paranoid: true,
  });

  return Workflow;
};
