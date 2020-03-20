'use strict';

module.exports = () => {
  return async (ctx, next) => {
    try {
      await next();
    } catch (e) {
      ctx.err(500, e.message, e.stack);
    }
  };
};
