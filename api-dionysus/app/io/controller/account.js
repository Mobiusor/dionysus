'use strict';
const Controller = require('egg').Controller;

class AccountController extends Controller {

  async register() {
    const { ctx } = this;
    const { username, password, name, alias } = ctx.params;

    const item = await ctx.service.account.create(username, password, name, alias);
    const token = ctx.service.auth.assign(item.id);
    ctx.ack(token);
  }

  async login() {
    const { ctx } = this;
    const { username, password } = ctx.params;
    const item = await ctx.service.account.findByUsername(username);
    if (!item) {
      ctx.err('Account does not exist');
    } else if (item.password !== password) {
      ctx.err('Wrong password');
    } else {
      const token = ctx.service.auth.assign(item.id);
      ctx.ack(token);
    }
  }

  async disconnect() {
    const { ctx } = this;
    const message = ctx.args[0];
    console.log(message);
  }
}

module.exports = AccountController;
