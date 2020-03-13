'use strict';
const Controller = require('egg').Controller;

class HomeController extends Controller {
  async chat() {
    const { ctx, app } = this;
    const usocket = app.usocket.getState();
    const info = ctx.args[0];
    const message = ctx.args[1];
  }
  // 视频聊天请求
  async videoReq() {
    const { ctx, app } = this;
    const usocket = app.usocket.getState();
    const info = ctx.args[0];
  }

  async test() {
    const { ctx } = this;
    const message = ctx.args[0];
    console.log(message);
    await ctx.socket.emit('message', `Hi! I've got your message: ${message}`);
  }

  async disconnect() {
    const { ctx } = this;
    const message = ctx.args[0];
    console.log(message);
  }
}

module.exports = HomeController;
