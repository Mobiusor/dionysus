'use strict';
const Controller = require('egg').Controller;

class HomeController extends Controller {

  async test() {
    const { ctx } = this;
    const message = ctx.args[0];
    await ctx.socket.emit('info', `Hi! I've got your message: ${message}`);
  }

  async disconnect() {
    // const { ctx } = this;
    // const message = ctx.args[0];
  }
}

module.exports = HomeController;
