'use strict';

const PARAMS = Symbol('Context#params');

module.exports = {
  ack(data) {
    const ack = this.args[1];
    ack(data);
  },

  err(code, message) {
    const ack = this.args[1];
    ack(null, { code, message });
  },

  get params() {
    if (!this[PARAMS]) {
      // 例如，从 header 中获取，实际情况肯定更复杂
      this[PARAMS] = this.args[1];
    }
    return this[PARAMS];
  },
};
