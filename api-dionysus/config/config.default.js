'use strict';

exports.keys = 'api-dionysus';

exports.sequelize = {
  Sequelize: require('sequelize'),
  dialect: 'postgres',
  host: 'localhost',
  logging: false,
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

exports.cluster = {
  listen: {
    port: 10706,
    hostname: '0.0.0.0',
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

