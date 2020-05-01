'use strict';

const Service = require('egg').Service;

class MessageService extends Service {

  async broadcast(roomId, content, sender = 'system') {
    const { ctx } = this;
    const message = {
      sender,
      type: 'text',
      content,
    };
    if (roomId) {
      await ctx.socket.broadcast.to(roomId).emit('chat/message', message);
    }
    await ctx.socket.broadcast.emit('chat/message', message);
  }
}

module.exports = MessageService;
