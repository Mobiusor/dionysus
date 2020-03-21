'use strict';
const Controller = require('egg').Controller;

class AccountController extends Controller {

  async register() {
    const { ctx } = this;
    const { username, password, name, avatar } = ctx.params;
    const item = await ctx.service.account.create(username, password, name, avatar);
    const token = ctx.service.auth.sign({ id: item.id });
    ctx.ack(token);
  }

  async login() {
    const { ctx } = this;
    const { username, password } = ctx.params;
    const item = await ctx.service.account.findByUsername(username);
    if (!item) {
      ctx.err(400, '用户不存在');
    } else if (item.password !== password) {
      ctx.err(400, '密码错误');
    } else {
      const token = ctx.service.auth.sign({ id: item.id });
      ctx.ack(token);
    }
  }

  async getProfile() {
    const { ctx } = this;
    const { id: userId } = ctx.credential;
    const item = await ctx.service.account.find(userId);
    const { id, username, name, avatar } = item;
    ctx.ack({ id, username, name, avatar });
  }

  async disconnect() {
    const { ctx } = this;
    const message = ctx.args[0];
    console.log(message);
  }
}

module.exports = AccountController;
