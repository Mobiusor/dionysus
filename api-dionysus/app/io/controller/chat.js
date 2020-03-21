
'use strict';
const Controller = require('egg').Controller;

class ChatController extends Controller {

  async message() {
    const { ctx } = this;
    const { type, content } = ctx.params;

    const { id } = ctx.credential;
    const account = await ctx.service.account.find(id);
    const sender = { id: account.id, name: account.name, avatar: account.avatar };
    ctx.ack({ sender, type, content });
    await ctx.socket.broadcast.emit('chat/message', { sender, type, content });
  }

}

module.exports = ChatController;
