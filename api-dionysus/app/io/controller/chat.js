
'use strict';
const Controller = require('egg').Controller;

class ChatController extends Controller {

  async message() {
    const { ctx } = this;
    const { type, content } = ctx.args[0];
    ctx.err(401, 'invalid message');
    await ctx.socket.broadcast.emit('chat/message', { type, content: content + 'echo' });
  }

}

module.exports = ChatController;
