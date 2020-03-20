'use strict';

/**
 * @param {Egg.Application} app - egg application
 */

module.exports = app => {
  // const { router, controller } = app;
  const { io } = app;
  io.route('test', io.controller.home.test);
  io.route('disconnect', io.controller.home.disconnect);

  io.route('account/register', io.controller.account.register);
  io.route('account/login', io.controller.account.login);
  io.route('account/getProfile', io.controller.account.getProfile);
  io.route('chat/message', io.controller.chat.message);
};
