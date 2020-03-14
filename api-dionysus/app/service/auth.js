'use strict';
const jwt = require('jsonwebtoken');

const uuidv4 = require('uuid/v4');

const tokenExpirationSeconds = 3600 * 24 * 7;
const tokenIssuer = 'www.mobiusor.com';
const secret = 'dionysus-mobiusor';

const Service = require('egg').Service;

class AuthService extends Service {

  constructor() {
    super();
    this.secret = secret;
  }

  async getAndCheckCredentials() {
    const { ctx } = this;
    if (!ctx.request.authKey) ctx.throw(401, ctx.__('Token does not exist.'));
    const credentials = await this.getCredentials();
    if (!credentials) ctx.throw(401, ctx.__('Token invalid or expired.'));
    return credentials;
  }

  getCredentials() {
    const { ctx } = this;
    try {
      const token = ctx.request.authKey || '';
      const secret = this.secret;
      const credentials = jwt.verify(token.substr(7), secret);
      return credentials;
    } catch (e) {
      return null;
    }
  }

  sign(payload) {
    const { ctx } = this;
    ctx.logger.debug('payload is: %j', payload);
    const options = {
      expiresIn: tokenExpirationSeconds,
      issuer: tokenIssuer,
      jwtid: uuidv4(),
    };
    const secret = this.secret;
    const token = jwt.sign(payload, secret, options);
    ctx.logger.debug('token is: %s', token, options);
    return token;
  }

  verify(token) {
    const { ctx } = this;
    const secret = this.secret;
    const result = jwt.verify(token, secret);
    ctx.logger.debug('result is: %s ', result);
    return result;
  }
}

module.exports = AuthService;
