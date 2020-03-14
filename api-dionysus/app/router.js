'use strict';

/**
 * @param {Egg.Application} app - egg application
 */

module.exports = app => {
  // const { router, controller } = app;
  const { io } = app;
  io.route('test', io.controller.home.test);
  io.route('disconnect', io.controller.home.disconnect);

  io.route('chat/message', io.controller.chat.message);
};
