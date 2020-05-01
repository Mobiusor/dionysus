'use strict';
const Service = require('egg').Service;

class DrawService extends Service {

  async init() {
    const { app, ctx } = this;

    const roomId = '';
    await app.redis.hset(`room-${roomId}`, 'state', 'pending');

  }

}

module.exports = DrawService;
