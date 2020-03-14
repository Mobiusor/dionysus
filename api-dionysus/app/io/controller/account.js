'use strict';
const Controller = require('egg').Controller;

class AccountController extends Controller {

  async register() {
    const { ctx } = this;
    const { username, password, name, alias } = ctx.args[0];

    const token = 'temp';
    // await ctx.socket.emit('token', token);
  }

  async profile() {

  }

  async disconnect() {
    const { ctx } = this;
    const message = ctx.args[0];
    console.log(message);
  }
}

module.exports = AccountController;
