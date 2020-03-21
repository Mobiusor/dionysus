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
    const options = {
      expiresIn: tokenExpirationSeconds,
      issuer: tokenIssuer,
      jwtid: uuidv4(),
    };
    const token = jwt.sign(payload, this.secret, options);
    return token;
  }

  verify(token) {
    const { ctx } = this;
    const result = jwt.verify(token, this.secret);
    return result;
  }
}

module.exports = AuthService;
