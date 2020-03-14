'use strict';

exports.keys = 'api-dionysus';

exports.sequelize = {
  Sequelize: require('sequelize'),
  dialect: 'postgres',
  host: 'localhost',
  port: 56000,
  database: 'dionysus',
  username: 'postgres',
  password: 'Minerva001',
  define: {
    charset: 'utf8',
    timestamps: true,
    underscored: false,
    freezeTableName: true,
  },
};

exports.io = {
  init: { }, // passed to engine.io
  namespace: {
    '/': {
      connectionMiddleware: [ 'auth' ],
      packetMiddleware: [ 'packet' ],
    },
  },
};

