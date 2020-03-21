'use strict';
const Controller = require('egg').Controller;

class UserController extends Controller {

  async show() {
    const { ctx } = this;
    const { id: userId } = ctx.credential;
    const { id: otherUserId } = ctx.params;
    const item = await ctx.service.account.find(otherUserId);
    const { id, username, name, avatar } = item;
    ctx.ack({ id, username, name, avatar });
  }

}

module.exports = UserController;
