'use strict';
const FormStream = require('formstream');
const { Service } = require('egg');

class IntelligenceService extends Service {

  constructor(ctx) {
    super(ctx);
    this.endpoint = this.config.services.intelligence;
  }

  async module(key, module) {
    const { ctx } = this;
    const res = await ctx.mtCurl(`${this.endpoint}/module/sync?key=${key}`, {
      method: 'POST',
      data: module,
      dataType: 'json',
      timeout: 10 * 60 * 1000,
    });
    return res.data;
  }

  async uploadFile(key, filename, fileStream) {
    const { ctx } = this;
    const url = `${this.endpoint}/files?key=${key}`;
    const form = new FormStream();
    form.stream('file', fileStream, filename);
    const options = {
      method: 'POST',
      headers: form.headers(),
      dataType: 'text',
      stream: form,
      timeout: 2 * 60 * 1000,
    };
    await ctx.mtCurl(url, options);
  }

  async getFile(key, filename) {
    const { ctx } = this;
    const url = `${this.endpoint}/files/${filename}?key=${key}`;
    const res = await ctx.mtCurl(url, {
      method: 'GET',
      dataType: 'text',
      streaming: true,
    });
    return res.res;
  }

  async getTasks() {
    const { ctx } = this;
    const url = `${this.endpoint}/tasks`;
    const res = await ctx.mtCurl(url, {
      method: 'GET',
      dataType: 'json',
    });
    return res.data;
  }

  async getTaskStatus(id) {
    const { ctx } = this;
    const url = `${this.endpoint}/tasks/${id}/status`;
    const res = await ctx.mtCurl(url, {
      method: 'GET',
      dataType: 'json',
    });
    return res.data;
  }

  async clearTask() {
    const { ctx } = this;
    const url = `${this.endpoint}/tasks`;
    await ctx.mtCurl(url, {
      method: 'DELETE',
    });
  }

  async cancelTask(id) {
    const { ctx } = this;
    const url = `${this.endpoint}/tasks/${id}`;
    await ctx.mtCurl(url, {
      method: 'DELETE',
    });
  }

  async getTaskResult(id) {
    const { ctx } = this;
    const url = `${this.endpoint}/tasks/${id}/result`;
    const res = await ctx.mtCurl(url, {
      method: 'GET',
      dataType: 'json',
    });
    return res.data;
  }

}

module.exports = IntelligenceService;
