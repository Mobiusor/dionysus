'use strict';

module.exports = {
  up: async(queryInterface,Sequelize)=>{
    const { STRING, JSON, BIGINT, UUIDV4, DATE } = Sequelize; 
    await queryInterface.createTable('account',{
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
      createdAt: {
        type: DATE,
        allowNull: true,
        defaultValue: Sequelize.fn('now'),
      },
      updatedAt: {
        type: DATE,
        allowNull: true,
        defaultValue: Sequelize.fn('now'),
      },
      deletedAt: {
        type: DATE,
        allowNull: true,
        defaultValue: null,
      },
    }, {
      timestamps: true,
      paranoid: true,
    });
  },

  down:async queryInterface => {
    await queryInterface.dropTable('node');
  }
};
