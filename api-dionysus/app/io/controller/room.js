'use strict';
const Controller = require('egg').Controller;

class RoomController extends Controller {

  async index() {
    const { ctx } = this;
    const { id } = ctx.credential;
    const items = await ctx.service.room.findAll();
    ctx.ack(items);
  }

  async create() {
    const { ctx } = this;
    const { id: userId } = ctx.credential;
    const { type, name } = ctx.params;
    const item = await ctx.service.room.create(userId, type, name);
    ctx.ack(item);
  }

  async delete() {
    const { ctx } = this;
    const { id: userId } = ctx.credential;
    const { id } = ctx.params;
    const item = await ctx.service.room.find(id);
    if (item.creator !== userId) {
      ctx.err(403, '不可以随便删别人创建的房间哦');
    } else {
      await ctx.service.room.deleteOne(id);
      ctx.ack(id);
    }
  }

  async join() {
    const { ctx } = this;
    const { id: userId } = ctx.credential;
    const { roomId } = ctx.params;
    const { socket } = ctx;
    socket.join(roomId);
    await ctx.socket.broadcast.to(roomId).emit('room/join', { userId });
    ctx.ack('success');
  }

  async leave() {
    const { ctx } = this;
    const { id: userId } = ctx.credential;
    const { roomId } = ctx.params;
    const { socket } = ctx;
    socket.leave(roomId);
    await ctx.socket.broadcast.to(roomId).emit('room/leave', { userId });
    ctx.ack('success');
  }

  async getPlayers() {
    const { app, ctx } = this;
    const { roomId } = ctx.params;
    const sockets = app.io.sockets;
    const clients = sockets.clients(roomId).sockets;
    const players = Object.keys(clients).map(x => clients[x].userId);
    ctx.ack(players);
  }

}

module.exports = RoomController;
