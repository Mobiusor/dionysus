'use strict';

const { Service } = require('egg');
const _ = require('lodash');

class WorkflowService extends Service {
  async findAll() {
    const { ctx } = this;
    const items = await ctx.model.Workflow.findAll();
    return items;
  }


  async find(id) {
    const { ctx } = this;
    const item = await ctx.model.Workflow.findOne({ where: { id } });
    return item;
  }

  async create(name, description, graph) {
    const { ctx } = this;
    const item = await ctx.model.Workflow.create({ name, description, graph });
    return item;
  }


  isNotNil(x) {
    return x !== null && x !== undefined;
  }

  pick(object, fields) {
    return _.pickBy(_.pick(object, fields), this.isNotNil);
  }

  async update(id, { name, description, graph }) {
    const { ctx } = this;
    const query = this.pick({ name, description, graph }, [ 'name', 'description', 'graph' ]);
    await ctx.model.Workflow.update(query, { where: { id } });
    return await this.find(id);
  }

  async delete(id) {
    const { ctx } = this;
    await ctx.model.Workflow.destroy({ where: { id } });
  }
}

module.exports = WorkflowService;
