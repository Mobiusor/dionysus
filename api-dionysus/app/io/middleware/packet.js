'use strict';

module.exports = () => {
  return async (ctx, next) => {
    const { socket } = ctx;
    await next();
  };
};
