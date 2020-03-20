'use strict';

const { Service } = require('egg');

class AccountService extends Service {

  async findAll() {
    const { ctx } = this;
    const items = await ctx.model.Account.findAll();
    return items;
  }

  async find(id) {
    const { ctx } = this;
    const item = await ctx.model.Account.findOne({ where: { id } });
    return item;
  }

  async findByUsername(username) {
    const { ctx } = this;
    const item = await ctx.model.Account.findOne({ where: { username } });
    return item;
  }

  async create(username, password, name, avatar) {
    const { ctx } = this;
    const query = { username, password, name, avatar };

    const result = await this.findByUsername(username);
    if (result) {
      ctx.err(400, ctx.__('用户已存在'));
    }

    const item = await ctx.model.Account.create(query);

    if (!item) {
      ctx.err(400, ctx.__('创建用户失败'));
    }
    return item;
  }

  async deleteOne(id) {
    const { ctx } = this;
    await ctx.model.Account.destroy({ where: { id } });
  }

  async update(id, options) {
    const { ctx } = this;
    await ctx.model.Account.update(options, { where: { id } });
    return await this.find(id);
  }
}

module.exports = AccountService;
