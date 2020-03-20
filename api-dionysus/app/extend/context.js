'use strict';

const PARAMS = Symbol('Context#params');
const CREDENTIAL = Symbol('Context#Credential');

module.exports = {
  ack(data) {
    const ack = this.args[1];
    ack(data);
  },

  err(code, message, stack = null) {
    const ack = this.args[1];
    ack(null, { code, message, stack });
  },

  get credential() {
    if (!this[CREDENTIAL]) {
      const query = this.socket.handshake.query;
      const token = query.token;
      let credential = null;
      try {
        const { id } = this.service.auth.verify(token);
        credential = { id };
      } catch (e) {
        this.err(401, '无权限访问');
      }
      this[CREDENTIAL] = credential;
    }
    return this[CREDENTIAL];
  },

  get params() {
    if (!this[PARAMS]) {
      // 例如，从 header 中获取，实际情况肯定更复杂
      this[PARAMS] = this.args[0];
    }
    return this[PARAMS];
  },
};
