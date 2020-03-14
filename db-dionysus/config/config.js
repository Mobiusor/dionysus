'use strict';

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

let pg = { host: '', port: 0, user: '', password: '' };

if (process.env.NODE_ENV === 'production') {
  console.log(process.env.POSTGRES);
  pg = parseConnectionString(process.env.POSTGRES);
}

module.exports = {
  development: {
    dialect: 'postgres',
    host: 'localhost',
    port: 56000,
    database: 'dionysus',
    username: 'postgres',
    password: 'Minerva001',
  },

  production: {
    dialect: 'postgres',
    host: 'null',
    port: 30003,
    database: 'dionysus',
    username: 'postgres',
    password: 'null',
  }
};


