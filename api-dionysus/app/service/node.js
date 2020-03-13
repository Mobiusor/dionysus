'use strict';

const { Service } = require('egg');

const basicColumns = [
  'type',
  'name',
  'displayName',
  'description',
  'version',
  'checkpoint',
  'inputs',
  'outputs',
  'options',
];

class NodeService extends Service {

  async findAll() {
    const { ctx } = this;
    const result = {};
    // const items = this.fakeNodes();
    const items = await ctx.model.Node.findAll({ attributes: [ 'id', ...basicColumns ] });
    items.forEach(x => { result[x.id] = x; });
    return result;
  }

  async find(id) {
    const { ctx } = this;
    const item = await ctx.model.Node.findOne({ attributes: [ 'id', ...basicColumns ], where: { id } });
    return item;
  }

  async create({ type, name, displayName, description, version, checkpoint, inputs, outputs, options }) {
    const { ctx } = this;
    if (inputs !== undefined && !Array.isArray(inputs)) {
      ctx.throw(400, ctx.__('Inputs must be array'));
    }
    if (outputs !== undefined && !Array.isArray(outputs)) {
      ctx.throw(400, ctx.__('Outputs must be array'));
    }
    const item = await ctx.model.Node.create({
      type,
      name,
      displayName,
      description,
      version,
      checkpoint,
      inputs,
      outputs,
      options });
    return item;
  }

  async update(id, newNode) {
    const { ctx } = this;
    if (newNode.inputs !== undefined && !Array.isArray(newNode.inputs)) {
      ctx.throw(400, ctx.__('Inputs must be array'));
    }
    if (newNode.outputs !== undefined && !Array.isArray(newNode.outputs)) {
      ctx.throw(400, ctx.__('Outputs must be array'));
    }
    const query = ctx.helper.pick(newNode, basicColumns);
    await ctx.model.Node.update(query, { where: { id } });
    return await this.find(id);
  }

  async delete(id) {
    const { ctx } = this;
    await ctx.model.Node.destroy({ where: { id } });
  }

}

module.exports = NodeService;
