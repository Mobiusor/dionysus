'use strict';

const { Service } = require('egg');
const uuid = require('uuid/v4');

class RoomService extends Service {

  async findAll() {
    const { app } = this;
    const rooms = await app.redis.hvals('rooms');
    return rooms.map(room => JSON.parse(room));
  }

  async find(id) {
    const { app } = this;
    const room = await app.redis.hget('rooms', id);
    return JSON.parse(room);
  }

  async create(creator, type, name) {
    const { ctx, app } = this;
    const id = await this.generateRoomId();
    const room = { id, creator, type, name };
    const str = JSON.stringify(room);
    await app.redis.hset('rooms', id, str);
    await ctx.game[type].init();
    return room;
  }

  async deleteOne(id) {
    const { app } = this;
    await app.redis.hdel('rooms', id);
  }

  async update(id, options) {
    const { app } = this;
    const room = { id, ...options };
    const isExist = await app.redis.hexists('rooms', id);
    if (isExist) {
      const str = JSON.stringify(room);
      await app.redis.hset('rooms', id, str);
    }
    return room;
  }

  async generateRoomId() {
    const { app } = this;
    let id = '';
    let flag = true;
    while (flag) {
      id = Math.ceil((1 + Math.random()) * 93276896452).toString(36).substring(1);
      flag = await app.redis.hexists('rooms', id);
    }
    return id;
  }

}

module.exports = RoomService;
