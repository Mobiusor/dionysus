'use strict';

const { Service } = require('egg');
const uuidv1 = require('uuid/v1');
const { snakeCase } = require('lodash');

class GraphService extends Service {

  async infer(graph) {
    const key = `api-${uuidv1()}`;
    await this.execute(key, graph, false, 'api');
  }

  async execute(key, graph, ignoreInput, destNodeType) {
    const { ctx } = this;
    const nodesLibrary = await ctx.service.node.findAll();
    this.graph = graph;
    this.nodesLibrary = nodesLibrary;
    this.key = key;
    this.ignoreInput = ignoreInput;
    this.visited = this.checkValidNodes(destNodeType);
    ctx.logger.info(this.visited, destNodeType);
    await this.topologicalSort();
  }

  checkValidNodes(destNodeType) {
    const { nodes, edges } = this.graph;
    const visited = {};
    const queue = [];
    nodes.forEach((x, index) => {
      if (x.type === destNodeType) {
        visited[index] = true;
        queue.push(index);
      } else {
        visited[index] = false;
      }
    });
    while (queue.length !== 0) {
      const index = queue.pop();
      edges.filter(x => x.end.id === index).forEach(x => {
        const startIndex = x.start.id;
        if (visited[startIndex] === false) queue.push(startIndex);
        visited[startIndex] = true;
      });
    }
    return visited;
  }

  async topologicalSort() {
    // TODO: 用邻接表优化成（V^2），现为VE
    const { nodes, edges } = this.graph;
    const inDegree = nodes.map(() => 0);
    edges.forEach(edge => { inDegree[edge.end.id] += 1; });
    const queue = [];
    // TODO: check multiple inputs
    inDegree.forEach((x, index) => { if (x === 0) queue.push(index); });
    while (queue.length !== 0) {
      const index = queue.pop();
      if (this.visited[index] === false) continue;
      const results = await this.runNode(index);
      let validEdges = [];
      if (results && results.outputs) {
        const outEdges = edges.filter(x => x.start.id === index);
        const outputs = results.outputs;
        validEdges = outEdges.filter(x => outputs.hasOwnProperty(x.start.key));
        console.log('valid', validEdges, outputs);
      } else {
        validEdges = edges.filter(x => x.start.id === index);
      }
      // TODO: .filter(x.start.key in results)
      validEdges.forEach(x => {
        const count = edges.filter(y => y.end.id === x.end.id && y.end.key === x.end.key).length;
        inDegree[x.end.id] -= count;
        if (inDegree[x.end.id] === 0) queue.push(x.end.id);
      });
    }
  }

  async runNode(id) {
    const { ctx } = this;
    const { nodes } = this.graph;
    const node = nodes[id];
    ctx.logger.info('--- run node', id);
    if (node.type === 'input') {
      if (this.ignoreInput === false) {
        return await this.runInputNode(id);
      }
    } else if (nodes[id].type === 'module') {
      return await this.runModuleNode(id);
    } else if (nodes[id].type === 'api') {
      return await this.runApiNode(id);
    }
  }

  async runInputNode(id) {
    const { ctx } = this;
    const { nodes } = this.graph;
    const node = nodes[id];
    const reference = this.nodesLibrary[node.referenceId];
    const stream = await ctx.getFileStream();
    let filename = null;
    if (reference.name === 'FileInput') {
      filename = node.outputs ? node.outputs.filename : reference.outputs[0].defaultValue;
      console.log('upload file', filename);
      await ctx.service.intelligence.uploadFile(this.key, filename, stream);
    }
  }

  async runModuleNode(id) {
    const { ctx } = this;
    const { nodes, edges } = this.graph;
    const node = nodes[id];
    const reference = this.nodesLibrary[node.referenceId];
    const item = {
      module: snakeCase(reference.name),
      version: reference.version,
      is_loop: node.isLoop || false,
      // checkpoint: reference.checkpoint,
      inputs: [],
      outputs: [],
      options: this.getNodeOptions(id),
    };
    edges.forEach(edge => {
      if (edge.end.id === id) {
        const output = this.getNodeOutput(edge.start.id, edge.start.key);
        const input = this.getNodeInput(edge.end.id, edge.end.key);
        const result = {
          name: input.key,
          value: output.value,
        };
        item.inputs.push(result);
      }
    });

    reference.outputs.forEach(x => {
      const output = this.getNodeOutput(id, x.key);
      const result = {
        name: output.key,
        value: output.value,
      };
      item.outputs.push(result);
    });

    console.log('run module', item);
    return await ctx.service.intelligence.module(this.key, item);
  }

  async runApiNode(id) {
    const { ctx } = this;
    const { nodes, edges } = this.graph;
    const node = nodes[id];
    const reference = this.nodesLibrary[node.referenceId];

    if (reference.name === 'JsonApi') {
      // TODO
      const input = reference.inputs[0];
      const edge = edges.find(x => x.end.id === id && x.end.key === input.key);
      const output = this.getNodeOutput(edge.start.id, edge.start.key);
      const filename = output.value;
      console.log('get file', filename);
      const stream = await ctx.service.intelligence.getFile(this.key, filename);
      const content = await ctx.helper.streamToString(stream);
      ctx.body = JSON.parse(content);
    } else if (reference.name === 'FileStreamApi') {
      const input = reference.inputs[0];
      const edge = edges.find(x => x.end.id === id && x.end.key === input.key);
      const output = this.getNodeOutput(edge.start.id, edge.start.key);
      const filename = output.value;
      console.log('get file stream', filename);
      const stream = await ctx.service.intelligence.getFile(this.key, filename);
      ctx.attachment(filename);
      ctx.set('Content-Type', 'application/octet-stream');
      ctx.body = stream;
    }
  }

  getNodeOutput(id, key) {
    const node = this.graph.nodes[id];
    const reference = this.nodesLibrary[node.referenceId];
    const outputReference = reference.outputs.find(x => x.key === key);
    const result = {
      key: outputReference.key,
      value: outputReference.defaultValue,
    };
    if (node.outputs && node.outputs[key] !== null && node.outputs[key] !== undefined) result.value = node.outputs[key];
    return result;
  }

  getNodeInput(id, key) {
    const node = this.graph.nodes[id];
    const reference = this.nodesLibrary[node.referenceId];
    const inputReference = reference.inputs.find(x => x.key === key);
    const result = {
      key: inputReference.key,
      type: inputReference.type,
    };
    return result;
  }

  getNodeOptions(id) {
    const node = this.graph.nodes[id];
    const reference = this.nodesLibrary[node.referenceId];
    const result = {};
    if (!reference.options) return {};
    reference.options.forEach(x => {
      result[x.key] = x.defaultValue;
      const value = node.options && node.options[x.key];
      if (value !== undefined && value !== null) {
        if (x.type === 'string') result[x.key] = value;
        else if (x.type === 'boolean') result[x.key] = (value === 'true');
        else if (x.type === 'double' || x.type === 'float') result[x.key] = parseFloat(value);
        else if (x.type === 'int') result[x.key] = parseInt(value);
      }
    });
    return result;
  }
}

module.exports = GraphService;
