'use strict';
const jwt = require('jsonwebtoken');

const uuidv4 = require('uuid/v4');

const tokenExpirationSeconds = 3600 * 24 * 7;
const tokenIssuer = 'wwwmobiusorcom';
const secret = 'dionysusmobiusor';

const Service = require('egg').Service;

class AuthService extends Service {

  constructor(ctx) {
    super(ctx);
    this.secret = secret;
  }

  sign(payload) {
    const { ctx } = this;
    ctx.logger.debug('payload is: %j', payload);
    const options = {
      expiresIn: tokenExpirationSeconds,
      issuer: tokenIssuer,
      jwtid: uuidv4(),
    };
    const token = jwt.sign(payload, this.secret, options);
    ctx.logger.debug('token is: %s', token, options);
    return token;
  }

  verify(token) {
    const { ctx } = this;
    const result = jwt.verify(token, this.secret);
    ctx.logger.debug('result is: %s ', result);
    return result;
  }
}

module.exports = AuthService;
