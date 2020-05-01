'use strict';

module.exports = () => {
  return async (ctx, next) => {
    const { socket } = ctx;

    const clientId = socket.id;
    const query = socket.handshake.query;

    console.log(clientId, '=>', query.token);
    const token = query.token;
    try {
      const { id } = ctx.service.auth.verify(token);
      socket.userId = id;
    } catch (e) {
      console.warn('用户未登录');
    }
    // if (session[query.uid].token !== query.token) {
    //   socket.emit('res', '登录状态已改变，请重新登陆');
    //   socket.adapter.remoteDisconnect(clientId, true, err => {
    //     console.log(`${new Date()}\tKick { ${clientId} } out.`);
    //   });
    //   return;
    // }
    await next();
  };
};
