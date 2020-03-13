'use strict';
const _ = require('lodash');

const isNotNil = x => {
  return x !== null && x !== undefined;
};

// TODO: check pick result
const pick = (object, fields) => _.pickBy(_.pick(object, fields), isNotNil);

const streamToString = stream => {
  return new Promise((resolve, reject) => {
    let str = '';
    stream.on('data', chunk => {
      str += chunk;
    });
    stream.on('end', () => {
      resolve(str);
    });
    stream.on('error', err => {
      reject(err);
    });
  });
};

const streamToBase64 = stream => {
  return new Promise((resolve, reject) => {
    const bufs = [];
    stream.on('data', chunk => {
      bufs.push(chunk);
    });
    stream.on('end', () => {
      const buffer = Buffer.concat(bufs);
      resolve(buffer.toString('base64'));
    });
    stream.on('error', err => {
      reject(err);
    });
  });
};

module.exports = {
  pick,
  streamToString,
  streamToBase64,
};
