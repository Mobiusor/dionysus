'use strict';

exports.keys = 'api-metis';

exports.depot = '/home/ubuntu/depot';

exports.cluster = {
  listen: {
    port: process.env.PORT || 7045,
    hostname: '0.0.0.0',
  },
};

const parseConnectionString = str => {
  if (!str) return;
  const splits = (str).split('@');
  if (splits.length === 2) {
    const [ user, password ] = splits[0].split(':');
    const [ host, port ] = splits[1].split(':');
    return { user, password, host, port: parseInt(port) };
  } else if (splits.length === 1) {
    const [ host, port ] = splits[0].split(':');
    return { host, port: parseInt(port) };
  }
};

const pg = parseConnectionString(process.env.POSTGRES);
exports.sequelize = {
  Sequelize: require('sequelize'),
  logging: false,
  dialect: 'postgres',
  host: pg.host,
  port: pg.port,
  database: process.env.POSTGRES_DATABASE,
  username: pg.user,
  password: pg.password,
  define: {
    charset: 'utf8',
    timestamps: true,
    underscored: false,
    freezeTableName: true,
  },
};

exports.services = {
  intelligence: process.env.SERVICE_INTELLIGENCE,
};
